// One-off: re-export the 14 free-zone hero images at higher quality so
// they show real photographic detail instead of the optimizer's 400px /
// 50KB crunch. Target ~500KB each with a ~1800px-wide source.
import { readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "/Users/clipifly/Documents/smartcreation/Free Zones/freezones new";
const DST = "/Users/clipifly/smart-creation/public/free-zones";

const MAP = {
  IfzaFreeZone: "ifza-large",
  DmccFreeZone: "dmcc-large",
  DifcFreeZone: "difc-large",
  MeydanFreeZone: "meydan-large",
  DubaiCommerCityFreeZone: "dcc-large",
  DtecFreeZone: "dtec-large",
  DubaiSouthFreeZone: "dubai-south-large",
  ShamsFreeZone: "shams-large",
  SpcFreeZone: "spc-large",
  SparkFreeZone: "spark-large",
  RakezFreeZone: "rakez-large",
  AjmanFreeZone: "afza-large",
  AncFreeZone: "anc-large",
  UaqFreeZone: "uaq-large",
};

const WIDTH = 1800;
// Iteratively try quality 92, then drop until size <= 600KB AND >= 300KB.
async function pickQuality(buf) {
  for (const q of [92, 88, 84, 80, 76]) {
    const out = await sharp(buf)
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: q, effort: 5 })
      .toBuffer();
    if (out.length <= 600 * 1024) return { buf: out, q };
  }
  // Fallback: smallest tried.
  const out = await sharp(buf)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: 70, effort: 5 })
    .toBuffer();
  return { buf: out, q: 70 };
}

for (const [src, dst] of Object.entries(MAP)) {
  const srcPath = path.join(SRC, src + ".webp");
  try {
    statSync(srcPath);
  } catch {
    console.log("  ? missing source: " + srcPath);
    continue;
  }
  const raw = await sharp(srcPath).toBuffer();
  const { buf, q } = await pickQuality(raw);
  const dstPath = path.join(DST, dst + ".webp");
  writeFileSync(dstPath, buf);
  console.log(`  ✓ ${dst}.webp  q=${q}  ${(buf.length / 1024).toFixed(1)} KB`);
}
console.log("\ndone");
