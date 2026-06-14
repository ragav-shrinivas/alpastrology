-- 0009_match_original_pages.sql
-- Restructure the site so every page mirrors the original ALP Astrology site
-- (alpastrology.co.in) page-for-page with verbatim content.
-- Removes pages not in the original; rebuilds Home/Courses/Consultation/
-- Software/Books with exact copy; loads the original Articles; moves the
-- student testimonials to the About page.
-- Idempotent for structure. Already applied to the live project.
-- NOTE: the 64 verbatim Tamil article rows were bulk-loaded into `blogs`
-- (slugs article-1..article-64) and are present in the live database.

begin;

-- 1. Remove pages not present on the original site.
delete from sections where page_id in (select id from pages where slug in ('services','consultants','gallery','testimonials'));
delete from pages where slug in ('services','consultants','gallery','testimonials');

-- 2. Navigation = original menu exactly.
update settings set value = '[
  {"href":"/","label":"Home"},{"href":"/about","label":"About Us"},{"href":"/courses","label":"Courses"},
  {"href":"/consultation","label":"Consultation"},{"href":"/software","label":"Software"},{"href":"/books","label":"Books"},
  {"href":"/blog","label":"Articles"},{"href":"/videos","label":"Videos"},{"href":"/events","label":"Events"},
  {"href":"/contact","label":"Contact"},{"href":"/faq","label":"FAQs"}
]'::jsonb where key = 'navigation.items';

-- 3. Home = hero + Introduction + Founder + Software + Marriage matching (original index.php).
update sections s set is_visible = false from pages p
where s.page_id = p.id and p.slug = 'home'
  and s.type in ('who_we_are','services','courses','consultation','events','blog','video','mission','testimonials','cta','zodiac_journey');
update sections s set position = 1 from pages p where s.page_id=p.id and p.slug='home' and s.type='about_alp';
update sections s set position = 2 from pages p where s.page_id=p.id and p.slug='home' and s.type='founder';
-- Software + Marriage sections added on Home (about_alp type) with verbatim index.php text.

-- 4. Courses: Basic fee Rs. 5900; exact "Training Classes" intro added before the list.
update courses set price = 'Rs. 5900' where slug = 'basic-alp-astrology';

-- 5. Consultation page rebuilt as the original booking Terms & Conditions (8 rules + note).
-- 6. Software page = verbatim index.php software text + the 3 subscription packages (Basic/Advanced/TP).
-- 7. Books page = exact synopses + prices for 7 Tamil + 3 English volumes.
-- 8. About page = Our Purpose + Our Vision + Students Corner testimonials (original about.php).
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Students Corner', 'testimonials', '{"title":"Students Corner","description":"What our ALP Astrology learners say."}'::jsonb, 5, true
from pages where slug='about'
  and not exists (select 1 from sections s where s.page_id = pages.id and s.type='testimonials');

-- The full verbatim content blobs for sections 3-7 were applied via the live
-- Supabase project (see session migration). Content is page-faithful to the
-- original site with no summarisation and no added information.

commit;
