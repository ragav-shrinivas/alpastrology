@AGENTS.md

# ALP Astrology — project guide

Fully database-driven marketing + CMS site. **No content is hardcoded** — every
page renders from Supabase, and everything is editable through `/admin`.

## Stack & key versions
- Next.js **16** App Router (note: `proxy.ts`, not `middleware.ts`), React 19, TypeScript
- Tailwind **v4** — theme tokens live in `src/app/globals.css` under `@theme` (no `tailwind.config`)
- Supabase (Postgres + Auth + RLS + Storage); types in `src/types/database.ts`
- Framer Motion, GSAP, React Three Fiber/Three.js, dnd-kit, Cloudinary, Zod + RHF

## Content model (the important part)
- `settings` — key/value JSONB for all globals (branding, nav, footer, contact, social, SEO).
- `pages` + `sections` — the page builder. A page is an ordered list of `sections`;
  each section has a `type` and a JSONB `content` blob. `SectionRenderer`
  (`src/components/sections/section-renderer.tsx`) maps `type` → component.
- Collections: `courses`, `consultants`, `services`, `events`, `testimonials`,
  `faq`, `blogs`, `gallery`, `categories`, `tags`, `contacts`, `media`, `seo`.

To add a new section type: add a component, register it in `section-renderer.tsx`,
and add the type string to `SECTION_TYPES` in `src/components/admin/page-builder.tsx`.

## Supabase clients (pick the right one)
- `lib/supabase/public.ts` — cookieless anon; use for **public reads** (works in
  `generateStaticParams`/sitemap). All `lib/cms/content.ts` fetchers use this.
- `lib/supabase/server.ts` — cookie/session client for admin reads/writes (RLS = staff).
  Also exports `createAdminClient()` (service role) for trusted server contexts.
- `lib/supabase/client.ts` — browser client.

## RLS
Public can read published rows; staff (`is_staff()` → role admin/editor) can write.
Contact form: anyone inserts, only staff reads. Helpers `is_admin()`/`is_staff()`
are SECURITY DEFINER and intentionally executable (RLS depends on them).

## Admin
- Login: `/admin/login`. Guard: `lib/admin/auth.ts` (`requireStaff`).
- Generic CRUD UI: `components/admin/resource-manager.tsx` driven by `FieldDef[]`.
- Mutations: server actions in `src/app/admin/actions.ts` (revalidate `/` layout).
- Seed admin: `admin@alpastrology.org` / `AlpAdmin@2026` (change in prod).

## Project facts
- Supabase project ref: `mdkpubknjwacszrpkogj` (region ap-south-1).
- Migrations: `supabase/migrations/0001→0005`; seed: `supabase/seed.sql` (idempotent).
- Hidden admin entry: 5 clicks on the footer **EVO9** badge.
