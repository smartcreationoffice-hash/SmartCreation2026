// Empty replacement for next/dist/build/polyfills/polyfill-module.js.
// All the methods it polyfills (Array.prototype.at/flat/flatMap, Object.fromEntries,
// Object.hasOwn, String.prototype.trimStart/trimEnd, Symbol.prototype.description,
// Promise.prototype.finally) are supported natively in every browser our
// browserslist targets, so we skip the ~14 KiB polyfill payload entirely.
export {};
