-- ─────────────────────────────────────────────────────────────────────
-- One-time setup for the digital business cards (Admin → Digital cards).
--
-- Run this once in Supabase → SQL Editor → New query → Run.
-- It is safe to run again; every statement is idempotent.
--
-- The same block also lives in scripts/supabase-schema.sql, which is the
-- full schema for a fresh project.
-- ─────────────────────────────────────────────────────────────────────

create table if not exists public.sc_cards (
  id             bigserial   primary key,
  slug           text        not null unique,          -- /card/<slug>
  name           text        not null,
  chip           text,                                 -- pill above the name, e.g. "Founder & C.E.O"
  role           text        not null default 'Smart Creation Group of Companies',
  tagline        text        not null default '',
  photo          text,                                 -- portrait; falls back to the SC cube
  phone          text,
  email          text,
  whatsapp       text,
  whatsapp_text  text,
  address1       text,
  address2       text,
  socials        jsonb       not null default '[]'::jsonb,  -- [{label, href, icon}]
  active         boolean     not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists sc_cards_slug_idx
  on public.sc_cards (slug);

-- Keeps updated_at current. The function already exists if the rest of the
-- schema was installed; this recreates it harmlessly otherwise.
create or replace function public.sc_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists sc_cards_updated_at on public.sc_cards;
create trigger sc_cards_updated_at
  before update on public.sc_cards
  for each row execute function public.sc_set_updated_at();

-- Public site reads live cards only; writes go through the service role
-- (the admin panel), never the browser.
alter table public.sc_cards enable row level security;

drop policy if exists "sc_cards anon read" on public.sc_cards;
create policy "sc_cards anon read"
  on public.sc_cards for select
  to anon, authenticated
  using (active = true);
