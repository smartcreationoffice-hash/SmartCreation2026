/** Shared types + helpers for the popup feature. Safe to import from
 *  both server and client components — has no server-only dependencies. */

export type PopupRow = {
  id: number;
  title: string;
  subtitle: string | null;
  eyebrow: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_href: string | null;
  /** '*' (all pages) or comma-separated paths like '/, /calculator'. */
  target_pages: string;
  delay_seconds: number;
  active: boolean;
  display_order: number;
};

/**
 * Path-matching used by the client component. '*' or empty matches all.
 * A trailing '/*' wildcards a prefix (e.g. '/services/*' matches '/services/visas').
 */
export function popupMatchesPath(targetPages: string | null | undefined, pathname: string): boolean {
  const raw = (targetPages ?? "").trim();
  if (!raw || raw === "*") return true;
  const patterns = raw.split(",").map((p) => p.trim()).filter(Boolean);
  if (patterns.length === 0) return true;
  for (const pat of patterns) {
    if (pat === "*") return true;
    if (pat.endsWith("/*")) {
      const prefix = pat.slice(0, -2) || "/";
      if (
        pathname === prefix ||
        pathname.startsWith(prefix + "/") ||
        (prefix === "/" && pathname.startsWith("/"))
      ) {
        return true;
      }
    } else if (pat === pathname) {
      return true;
    }
  }
  return false;
}
