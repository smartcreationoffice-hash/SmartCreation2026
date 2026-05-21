import "server-only";
import { supabasePublic, supabaseAdmin } from "./supabase";
import type { PopupRow } from "./popup-shared";

export type { PopupRow } from "./popup-shared";

const SELECT_COLS =
  "id, title, subtitle, eyebrow, image_url, cta_label, cta_href, target_pages, delay_seconds, active, display_order";

/** Public-facing: returns active popups (used by the layout). */
export async function getActivePopups(): Promise<PopupRow[]> {
  const { data, error } = await supabasePublic
    .from("sc_popups")
    .select(SELECT_COLS)
    .eq("active", true)
    .order("display_order", { ascending: true });
  if (error) {
    // Table may not exist yet during initial setup; fail soft.
    return [];
  }
  return (data ?? []) as PopupRow[];
}

/** Admin: returns every popup (active + inactive) for the dashboard. */
export async function getAllPopupsAdmin(): Promise<PopupRow[]> {
  const { data, error } = await supabaseAdmin
    .from("sc_popups")
    .select(SELECT_COLS)
    .order("display_order", { ascending: true })
    .order("id", { ascending: false });
  if (error) {
    console.error("getAllPopupsAdmin failed:", error.message);
    return [];
  }
  return (data ?? []) as PopupRow[];
}

export async function getPopupByIdAdmin(id: number): Promise<PopupRow | null> {
  const { data, error } = await supabaseAdmin
    .from("sc_popups")
    .select(SELECT_COLS)
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getPopupByIdAdmin failed:", error.message);
    return null;
  }
  return (data ?? null) as PopupRow | null;
}
