/**
 * Open the Smart Creation Group's Google Business share link with a real
 * browser (Playwright) and grab the top reviews. One-shot script.
 *
 *   node scripts/scrape-google-reviews.mjs
 */
import { chromium } from "playwright";

const SHARE_URL = "https://share.google/1dajNlp5Rf9qaLxXv";

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  locale: "en-US",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
});
const page = await ctx.newPage();

await page.goto(SHARE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
// Wait for redirect chain to settle
await page.waitForLoadState("networkidle", { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(2500);

console.log("Final URL:", page.url());

// Dismiss consent dialog if any
const consentButton = page.locator(
  'button:has-text("Accept all"), button:has-text("I agree"), button:has-text("Reject all")',
);
if (await consentButton.first().isVisible().catch(() => false)) {
  await consentButton.first().click().catch(() => {});
  await page.waitForTimeout(1500);
}

// Try to click the Reviews tab if we landed on a place listing
try {
  await page
    .locator('button:has-text("Reviews"), a:has-text("Reviews")')
    .first()
    .click({ timeout: 4000 });
  await page.waitForTimeout(2000);
} catch {
  // already on reviews
}

// Scroll the reviews panel a few times to load more
const scrollContainer = await page.evaluateHandle(() => {
  // Google's reviews panel usually has role="main" or a tabpanel
  const panels = Array.from(document.querySelectorAll("div"));
  let best = null;
  let bestArea = 0;
  for (const p of panels) {
    const cs = getComputedStyle(p);
    if (cs.overflowY === "auto" || cs.overflowY === "scroll") {
      const r = p.getBoundingClientRect();
      const area = r.width * r.height;
      if (area > bestArea && r.height > 300) {
        bestArea = area;
        best = p;
      }
    }
  }
  return best;
});
for (let i = 0; i < 6; i++) {
  await scrollContainer.evaluate((el) => {
    if (el) el.scrollBy(0, 1200);
  });
  await page.waitForTimeout(800);
}

// Extract reviews
const reviews = await page.evaluate(() => {
  const out = [];
  // Google Maps review cards have data-review-id attribute
  const cards = document.querySelectorAll("[data-review-id]");
  cards.forEach((card) => {
    const nameEl = card.querySelector(
      '[class*="d4r55"], [class*="jftiEf"] [aria-label*="rating"]',
    );
    const name =
      card.querySelector('[class*="d4r55"]')?.textContent?.trim() ||
      card.querySelector("div.WNxzHc, .d4r55")?.textContent?.trim() ||
      "";
    const ratingEl = card.querySelector('[aria-label*="star"], [role="img"][aria-label*="star"]');
    const ratingLabel = ratingEl?.getAttribute("aria-label") || "";
    const ratingMatch = ratingLabel.match(/(\d)/);
    const rating = ratingMatch ? Number(ratingMatch[1]) : null;
    const date =
      card.querySelector(".rsqaWe, .DZSIDd")?.textContent?.trim() || "";
    let text =
      card.querySelector(".wiI7pd, .MyEned, .review-full-text")?.textContent?.trim() || "";
    if (!text) {
      // fallback: grab any long text inside the card
      const candidates = Array.from(card.querySelectorAll("span, div"))
        .map((n) => n.textContent?.trim() || "")
        .filter((t) => t.length > 40);
      text = candidates[0] || "";
    }
    if (name || text) {
      out.push({ name, rating, date, text });
    }
  });
  return out;
});

console.log(`Found ${reviews.length} reviews`);
console.log(JSON.stringify(reviews.slice(0, 10), null, 2));

// Save HTML for debugging if we got nothing
if (reviews.length === 0) {
  const html = await page.content();
  console.log("---HTML head (debug)---");
  console.log(html.slice(0, 1500));
}

await browser.close();
