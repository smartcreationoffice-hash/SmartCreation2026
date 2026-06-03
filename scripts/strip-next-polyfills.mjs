/**
 * Empty Next.js's bundled polyfill module so its ~14 KiB of legacy ES2019-2022
 * shims (Array.prototype.at/flat/flatMap, Object.fromEntries, Object.hasOwn,
 * String.prototype.trim*, Symbol.prototype.description, Promise.prototype.finally,
 * URL.canParse) don't ship to clients.
 *
 * Every browser our package.json `browserslist` targets supports these natively,
 * but Next bundles the polyfill module into the root client runtime regardless of
 * browserslist. Aliasing via turbopack/webpack config didn't intercept this — Next
 * resolves the polyfill path with `require.resolve` before user config runs. So we
 * just overwrite the source file once per npm install via a postinstall hook.
 *
 * Idempotent: re-running is a no-op once the file is already empty.
 */
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TARGETS = [
  path.resolve(__dirname, "../node_modules/next/dist/build/polyfills/polyfill-module.js"),
];

const STUB = "// emptied by scripts/strip-next-polyfills.mjs\n";

let stripped = 0;
let skipped = 0;
for (const f of TARGETS) {
  try {
    statSync(f);
  } catch {
    // Path not present (different next version); skip silently.
    skipped++;
    continue;
  }
  const current = readFileSync(f, "utf8");
  if (current === STUB) {
    skipped++;
    continue;
  }
  writeFileSync(f, STUB, "utf8");
  stripped++;
}
console.log(`[strip-next-polyfills] stripped=${stripped} skipped=${skipped}`);
