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
await page.waitForTimeout(800);

// Click "Services" (first expandable)
await page
  .locator('div[role="dialog"] nav button:has-text("Services")')
  .first()
  .click({ force: true });
await page.waitForTimeout(600);

await page.screenshot({ path: "/tmp/drawer-expanded.png", fullPage: false });

await browser.close();
