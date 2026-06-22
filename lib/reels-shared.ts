/** Shared types + helpers for the featured-reels feature. Safe to import
 *  from both server and client components — no server-only dependencies. */

export type ReelRow = {
  id: number;
  /** Full Instagram reel URL, e.g. https://www.instagram.com/reel/CODE/ */
  url: string;
  /** Optional internal note / caption. */
  caption: string | null;
  active: boolean;
  display_order: number;
};

/** Shown when no reels are configured in the admin yet (initial state). */
export const DEFAULT_REELS: string[] = [
  "https://www.instagram.com/reel/DZo0_JEJva-/",
  "https://www.instagram.com/reel/DZaOprGq1zk/",
  "https://www.instagram.com/reel/DZFpB4nK4f2/",
];

/**
 * Turn any Instagram reel/post URL into its embeddable iframe src.
 * Accepts /reel/, /reels/, /p/ and /tv/ URLs; falls back to appending
 * /embed/ if the code can't be parsed.
 */
export function reelEmbedSrc(url: string): string {
  const code = url.match(/instagram\.com\/(?:reel|reels|p|tv)\/([^/?#]+)/i)?.[1];
  if (code) return `https://www.instagram.com/reel/${code}/embed/`;
  const base = url.split("?")[0].replace(/\/?$/, "/");
  return `${base}embed/`;
}
