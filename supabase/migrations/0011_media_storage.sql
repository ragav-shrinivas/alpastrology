-- 0011_media_storage.sql
-- Storage + policies for the visual editor's image uploads (EditableImage).
-- Public "media" bucket; staff write, public read. Media-library rows are
-- public-readable so the picker can list assets. Already applied to live.

begin;

insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media staff insert" on storage.objects;
create policy "media staff insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media' and public.is_staff());

drop policy if exists "media staff update" on storage.objects;
create policy "media staff update" on storage.objects
  for update to authenticated
  using (bucket_id = 'media' and public.is_staff());

drop policy if exists "media staff delete" on storage.objects;
create policy "media staff delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media' and public.is_staff());

-- Media-library table readable by anyone (picker lists assets).
drop policy if exists "media_public_read" on public.media;
create policy "media_public_read" on public.media for select using (true);

commit;
