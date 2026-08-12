/**
 * Digital business cards (the NFC / QR cards) — one row per person in
 * `sc_cards`, rendered by /card/[slug] through the same <DigitalCard/>
 * layout the hand-built /card/asad page uses.
 *
 * The admin panel writes these rows; nothing here needs a redeploy.
 */
import { supabasePublic, supabaseAdmin } from "./supabase";
import type { SocialKey, SocialLink } from "@/components/digital-card";

/**
 * Public origin the QR codes and vCards point at. Overridable with
 * NEXT_PUBLIC_SITE_URL, but note that changing it invalidates QR codes that
 * have already been printed.
 */
export const CARD_SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://smartbusinesscreation.com"
).replace(/\/$/, "");

export type CardRow = {
  id: number;
  slug: string;
  name: string;
  chip: string | null;
  role: string;
  tagline: string;
  photo: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  whatsapp_text: string | null;
  address1: string | null;
  address2: string | null;
  socials: SocialLink[];
  active: boolean;
  created_at: string;
  updated_at: string;
};

const SELECT =
  "id, slug, name, chip, role, tagline, photo, phone, email, whatsapp, whatsapp_text, address1, address2, socials, active, created_at, updated_at";

function normalise(row: Record<string, unknown>): CardRow {
  const socials = Array.isArray(row.socials) ? (row.socials as SocialLink[]) : [];
  return { ...(row as unknown as CardRow), socials };
}

/* ── Reads ─────────────────────────────────────────────────────────── */

/** Public read — active cards only. */
export async function getCard(slug: string): Promise<CardRow | null> {
  const { data, error } = await supabasePublic
    .from("sc_cards")
    .select(SELECT)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();
  if (error) {
    console.error("getCard failed:", error.message);
    return null;
  }
  return data ? normalise(data) : null;
}

export async function getAllCardsAdmin(): Promise<CardRow[]> {
  const { data, error } = await supabaseAdmin
    .from("sc_cards")
    .select(SELECT)
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => normalise(r as Record<string, unknown>));
}

export async function getCardByIdAdmin(id: number): Promise<CardRow | null> {
  const { data, error } = await supabaseAdmin
    .from("sc_cards")
    .select(SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? normalise(data) : null;
}

/* ── Helpers ───────────────────────────────────────────────────────── */

/** Public URL of a card — what the QR code encodes. */
export function cardUrl(slug: string): string {
  return `${CARD_SITE_URL}/card/${slug}`;
}

/** Strip everything but digits (and a leading +) for tel:/wa.me links. */
export function dialDigits(raw: string | null | undefined): string {
  return String(raw ?? "").replace(/[^\d]/g, "");
}

/** Slugify a person's name into a card path: "Asad Hashmi" → "asad-hashmi". */
export function slugifyCardName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const SOCIAL_KEYS: { key: SocialKey; label: string; placeholder: string }[] = [
  { key: "linkedin", label: "LinkedIn", placeholder: "https://www.linkedin.com/in/…" },
  { key: "instagram", label: "Instagram", placeholder: "https://www.instagram.com/…" },
  { key: "facebook", label: "Facebook", placeholder: "https://www.facebook.com/…" },
  { key: "tiktok", label: "TikTok", placeholder: "https://www.tiktok.com/@…" },
  { key: "youtube", label: "YouTube", placeholder: "https://www.youtube.com/@…" },
  { key: "x", label: "X (Twitter)", placeholder: "https://x.com/…" },
  { key: "threads", label: "Threads", placeholder: "https://www.threads.com/@…" },
];

/**
 * Build the .vcf payload phones import when someone taps "Save contact".
 * vCard 3.0 — the version iOS and Android both handle without complaint.
 */
export function buildVCard(card: CardRow): string {
  const parts = card.name.trim().split(/\s+/);
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  const first = parts.length > 1 ? parts.slice(0, -1).join(" ") : card.name;

  // Escape the characters vCard treats as structure.
  const esc = (v: string) =>
    v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(last)};${esc(first)};;;`,
    `FN:${esc(card.name)}`,
    "ORG:Smart Creation Group of Companies",
  ];
  if (card.chip) lines.push(`TITLE:${esc(card.chip)}`);
  if (card.phone) lines.push(`TEL;TYPE=WORK,VOICE:+${dialDigits(card.phone)}`);
  if (card.whatsapp) lines.push(`TEL;TYPE=CELL:+${dialDigits(card.whatsapp)}`);
  if (card.email) lines.push(`EMAIL;TYPE=WORK,INTERNET:${card.email}`);
  const addr = [card.address1, card.address2].filter(Boolean).join(", ");
  if (addr) lines.push(`ADR;TYPE=WORK:;;${esc(addr)};;;;`);
  lines.push(`URL:${cardUrl(card.slug)}`);
  for (const s of card.socials) {
    if (s?.href) lines.push(`X-SOCIALPROFILE;TYPE=${s.icon}:${s.href}`);
  }
  lines.push("END:VCARD");
  return lines.join("\r\n");
}
