/**
 * One-shot DDL migration to create sc_popups in Supabase.
 *   PG_PASSWORD=... npx tsx scripts/migrate-popups.mts
 */
import { Client } from "pg";

const password = process.env.PG_PASSWORD;
const projectRef = "eabxzyhizfsvbsysobwd";
if (!password) {
  console.error("Missing PG_PASSWORD env var");
  process.exit(1);
}

const ddl = `
create table if not exists public.sc_popups (
  id             bigserial   primary key,
  title          text        not null,
  subtitle       text,
  eyebrow        text,
  image_url      text,
  cta_label      text,
  cta_href       text,
  target_pages   text        not null default '*',
  delay_seconds  integer     not null default 6,
  active         boolean     not null default false,
  display_order  integer     not null default 100,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists sc_popups_active_idx on public.sc_popups (active, display_order);

alter table public.sc_popups enable row level security;

drop policy if exists "sc_popups anon read" on public.sc_popups;
create policy "sc_popups anon read"
  on public.sc_popups for select
  to anon, authenticated
  using (active = true);

drop trigger if exists sc_popups_updated_at on public.sc_popups;
create trigger sc_popups_updated_at
  before update on public.sc_popups
  for each row execute function public.sc_set_updated_at();
`;

async function tryConnect(connStr: string, label: string): Promise<boolean> {
  const c = new Client({
    connectionString: connStr,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await c.connect();
    console.log(`Connected via ${label}.`);
    await c.query(ddl);
    console.log("DDL applied.");
    await c.end();
    return true;
  } catch (e) {
    console.error(`${label} failed:`, (e as Error).message);
    try { await c.end(); } catch {}
    return false;
  }
}

const regions = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "ca-central-1", "sa-east-1",
  "eu-west-1", "eu-west-2", "eu-west-3",
  "eu-central-1", "eu-central-2", "eu-north-1",
  "ap-south-1", "ap-southeast-1", "ap-southeast-2",
  "ap-northeast-1", "ap-northeast-2",
  "me-south-1", "me-central-1",
];

const hosts = ["aws-0", "aws-1", "aws-2"];
const candidates: { label: string; url: string }[] = [];
for (const h of hosts) {
  for (const r of regions) {
    candidates.push({
      label: `${h}-${r}:5432`,
      url: `postgresql://postgres.${projectRef}:${encodeURIComponent(password)}@${h}-${r}.pooler.supabase.com:5432/postgres`,
    });
  }
}

(async () => {
  for (const c of candidates) {
    const ok = await tryConnect(c.url, c.label);
    if (ok) process.exit(0);
  }
  console.error("All connection attempts failed.");
  process.exit(1);
})();
