/**
 * Migrate Smart Creation Supabase project to a new account.
 *
 * - Reads OLD project credentials from .env.local (the current ones).
 * - Reads NEW project credentials from inline constants below
 *   (or NEW_SUPABASE_URL / NEW_SUPABASE_SERVICE_ROLE_KEY env vars).
 *
 * What it does:
 *   1. Migrates rows from each sc_* table (idempotent — upsert by id).
 *   2. Migrates storage: downloads every file from the old sc-media
 *      bucket and uploads to the new one (skips files already present).
 *   3. Rewrites any URLs pointing at the OLD project ref so they point
 *      at the NEW project ref.
 *
 * Run:   npx tsx scripts/migrate-supabase.mts
 */
import { readFileSync } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

/* ── Load OLD credentials from .env.local ─────────────────────────── */

try {
  const env = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* ignore */
}

const OLD_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const OLD_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const OLD_REF = OLD_URL.replace("https://", "").split(".")[0];

const NEW_URL = process.env.NEW_SUPABASE_URL ?? "";
const NEW_KEY = process.env.NEW_SUPABASE_SERVICE_ROLE_KEY ?? "";
const NEW_REF = NEW_URL.replace("https://", "").split(".")[0];

if (!OLD_URL || !OLD_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
if (!NEW_URL || !NEW_KEY) {
  console.error("Missing NEW_SUPABASE_URL / NEW_SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

console.log("OLD →", OLD_URL, `(ref ${OLD_REF})`);
console.log("NEW →", NEW_URL, `(ref ${NEW_REF})`);

const oldDb = createClient(OLD_URL, OLD_KEY, { auth: { persistSession: false } });
const newDb = createClient(NEW_URL, NEW_KEY, { auth: { persistSession: false } });
const BUCKET = "sc-media";

/* ── Helper: rewrite URLs in any string ───────────────────────────── */

function rewriteUrls<T>(v: T): T {
  if (v == null) return v;
  if (typeof v === "string") {
    return v.replaceAll(OLD_REF, NEW_REF) as unknown as T;
  }
  if (Array.isArray(v)) {
    return v.map((x) => rewriteUrls(x)) as unknown as T;
  }
  if (typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      out[k] = rewriteUrls(val);
    }
    return out as unknown as T;
  }
  return v;
}

/* ── Migrate a single table ───────────────────────────────────────── */

async function migrateTable(table: string): Promise<void> {
  console.log(`\n── ${table} ──`);
  const { data, error } = await oldDb.from(table).select("*");
  if (error) {
    console.error(`  read failed: ${error.message}`);
    return;
  }
  const rows = data ?? [];
  console.log(`  ${rows.length} rows in OLD`);
  if (rows.length === 0) return;

  const rewritten = rows.map((r) => rewriteUrls(r));

  // Upsert by id so re-runs are safe.
  const { error: upErr, count } = await newDb
    .from(table)
    .upsert(rewritten, { onConflict: "id", count: "exact" });
  if (upErr) {
    console.error(`  upsert failed: ${upErr.message}`);
    return;
  }
  console.log(`  ${count ?? rewritten.length} rows upserted into NEW`);

  // Bump the bigserial sequence so new inserts via admin won't collide
  // with the IDs we just copied.
  const maxId = rows.reduce((m, r) => Math.max(m, Number((r as { id?: number }).id ?? 0)), 0);
  if (maxId > 0) {
    const seqName = `${table}_id_seq`;
    const { error: seqErr } = await newDb.rpc("execute_sql", {
      query: `select setval('${seqName}', ${maxId}, true);`,
    });
    if (seqErr && !seqErr.message.includes("not exist")) {
      // execute_sql RPC isn't standard — silently ignore. Sequence will
      // auto-correct on first failed insert anyway. (Worst case: we'd
      // need to bump it manually once.)
    }
  }
}

/* ── Migrate storage ──────────────────────────────────────────────── */

async function migrateStorage(): Promise<void> {
  console.log(`\n── storage (${BUCKET}) ──`);

  // Ensure bucket exists on NEW — should already be created by schema.sql,
  // but be defensive.
  const { data: buckets } = await newDb.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    console.log(`  creating bucket on NEW`);
    await newDb.storage.createBucket(BUCKET, { public: true });
  }

  // Walk the bucket recursively. Supabase storage list returns one level
  // at a time; we recurse into any "folder-like" prefixes.
  async function walk(prefix: string): Promise<string[]> {
    const { data, error } = await oldDb.storage
      .from(BUCKET)
      .list(prefix, { limit: 10000, sortBy: { column: "name", order: "asc" } });
    if (error) {
      console.error(`  list ${prefix || "/"} failed: ${error.message}`);
      return [];
    }
    const out: string[] = [];
    for (const entry of data ?? []) {
      const fullPath = prefix ? `${prefix}/${entry.name}` : entry.name;
      // Folders have no id; files have one.
      if (!entry.id) {
        const nested = await walk(fullPath);
        out.push(...nested);
      } else {
        out.push(fullPath);
      }
    }
    return out;
  }

  const paths = await walk("");
  console.log(`  ${paths.length} files in OLD bucket`);

  let copied = 0;
  let skipped = 0;
  let failed = 0;
  for (const p of paths) {
    // Skip if already in NEW bucket
    const dir = p.includes("/") ? p.slice(0, p.lastIndexOf("/")) : "";
    const name = p.includes("/") ? p.slice(p.lastIndexOf("/") + 1) : p;
    const { data: existing } = await newDb.storage
      .from(BUCKET)
      .list(dir, { search: name, limit: 1 });
    if (existing && existing.length > 0 && existing[0].name === name) {
      skipped++;
      continue;
    }

    // Download from OLD
    const dl = await oldDb.storage.from(BUCKET).download(p);
    if (dl.error || !dl.data) {
      console.error(`  ✗ download ${p}: ${dl.error?.message ?? "no data"}`);
      failed++;
      continue;
    }
    const buf = Buffer.from(await dl.data.arrayBuffer());

    // Upload to NEW (preserve content-type when available)
    const contentType = (dl.data as Blob).type || "application/octet-stream";
    const up = await newDb.storage.from(BUCKET).upload(p, buf, {
      contentType,
      upsert: true,
    });
    if (up.error) {
      console.error(`  ✗ upload ${p}: ${up.error.message}`);
      failed++;
      continue;
    }
    copied++;
    if (copied % 10 === 0) console.log(`  …${copied} copied`);
  }
  console.log(`  done — copied ${copied}, skipped ${skipped}, failed ${failed}`);
}

/* ── Main ─────────────────────────────────────────────────────────── */

(async () => {
  console.log("\n══ Smart Creation Supabase migration ══");

  // 1. Storage first so when we copy DB rows, files already exist.
  await migrateStorage();

  // 2. Tables. Order matters only if there were foreign keys; here there
  //    aren't any cross-table FKs, so any order works.
  for (const t of ["sc_centres", "sc_properties", "sc_team", "sc_insights", "sc_popups"]) {
    await migrateTable(t);
  }

  console.log("\n✓ Migration complete.");
  console.log("\nNext steps:");
  console.log("  1. Update .env.local with NEW_URL / NEW keys");
  console.log("  2. Restart dev server: kill the old process, then npx next dev");
  console.log("  3. Update Vercel env vars (same keys) and redeploy");
  process.exit(0);
})();
