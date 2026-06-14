# ALP Astrology

A production-ready, fully **database-driven** website for ALP Astrology (Akshaya
Lagna Paddhati). Every piece of content — text, images, navigation, footer,
contact details, sections — is stored in Supabase and editable through a custom
Admin dashboard with a drag-and-drop page builder. **Nothing is hardcoded.**

## Tech stack

- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS v4** (CSS `@theme` tokens) · shadcn-style UI · Lucide icons
- **Framer Motion** + **GSAP** for motion; **React Three Fiber / Three.js** for the cosmic hero
- **Supabase** (Postgres, Auth, RLS, Storage) — the CMS backend
- **Zustand**, **React Hook Form** + **Zod**, **Cloudinary** uploads, **Sonner** toasts
- **dnd-kit** for the page-builder drag & drop

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values (see below)
npm run dev                  # http://localhost:3000
```

### Environment variables (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable/anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only; seed scripts) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used for SEO/sitemap) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Unsigned upload preset |

The Supabase project is already provisioned and seeded. To reproduce on a new
project, run the migrations in `supabase/migrations/` (0001→0005) followed by
`supabase/seed.sql`.

## Admin

- Hidden access (Phase 14): click the small **EVO9** mark in the footer **5 times** → `/admin`.
- Or go directly to `/admin` (redirects to `/admin/login`).
- **Seed admin account:** `admin@alpastrology.org` / `AlpAdmin@2026` — **change this immediately** in production.

The admin can edit: site/meta title, favicon, logo, navigation, footer, contact
info (phone, WhatsApp, email, address, map), social links, every page section
(via the page builder), consultants, courses, services, events, gallery, blog,
testimonials, FAQs, and read contact-form submissions.

## Architecture

```
src/
  app/
    (site)/            # public site (shared nav + footer layout)
    admin/
      login/           # standalone auth
      (dashboard)/     # guarded admin: dashboard, settings, pages builder, CRUD
    sitemap.ts robots.ts not-found.tsx layout.tsx
  components/
    ui/                # shadcn-style primitives
    layout/            # navbar, footer, EVO9 badge, WhatsApp FAB
    sections/          # section renderer + every section type
    cards/  gallery/  forms/  three/  motion/  admin/  seo/  icons/
  lib/
    supabase/          # client / server / public / proxy session
    cms/content.ts     # typed, cached public content fetchers
    admin/             # auth guard + admin queries
  types/database.ts    # generated Supabase types
supabase/migrations/   # SQL schema, RLS, storage
supabase/seed.sql      # idempotent content seed
```

### How content rendering works

Each route loads its `pages` row and the ordered, visible `sections`. The
`SectionRenderer` maps every section `type` to a component, passing the section's
JSONB `content`. Collections (courses, services, etc.) are read live from their
tables. Public reads use a cookieless anon client (RLS allows published rows);
admin writes use the cookie/session client (RLS restricts to staff).

## Security notes

- Row Level Security is enabled on every table (public read of published rows,
  staff-only writes, public insert + staff-only read for the contact form).
- Two storage buckets back direct uploads alongside Cloudinary.
- **Recommended before launch:** enable *Leaked Password Protection* in the
  Supabase dashboard (Auth → Policies) and rotate the seed admin password.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint
