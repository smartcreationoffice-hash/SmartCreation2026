import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(700);

await page.locator('button[aria-label="Open menu"]').click({ force: true });
await page.waitForTimeout(1000);

// Inspect drawer
const info = await page.evaluate(() => {
  const drawer = document.querySelector(
    ".lg\\:hidden.fixed.inset-0.z-50.bg-ink",
  );
  if (!drawer) return { found: false };
  const r = drawer.getBoundingClientRect();
  const cs = getComputedStyle(drawer);
  const items = Array.from(drawer.querySelectorAll("nav ul > li")).map((li) => {
    const rr = li.getBoundingClientRect();
    return {
      text: (li.textContent || "").trim().slice(0, 40),
      visible: rr.height > 0 && getComputedStyle(li).display !== "none",
      top: Math.round(rr.top),
      h: Math.round(rr.height),
    };
  });
  const nav = drawer.querySelector("nav");
  const navR = nav ? nav.getBoundingClientRect() : null;
  return {
    found: true,
    drawerRect: { top: r.top, left: r.left, w: r.width, h: r.height },
    bg: cs.backgroundColor,
    opacity: cs.opacity,
    zIndex: cs.zIndex,
    navRect: navR ? { top: navR.top, h: navR.height } : null,
    items,
  };
});
console.log(JSON.stringify(info, null, 2));

// Full screenshot
await page.screenshot({ path: "/tmp/drawer-debug.png", fullPage: false });

await browser.close();
