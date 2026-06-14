-- =====================================================================
-- ALP Astrology — 0004 RLS policies
--   Public: read published content.  Staff (admin/editor): full write.
--   Contacts: anyone may submit; only staff may read/manage.
-- =====================================================================

-- Enable RLS everywhere
do $$
declare t text;
begin
  foreach t in array array[
    'settings','pages','sections','categories','tags','services','courses',
    'consultants','media','gallery','blogs','blog_tags','events','testimonials',
    'faq','contacts','seo'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
  end loop;
end $$;

-- Helper to (re)create a pair of policies cleanly
-- Public-readable reference tables (always readable)
do $$
declare t text;
begin
  foreach t in array array['settings','categories','tags','media','blog_tags','seo'] loop
    execute format('drop policy if exists "%1$s_public_read" on public.%1$s;', t);
    execute format('create policy "%1$s_public_read" on public.%1$s for select using (true);', t);
    execute format('drop policy if exists "%1$s_staff_write" on public.%1$s;', t);
    execute format('create policy "%1$s_staff_write" on public.%1$s for all using (public.is_staff()) with check (public.is_staff());', t);
  end loop;
end $$;

-- Status-gated tables (public reads only published rows)
do $$
declare t text;
begin
  foreach t in array array['services','courses','consultants','gallery','testimonials','faq'] loop
    execute format('drop policy if exists "%1$s_public_read" on public.%1$s;', t);
    execute format($p$create policy "%1$s_public_read" on public.%1$s for select using (status = 'published' or public.is_staff());$p$, t);
    execute format('drop policy if exists "%1$s_staff_write" on public.%1$s;', t);
    execute format('create policy "%1$s_staff_write" on public.%1$s for all using (public.is_staff()) with check (public.is_staff());', t);
  end loop;
end $$;

-- pages
drop policy if exists "pages_public_read" on public.pages;
create policy "pages_public_read" on public.pages
  for select using (status = 'published' or public.is_staff());
drop policy if exists "pages_staff_write" on public.pages;
create policy "pages_staff_write" on public.pages
  for all using (public.is_staff()) with check (public.is_staff());

-- sections (visible + parent page published)
drop policy if exists "sections_public_read" on public.sections;
create policy "sections_public_read" on public.sections
  for select using (
    public.is_staff() or (
      is_visible and exists (
        select 1 from public.pages p where p.id = page_id and p.status = 'published'
      )
    )
  );
drop policy if exists "sections_staff_write" on public.sections;
create policy "sections_staff_write" on public.sections
  for all using (public.is_staff()) with check (public.is_staff());

-- blogs
drop policy if exists "blogs_public_read" on public.blogs;
create policy "blogs_public_read" on public.blogs
  for select using (status = 'published' or public.is_staff());
drop policy if exists "blogs_staff_write" on public.blogs;
create policy "blogs_staff_write" on public.blogs
  for all using (public.is_staff()) with check (public.is_staff());

-- events
drop policy if exists "events_public_read" on public.events;
create policy "events_public_read" on public.events
  for select using (is_published or public.is_staff());
drop policy if exists "events_staff_write" on public.events;
create policy "events_staff_write" on public.events
  for all using (public.is_staff()) with check (public.is_staff());

-- contacts: anyone may submit; staff may read/manage
drop policy if exists "contacts_public_insert" on public.contacts;
create policy "contacts_public_insert" on public.contacts
  for insert with check (true);
drop policy if exists "contacts_staff_read" on public.contacts;
create policy "contacts_staff_read" on public.contacts
  for select using (public.is_staff());
drop policy if exists "contacts_staff_manage" on public.contacts;
create policy "contacts_staff_manage" on public.contacts
  for update using (public.is_staff()) with check (public.is_staff());
drop policy if exists "contacts_staff_delete" on public.contacts;
create policy "contacts_staff_delete" on public.contacts
  for delete using (public.is_staff());
