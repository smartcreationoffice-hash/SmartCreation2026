/**
 * Resize oversized images in /public so the client doesn't download
 * 4x-5x the resolution it actually displays. Lighthouse flagged a 261 KiB
 * potential saving from this alone.
 *
 * Idempotent: each rule has a target max width — if the current width is
 * already at or below the target, the file is left untouched. Re-running
 * never re-encodes (which would compound quality loss).
 *
 * Run on demand:    node scripts/optimize-public-images.mjs
 * Also wired into:  package.json "prebuild" so Vercel builds shrink files
 *                   before next build sees them.
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../public");

// Each rule: a directory or file matcher + max width + max height.
// Most rules cap width only; sharp keeps the aspect ratio.
const RULES = [
  // CEO portraits — displayed at most ~500 px wide.
  { match: /^ceo-asad-hashmi.*\.webp$/, maxW: 800,  quality: 86 },
  { match: /^ceo-asad-hashmi\.jpg$/,    maxW: 800,  quality: 82 },
  // Reception / services hero banner — displayed at most ~1000 px wide.
  { match: /^services-banner\.webp$/,   maxW: 1280, quality: 84 },
  { match: /^reception\.jpg$/,          maxW: 1280, quality: 80 },
  // Office gallery photos — square-ish cards on desktop, 1280 px is plenty.
  { match: /^offices\/.*\.(jpg|jpeg|webp)$/, maxW: 1280, quality: 82 },
  // Group / centre logos — displayed at most ~280 px wide.
  { match: /^group-logos\/next-journey\.webp$/, maxW: 600, quality: 86 },
  { match: /^group-logos\/.*\.webp$/,           maxW: 400, quality: 86 },
  // sc-group-logo variants — appear at ~250 px max.
  { match: /^sc-group-logo.*\.webp$/, maxW: 600, quality: 88 },
  // Centre photos — displayed in cards at ~600 px.
  { match: /^centres\/.*\.webp$/, maxW: 1000, quality: 84 },
  // Free zones tile logos — small badges, square.
  // Section-hero photos (high quality, ~1800px). Keep them rich so the
  // free-zone detail cards read well. Excluded from the small-logo rule below.
  { match: /^free-zones\/.*-large\.webp$/, maxW: 1800, quality: 92 },
  // Small logo tiles in the homepage grid + hero pillars.
  { match: /^free-zones\/.*\.webp$/, maxW: 400, quality: 86 },
  // Insight cover images.
  { match: /^insights\/.*\.(webp|jpg|jpeg)$/, maxW: 1600, quality: 82 },
  // Review avatar photos — small.
  { match: /^reviews\/.*\.(webp|jpg|jpeg|png)$/, maxW: 200, quality: 84 },
  // Team photos — circle thumbnails.
  { match: /^team\/.*\.(webp|jpg|jpeg)$/, maxW: 400, quality: 84 },
];

const SKIP = new Set([
  // Next.js favicons; must keep exact pixel-perfect sizes
  "icon.png",
  "apple-icon.png",
  "favicon.ico",
]);

function findRule(rel) {
  for (const r of RULES) if (r.match.test(rel)) return r;
  return null;
}

function walk(dir, rel = "") {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const full = path.join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full, r));
    else if (st.isFile() && !SKIP.has(name)) out.push({ full, rel: r, size: st.size });
  }
  return out;
}

(async () => {
  const files = walk(ROOT);
  let processed = 0;
  let skipped = 0;
  let savedBytes = 0;

  for (const f of files) {
    const rule = findRule(f.rel);
    if (!rule) {
      skipped++;
      continue;
    }
    const img = sharp(f.full, { failOn: "none" });
    const meta = await img.metadata();
    if (!meta.width || !meta.height) {
      skipped++;
      continue;
    }
    const needsResize = meta.width > rule.maxW || (rule.maxH && meta.height > rule.maxH);
    if (!needsResize) {
      skipped++;
      continue;
    }

    const before = f.size;
    const ext = path.extname(f.full).toLowerCase();

    let pipeline = sharp(readFileSync(f.full), { failOn: "none" }).resize({
      width: rule.maxW,
      height: rule.maxH,
      fit: "inside",
      withoutEnlargement: true,
    });

    if (ext === ".webp") {
      pipeline = pipeline.webp({ quality: rule.quality, effort: 5 });
    } else if (ext === ".jpg" || ext === ".jpeg") {
      pipeline = pipeline.jpeg({ quality: rule.quality, mozjpeg: true });
    } else if (ext === ".png") {
      pipeline = pipeline.png({ quality: rule.quality, compressionLevel: 9 });
    } else {
      skipped++;
      continue;
    }

    const out = await pipeline.toBuffer();
    writeFileSync(f.full, out);
    const after = out.length;
    savedBytes += before - after;
    processed++;
    const pct = Math.round(((before - after) / before) * 100);
    console.log(
      `  ${pct.toString().padStart(3)}%  ${(before / 1024).toFixed(1).padStart(7)} KB → ${(after / 1024).toFixed(1).padStart(7)} KB   ${f.rel}`,
    );
  }

  console.log(
    `\n[optimize-public-images] processed=${processed} skipped=${skipped} saved=${(savedBytes / 1024 / 1024).toFixed(2)} MB`,
  );
})();
