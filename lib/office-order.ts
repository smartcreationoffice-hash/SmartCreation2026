/**
 * Office numbers are free text — "Office 9", "Office 74", "Co-working",
 * "Flex space" — so a plain string sort puts 100 before 9 and insertion
 * order puts 90 before 74. Everything that renders a property list orders
 * through here instead, so newly uploaded units drop straight into
 * sequence without anyone touching the data.
 *
 * Rule: numbered units ascend by their number; unnumbered ones (Co-working,
 * Flex space, Virtual Office…) come after, alphabetically.
 */

/** First integer inside the label, or Infinity when there isn't one. */
export function officeNoRank(officeNo: string | null | undefined): number {
  const m = String(officeNo ?? "").match(/\d+/);
  return m ? Number(m[0]) : Number.POSITIVE_INFINITY;
}

/** Comparator for two raw office-number labels. */
export function compareOfficeNo(
  a: string | null | undefined,
  b: string | null | undefined,
): number {
  const ra = officeNoRank(a);
  const rb = officeNoRank(b);
  if (ra !== rb) return ra - rb;
  return String(a ?? "").localeCompare(String(b ?? ""), "en", {
    sensitivity: "base",
    numeric: true,
  });
}

/** Sort any list of records that carry an office-number label. */
export function sortByOfficeNo<T>(
  items: T[],
  getOfficeNo: (item: T) => string | null | undefined,
): T[] {
  return [...items].sort((a, b) => compareOfficeNo(getOfficeNo(a), getOfficeNo(b)));
}
