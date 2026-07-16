-- Adds the settings key backing the clickable map image on /contact.
--
-- Additive only: `on conflict do nothing` so re-running can never clobber an
-- image the client has already uploaded. The empty default makes the page fall
-- back to the bundled /contact-map.png until someone uploads a replacement.
--
-- The click destination reuses the existing `contact.map_embed` key rather than
-- adding another one, so the link stays editable where staff already expect it.

insert into public.settings (key, value, "group", label, type)
values ('contact.map_image', to_jsonb(''::text), 'contact', 'Location Map Image', 'url')
on conflict (key) do nothing;
