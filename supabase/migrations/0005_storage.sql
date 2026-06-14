-- =====================================================================
-- ALP Astrology — 0005 storage buckets + policies
--   Cloudinary handles most media, but these buckets back direct uploads
--   for logos, favicons, gallery assets and course PDFs.
-- =====================================================================

insert into storage.buckets (id, name, public)
values
  ('media', 'media', true),
  ('logos', 'logos', true),
  ('pdfs',  'pdfs',  true)
on conflict (id) do nothing;

-- Public read for all three public buckets
drop policy if exists "public_read_buckets" on storage.objects;
create policy "public_read_buckets" on storage.objects
  for select using (bucket_id in ('media', 'logos', 'pdfs'));

-- Staff may upload / update / delete
drop policy if exists "staff_insert_buckets" on storage.objects;
create policy "staff_insert_buckets" on storage.objects
  for insert with check (bucket_id in ('media', 'logos', 'pdfs') and public.is_staff());

drop policy if exists "staff_update_buckets" on storage.objects;
create policy "staff_update_buckets" on storage.objects
  for update using (bucket_id in ('media', 'logos', 'pdfs') and public.is_staff());

drop policy if exists "staff_delete_buckets" on storage.objects;
create policy "staff_delete_buckets" on storage.objects
  for delete using (bucket_id in ('media', 'logos', 'pdfs') and public.is_staff());
