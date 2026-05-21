import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);

// Closed header
await page.screenshot({ path: "/tmp/menu-closed.png", clip: { x: 0, y: 0, width: 390, height: 200 } });

// Open the hamburger
await page.locator('button[aria-label="Open menu"]').click({ force: true, timeout: 5000 });
await page.waitForTimeout(700);

await page.screenshot({ path: "/tmp/menu-open-top.png", clip: { x: 0, y: 0, width: 390, height: 844 } });

// Tap first expandable nav row (Services)
try {
  await page.locator('nav button:has-text("Services")').first().click({ force: true, timeout: 4000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "/tmp/menu-open-expanded.png", clip: { x: 0, y: 0, width: 390, height: 844 } });

  await page.evaluate(() => {
    const n = document.querySelector("nav.relative.container-edit.flex-1");
    if (n) n.scrollTo(0, 600);
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: "/tmp/menu-open-scrolled.png", clip: { x: 0, y: 0, width: 390, height: 844 } });
} catch (e) {
  console.log("Services click skipped:", e.message);
}

// Check for any overflow inside the open drawer
const result = await page.evaluate(() => {
  const docW = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > docW + 1 && r.width < docW * 2) {
      const tag = el.tagName.toLowerCase();
      const cls = (typeof el.className === "string" ? el.className : "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 4)
        .join(".");
      out.push(`${tag}${cls ? "." + cls : ""} → right=${Math.round(r.right)} w=${Math.round(r.width)}`);
    }
  });
  return { docW, scrollW: document.documentElement.scrollWidth, offenders: out.slice(0, 12) };
});
console.log(JSON.stringify(result, null, 2));

await browser.close();
