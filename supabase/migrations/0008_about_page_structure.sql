-- 0008_about_page_structure.sql
-- Make the About page match the original about.php exactly: it should contain
-- only "Our Purpose" + "Our Vision" (+ student testimonials). The "Introduction
-- to ALP Astrology" and founder-bio blocks belong on the original HOME page
-- (index.php), so they are hidden on the About page but kept on Home.
-- Idempotent. Already applied to the live project.

begin;

update sections s set is_visible = false
from pages p
where s.page_id = p.id
  and p.slug = 'about'
  and s.type in ('about_alp', 'founder');

commit;
