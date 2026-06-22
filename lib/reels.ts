import "server-only";
import { supabasePublic, supabaseAdmin } from "./supabase";
import { DEFAULT_REELS, type ReelRow } from "./reels-shared";

export type { ReelRow } from "./reels-shared";

const SELECT_COLS = "id, url, caption, active, display_order";

/** Public-facing: active reels in display order. Fails soft to []. */
export async function getActiveReels(): Promise<ReelRow[]> {
  const { data, error } = await supabasePublic
    .from("sc_reels")
    .select(SELECT_COLS)
    .eq("active", true)
    .order("display_order", { ascending: true });
  if (error) return []; // table may not exist yet
  return (data ?? []) as ReelRow[];
}

/**
 * URLs to render on the site. Uses admin-managed reels when present,
 * otherwise falls back to the built-in defaults so the section is never empty.
 */
export async function getDisplayReelUrls(): Promise<string[]> {
  const rows = await getActiveReels();
  return rows.length ? rows.map((r) => r.url) : DEFAULT_REELS;
}

/** Admin: every reel (active + inactive). */
export async function getAllReelsAdmin(): Promise<ReelRow[]> {
  const { data, error } = await supabaseAdmin
    .from("sc_reels")
    .select(SELECT_COLS)
    .order("display_order", { ascending: true })
    .order("id", { ascending: false });
  if (error) {
    console.error("getAllReelsAdmin failed:", error.message);
    return [];
  }
  return (data ?? []) as ReelRow[];
}

export async function getReelByIdAdmin(id: number): Promise<ReelRow | null> {
  const { data, error } = await supabaseAdmin
    .from("sc_reels")
    .select(SELECT_COLS)
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getReelByIdAdmin failed:", error.message);
    return null;
  }
  return (data ?? null) as ReelRow | null;
}
