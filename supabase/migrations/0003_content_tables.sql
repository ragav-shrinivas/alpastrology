-- =====================================================================
-- ALP Astrology — 0003 content tables
-- =====================================================================

create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  kind        text not null default 'blog', -- blog | course | gallery
  created_at  timestamptz not null default now()
);

create table if not exists public.tags (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  created_at  timestamptz not null default now()
);

create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  icon        text,
  features    text[] not null default '{}',
  image_url   text,
  position    integer not null default 0,
  status      public.content_status not null default 'published',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  level       text,                 -- basic | advanced | master | other
  duration    text,
  price       text,
  instructor  text,
  image_url   text,
  syllabus    jsonb not null default '[]'::jsonb,
  pdf_url     text,
  languages   text[] not null default '{}',
  position    integer not null default 0,
  status      public.content_status not null default 'published',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.consultants (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  designation    text,
  experience     text,
  description    text,
  specialization text[] not null default '{}',
  languages      text[] not null default '{}',
  photo_url      text,
  whatsapp       text,
  booking_link   text,
  position       integer not null default 0,
  status         public.content_status not null default 'published',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create table if not exists public.media (
  id          uuid primary key default gen_random_uuid(),
  type        public.media_type not null default 'image',
  url         text not null,
  public_id   text,                 -- cloudinary public_id
  title       text,
  alt         text,
  folder      text,
  width       integer,
  height      integer,
  created_at  timestamptz not null default now()
);

create table if not exists public.gallery (
  id          uuid primary key default gen_random_uuid(),
  media_id    uuid references public.media(id) on delete set null,
  type        public.media_type not null default 'image',
  url         text not null,
  thumbnail   text,
  title       text,
  category    text,
  is_featured boolean not null default false,
  position    integer not null default 0,
  status      public.content_status not null default 'published',
  created_at  timestamptz not null default now()
);

create table if not exists public.blogs (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  slug            text not null unique,
  excerpt         text,
  content         text,                 -- rich HTML
  featured_image  text,
  author          text,
  category_id     uuid references public.categories(id) on delete set null,
  status          public.content_status not null default 'draft',
  meta_title      text,
  meta_description text,
  views           integer not null default 0,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.blog_tags (
  blog_id uuid references public.blogs(id) on delete cascade,
  tag_id  uuid references public.tags(id) on delete cascade,
  primary key (blog_id, tag_id)
);

create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  image_url   text,
  location    text,
  event_date  timestamptz,
  status      public.event_status not null default 'upcoming',
  position    integer not null default 0,
  is_published boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  content     text not null,
  rating      integer not null default 5,
  avatar_url  text,
  position    integer not null default 0,
  status      public.content_status not null default 'published',
  created_at  timestamptz not null default now()
);

create table if not exists public.faq (
  id          uuid primary key default gen_random_uuid(),
  question    text not null,
  answer      text,
  category    text default 'general',
  position    integer not null default 0,
  status      public.content_status not null default 'published',
  created_at  timestamptz not null default now()
);

create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text,
  phone       text,
  subject     text,
  message     text not null,
  status      public.contact_status not null default 'new',
  created_at  timestamptz not null default now()
);

create table if not exists public.seo (
  id              uuid primary key default gen_random_uuid(),
  path            text not null unique,
  meta_title      text,
  meta_description text,
  og_image        text,
  keywords        text[] not null default '{}',
  structured_data jsonb,
  updated_at      timestamptz not null default now()
);

-- updated_at triggers
do $$
declare t text;
begin
  foreach t in array array['services','courses','consultants','blogs','events','seo']
  loop
    execute format('drop trigger if exists trg_%1$s_updated_at on public.%1$s;', t);
    execute format('create trigger trg_%1$s_updated_at before update on public.%1$s for each row execute function public.set_updated_at();', t);
  end loop;
end $$;
