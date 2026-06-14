-- =====================================================================
-- ALP Astrology — 0002 CMS core: settings, pages, sections
-- =====================================================================

-- ---------------------------------------------------------------------
-- settings: flexible key/value store for all global, editable content
-- (site title, meta, logo, favicon, nav, footer, contact, socials, map)
-- ---------------------------------------------------------------------
create table if not exists public.settings (
  key         text primary key,
  value       jsonb not null default '{}'::jsonb,
  "group"     text not null default 'general',
  label       text,
  type        text not null default 'text', -- text | textarea | image | url | json | color | richtext
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_settings_updated_at on public.settings;
create trigger trg_settings_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- pages: one row per route; the page builder composes ordered sections
-- ---------------------------------------------------------------------
create table if not exists public.pages (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  status      public.content_status not null default 'published',
  is_system   boolean not null default false,
  position    integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_pages_updated_at on public.pages;
create trigger trg_pages_updated_at
  before update on public.pages
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- sections: the editable building blocks of every page
--   content -> all copy/images for the block (fully editable)
--   styles  -> spacing / colors / typography overrides
-- ---------------------------------------------------------------------
create table if not exists public.sections (
  id          uuid primary key default gen_random_uuid(),
  page_id     uuid not null references public.pages(id) on delete cascade,
  type        text not null,                 -- hero | who_we_are | courses | ...
  name        text,                          -- editor-facing label
  position    integer not null default 0,
  content     jsonb not null default '{}'::jsonb,
  styles      jsonb not null default '{}'::jsonb,
  is_visible  boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists idx_sections_page on public.sections(page_id, position);

drop trigger if exists trg_sections_updated_at on public.sections;
create trigger trg_sections_updated_at
  before update on public.sections
  for each row execute function public.set_updated_at();
