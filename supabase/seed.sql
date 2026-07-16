-- =====================================================================
-- ALP Astrology — seed data (idempotent). Run AFTER migrations 0001-0005.
-- Preloads all initial CMS content. `on conflict do nothing` ensures it
-- never overwrites edits made through the Admin dashboard.
--
-- Apply with: supabase db reset  (runs migrations + this seed), or
--   psql "$DATABASE_URL" -f supabase/seed.sql
-- =====================================================================

-- ---------- SETTINGS ----------
insert into public.settings (key, value, "group", label, type) values
  ('site.title',        to_jsonb('ALP Astrology'::text), 'general', 'Site Title', 'text'),
  ('site.tagline',      to_jsonb('Akshaya Lagna Paddhati — Vedic Wisdom, Modern Clarity'::text), 'general', 'Tagline', 'text'),
  ('meta.title',        to_jsonb('ALP Astrology — Unlock the Secrets of Your Destiny'::text), 'seo', 'Meta Title', 'text'),
  ('meta.description',  to_jsonb('Experience the perfect blend of traditional Vedic wisdom and modern interpretation with ALP Astrology — consultations, structured courses, and astrology software.'::text), 'seo', 'Meta Description', 'textarea'),
  ('meta.keywords',     to_jsonb(array['ALP Astrology','Akshaya Lagna Paddhati','Vedic Astrology','Astrology Courses','Astrology Consultation','KP Astrology']), 'seo', 'Meta Keywords', 'json'),
  ('branding.logo',         to_jsonb(''::text), 'branding', 'Logo Image URL', 'image'),
  ('branding.logo_text',    to_jsonb('ALP Astrology'::text), 'branding', 'Logo Text', 'text'),
  ('branding.favicon',      to_jsonb(''::text), 'branding', 'Favicon URL', 'image'),
  ('navigation.items', '[
      {"label":"Home","href":"/"},{"label":"About","href":"/about"},{"label":"Services","href":"/services"},
      {"label":"Courses","href":"/courses"},{"label":"Consultants","href":"/consultants"},{"label":"Gallery","href":"/gallery"},
      {"label":"Events","href":"/events"},{"label":"Blog","href":"/blog"},{"label":"Contact","href":"/contact"}
    ]'::jsonb, 'navigation', 'Header Navigation', 'json'),
  ('footer.about', to_jsonb('ALP Astrology blends traditional Vedic wisdom with modern interpretation to bring clarity, self-discovery, and positive transformation through the wisdom of the stars.'::text), 'footer', 'Footer About', 'textarea'),
  ('footer.copyright', to_jsonb('© ALP Astrology. All rights reserved.'::text), 'footer', 'Copyright', 'text'),
  ('footer.columns', '[
      {"title":"Explore","links":[{"label":"About","href":"/about"},{"label":"Services","href":"/services"},{"label":"Courses","href":"/courses"},{"label":"Consultants","href":"/consultants"}]},
      {"title":"Resources","links":[{"label":"Gallery","href":"/gallery"},{"label":"Events","href":"/events"},{"label":"Blog","href":"/blog"},{"label":"FAQ","href":"/faq"}]},
      {"title":"Legal","links":[{"label":"Privacy Policy","href":"/privacy-policy"},{"label":"Terms & Conditions","href":"/terms"},{"label":"Refund Policy","href":"/refund-policy"}]}
    ]'::jsonb, 'footer', 'Footer Columns', 'json'),
  ('contact.phone',     to_jsonb(''::text), 'contact', 'Phone', 'text'),
  ('contact.email',     to_jsonb(''::text), 'contact', 'Email', 'text'),
  ('contact.whatsapp',  to_jsonb('9840072167'::text), 'contact', 'WhatsApp', 'text'),
  ('contact.address',   to_jsonb('F2, 1st Floor, Shiva Homes, Jayalakshmi Nagar, Anandha Sayanam, Moulivakkam, Chennai, Tamil Nadu, India, 600116'::text), 'contact', 'Address', 'textarea'),
  ('contact.map_embed', to_jsonb(''::text), 'contact', 'Google Map Embed URL', 'url'),
  ('contact.map_image', to_jsonb(''::text), 'contact', 'Location Map Image', 'url'),
  ('social.instagram',  to_jsonb('https://www.instagram.com/santhakumarvelayutham/'::text), 'social', 'Instagram', 'url'),
  ('social.facebook',   to_jsonb('https://www.facebook.com/p/ALP-SRI-GURU-Santhakumar-61559910637136/'::text), 'social', 'Facebook', 'url'),
  ('social.youtube',    to_jsonb(''::text), 'social', 'YouTube', 'url')
on conflict (key) do nothing;

-- ---------- PAGES ----------
insert into public.pages (slug, title, status, is_system, position) values
  ('home','Home','published',true,0),('about','About','published',true,1),
  ('services','Services','published',true,2),('courses','Courses','published',true,3),
  ('consultants','Consultants','published',true,4),('gallery','Gallery','published',true,5),
  ('events','Events','published',true,6),('testimonials','Testimonials','published',true,7),
  ('blog','Blog','published',true,8),('contact','Contact','published',true,9),
  ('faq','FAQ','published',true,10),('privacy-policy','Privacy Policy','published',true,11),
  ('terms','Terms and Conditions','published',true,12),('refund-policy','Refund Policy','published',true,13)
on conflict (slug) do nothing;

-- ---------- HOME SECTIONS ----------
with h as (select id from public.pages where slug = 'home')
insert into public.sections (page_id, type, name, position, content)
select h.id, s.type, s.name, s.position, s.content from h, (values
  ('hero','Hero',0,'{"title":"Unlock the Secrets of Your Destiny with ALP Astrology","subtitle":"Experience the perfect blend of traditional Vedic wisdom and modern interpretation.","buttons":[{"label":"Book a Consultation","href":"/contact","variant":"primary"},{"label":"Join Our Courses","href":"/courses","variant":"secondary"}]}'::jsonb),
  ('who_we_are','Who We Are',1,'{"title":"Who We Are","paragraphs":["At ALP Astrology, we empower individuals with deep, meaningful insights by blending traditional astrology with modern psychological understanding.","Our vision is to create a future where every home has access to a skilled ALP astrologer, making astrology a structured and trusted part of personal growth.","We strive to bring clarity, self-discovery, and positive transformation through the wisdom of the stars."],"button":{"label":"Learn More About Us","href":"/about"}}'::jsonb),
  ('services','Services',2,'{"title":"What We Offer","description":"Consultation, structured courses, and professional astrology software — crafted for accuracy and guidance."}'::jsonb),
  ('courses','Courses',3,'{"title":"Learn Astrology from the Experts","description":"Begin your ALP Astrology journey with structured, easy-to-understand training programs designed for beginners, advancing learners, and aspiring professionals.","button":{"label":"Explore Our Courses","href":"/courses"}}'::jsonb),
  ('consultation','Consultation',4,'{"title":"Discover Astrology Crafted for Your Unique Journey","description":"Every individual''s path is different. Our expert consultations guide you through life''s twists and turns with clarity, confidence, and positive direction.","items":["Personal Birth Chart Insights","Career and Financial Growth Advice","Marriage and Relationship Compatibility","Health and Life Path Healing Solutions"],"button":{"label":"Book Your Consultation Now","href":"/contact"}}'::jsonb),
  ('events','Events',5,'{"title":"Astrological Events","description":"Join our special classes, spiritual rituals, and learning sessions designed to enhance your understanding of astrology, energy balance, and life transformation.","button":{"label":"View Upcoming Events","href":"/events"}}'::jsonb),
  ('blog','Blog',6,'{"title":"Insightful Articles and Blog","description":"Dive into our curated collection of detailed write-ups that explore foundational astrology, advanced prediction methods, and deep cosmic insights to enrich your spiritual journey.","button":{"label":"Read the Blog","href":"/blog"}}'::jsonb),
  ('video','Video Tutorials',7,'{"title":"Video Tutorials and Lectures","description":"Explore our exclusive video collection where seasoned astrologers share their wisdom through practical teachings, predictive insights, and easy-to-follow guidance for every learner.","topics":["Guided Astrology Learning Videos","Daily and Practical Astrology Tips","Weekly Insightful Predictions","Monthly Astrological Outlook","Interactive Expert Discussion Sessions"],"videos":[]}'::jsonb),
  ('about_alp','About ALP',8,'{"title":"Introduction to ALP Astrology","subtitle":"Welcome to the fascinating world of ALP Astrology","paragraphs":["ALP stands for Akshaya Lagna Paddhati.","ALP Astrology enables individuals to unlock the secrets of the cosmos and gain a deeper understanding of themselves, their life''s journey, and the world around them.","Traditional astrology relies heavily on Dasa and Bukthi calculations based on moon progression.","ALP introduces the concept of Lagna progression to improve predictive accuracy and provide a more complete astrological framework."]}'::jsonb),
  ('founder','Founder',9,'{"title":"Dr. S. Pothuvudaimoorthy Ph.D.","subtitle":"Inventor of ALP Astrology","image":"","bio":["Founder story and biography — editable from Admin."],"achievements":[],"awards":[],"media_appearances":[]}'::jsonb),
  ('mission','Mission',10,'{"title":"Our Purpose","items":["Empower individuals through profound insights.","Create a world where every household has access to a skilled ALP astrologer.","Provide structured and accessible astrology education.","Build a global community of astrologers.","Advance astrology through modern methodologies."]}'::jsonb),
  ('testimonials','Testimonials',11,'{"title":"What Our Community Says","description":"Real stories of clarity, growth, and transformation."}'::jsonb),
  ('cta','Closing CTA',12,'{"title":"Begin Your Cosmic Journey Today","description":"Book a consultation or enroll in a course and let the wisdom of the stars guide your path.","buttons":[{"label":"Book a Consultation","href":"/contact","variant":"primary"},{"label":"Join Our Courses","href":"/courses","variant":"secondary"}]}'::jsonb)
) as s(type,name,position,content) on conflict do nothing;

-- Insert the scroll-driven zodiac journey right after the hero (idempotent).
do $$
declare home_id uuid;
begin
  select id into home_id from public.pages where slug = 'home';
  if home_id is not null
     and not exists (select 1 from public.sections where page_id = home_id and type = 'zodiac_journey') then
    update public.sections set position = position + 1 where page_id = home_id and position >= 1;
    insert into public.sections (page_id, type, name, position, content)
    values (home_id, 'zodiac_journey', 'Zodiac Journey', 1,
      '{"title":"Discover Your Cosmic Blueprint","description":"Scroll to journey through the twelve signs."}'::jsonb);
  end if;
end $$;

-- ---------- ABOUT / COURSES / HEADER / LEGAL SECTIONS ----------
with p as (select id from public.pages where slug='about')
insert into public.sections (page_id, type, name, position, content)
select p.id, s.type, s.name, s.position, s.content from p, (values
  ('page_header','Header',0,'{"title":"About ALP Astrology","subtitle":"Akshaya Lagna Paddhati — where tradition meets modern clarity."}'::jsonb),
  ('who_we_are','Who We Are',1,'{"title":"Who We Are","paragraphs":["At ALP Astrology, we empower individuals with deep, meaningful insights by blending traditional astrology with modern psychological understanding.","Our vision is to create a future where every home has access to a skilled ALP astrologer, making astrology a structured and trusted part of personal growth.","We strive to bring clarity, self-discovery, and positive transformation through the wisdom of the stars."]}'::jsonb),
  ('about_alp','About ALP',2,'{"title":"Introduction to ALP Astrology","subtitle":"Welcome to the fascinating world of ALP Astrology","paragraphs":["ALP stands for Akshaya Lagna Paddhati.","ALP Astrology enables individuals to unlock the secrets of the cosmos and gain a deeper understanding of themselves, their life''s journey, and the world around them.","Traditional astrology relies heavily on Dasa and Bukthi calculations based on moon progression.","ALP introduces the concept of Lagna progression to improve predictive accuracy and provide a more complete astrological framework."]}'::jsonb),
  ('founder','Founder',3,'{"title":"Dr. S. Pothuvudaimoorthy Ph.D.","subtitle":"Inventor of ALP Astrology","image":"","bio":["Founder story and biography — editable from Admin."],"achievements":[],"awards":[],"media_appearances":[]}'::jsonb),
  ('mission','Mission',4,'{"title":"Our Purpose","items":["Empower individuals through profound insights.","Create a world where every household has access to a skilled ALP astrologer.","Provide structured and accessible astrology education.","Build a global community of astrologers.","Advance astrology through modern methodologies."]}'::jsonb)
) as s(type,name,position,content) on conflict do nothing;

with p as (select id from public.pages where slug='courses')
insert into public.sections (page_id, type, name, position, content)
select p.id, s.type, s.name, s.position, s.content from p, (values
  ('page_header','Header',0,'{"title":"ALP Astrology Training Classes","subtitle":"ALP Astrology classes are given in three levels: Basic, Advanced and Master — plus the ALP Thirumana Porutham course. Currently available in Tamil and English."}'::jsonb),
  ('courses','Courses List',1,'{"title":"Choose Your Path","description":"Structured programmes for every level of learner."}'::jsonb)
) as s(type,name,position,content) on conflict do nothing;

with p as (select id from public.pages where slug='services')
insert into public.sections (page_id, type, name, position, content)
select p.id,'page_header','Header',0,'{"title":"Our Services","subtitle":"Consultation, Courses and Software — crafted for accuracy and guidance."}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='consultants')
insert into public.sections (page_id, type, name, position, content)
select p.id,'page_header','Header',0,'{"title":"Our Consultants","subtitle":"Meet the expert astrologers guiding your journey."}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='gallery')
insert into public.sections (page_id, type, name, position, content)
select p.id,'page_header','Header',0,'{"title":"Gallery","subtitle":"Moments from our classes, events and rituals."}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='events')
insert into public.sections (page_id, type, name, position, content)
select p.id,'page_header','Header',0,'{"title":"Astrological Events","subtitle":"Special classes, spiritual rituals and learning sessions."}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='testimonials')
insert into public.sections (page_id, type, name, position, content)
select p.id,'page_header','Header',0,'{"title":"Testimonials","subtitle":"Stories of clarity, growth and transformation."}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='blog')
insert into public.sections (page_id, type, name, position, content)
select p.id,'page_header','Header',0,'{"title":"Insightful Articles and Blog","subtitle":"Foundational astrology, advanced prediction methods and deep cosmic insights."}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='faq')
insert into public.sections (page_id, type, name, position, content)
select p.id,'page_header','Header',0,'{"title":"Frequently Asked Questions","subtitle":"Answers to the questions we hear most often."}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='contact')
insert into public.sections (page_id, type, name, position, content)
select p.id,'page_header','Header',0,'{"title":"Get in Touch","subtitle":"Book a consultation or ask us anything — we would love to hear from you."}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='privacy-policy')
insert into public.sections (page_id, type, name, position, content)
select p.id,'legal','Body',0,'{"title":"Privacy Policy","body":"<p>This Privacy Policy is an editable placeholder. Update it from Admin.</p>"}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='terms')
insert into public.sections (page_id, type, name, position, content)
select p.id,'legal','Body',0,'{"title":"Terms and Conditions","body":"<p>These Terms and Conditions are an editable placeholder. Update them from Admin.</p>"}'::jsonb from p on conflict do nothing;
with p as (select id from public.pages where slug='refund-policy')
insert into public.sections (page_id, type, name, position, content)
select p.id,'legal','Body',0,'{"title":"Refund Policy","body":"<p>This Refund Policy is an editable placeholder. Update it from Admin.</p>"}'::jsonb from p on conflict do nothing;

-- ---------- SERVICES ----------
insert into public.services (title, slug, description, icon, features, position) values
  ('Consultation','consultation','Professional consultation providing detailed chart analysis and practical guidance.','sparkles',
    array['Birth Chart Analysis','Career and Financial Guidance','Marriage and Compatibility Analysis','Health and Wellness Remedies'],0),
  ('Courses','courses','Professionally structured courses for beginners, intermediate learners, and professionals.','graduation-cap',
    array['Vedic Astrology','KP Astrology','Prediction Analysis','Chart Interpretation'],1),
  ('Software','software','Advanced astrology software built for accuracy and professional chart analysis.','monitor',
    array['Professional Tools','Predictive Models','Divisional Charts','Planetary Calculations'],2)
on conflict (slug) do nothing;

-- ---------- COURSES ----------
insert into public.courses (title, slug, description, level, languages, position) values
  ('Basic ALP Astrology Training Course','basic-alp-astrology','Build strong foundations in ALP Astrology with an easy-to-understand beginner programme.','basic', array['Tamil','English'],0),
  ('Advanced ALP Astrology Training Course','advanced-alp-astrology','Deepen your knowledge and sharpen your predictive skills with advanced ALP techniques.','advanced', array['Tamil','English'],1),
  ('Master ALP Astrology Training Course','master-alp-astrology','Master advanced predictive techniques and professional chart interpretation.','master', array['Tamil','English'],2),
  ('ALP Thirumana Porutham Training Course','alp-thirumana-porutham','Specialised training in marriage compatibility (Thirumana Porutham) using the ALP method.','other', array['Tamil','English'],3)
on conflict (slug) do nothing;

-- ---------- EVENTS ----------
insert into public.events (title, slug, description, status, position) values
  ('ALP Astrology Foundation Level Class','alp-foundation-level-class','An introductory class covering the foundations of ALP Astrology.','upcoming',0),
  ('Suyamvara Kalaparvathi Homam','suyamvara-kalaparvathi-homam','A special spiritual ritual for harmony, relationships and positive energy.','upcoming',1),
  ('ALP Vastu Direct Interactive Training Session','alp-vastu-interactive-training','An interactive, hands-on training session on ALP Vastu principles.','upcoming',2)
on conflict (slug) do nothing;

-- ---------- FAQ ----------
insert into public.faq (question, answer, position) values
  ('How do I get an appointment for consultations?','You can book a consultation through our Contact page or via WhatsApp. (Editable from Admin.)',0),
  ('What courses are taught?','We offer Basic, Advanced and Master ALP Astrology courses, plus the ALP Thirumana Porutham course. (Editable from Admin.)',1),
  ('Do I need prior knowledge to learn?','No prior knowledge is required for the Basic course. (Editable from Admin.)',2),
  ('What is the schedule for classes?','Class schedules are announced before each batch. (Editable from Admin.)',3),
  ('Are courses available in multiple languages?','Yes, courses are currently available in Tamil and English. (Editable from Admin.)',4),
  ('Why should I learn ALP Astrology?','ALP introduces Lagna progression for greater predictive accuracy and a more complete framework. (Editable from Admin.)',5),
  ('Do you have books available?','Details about books are available on request. (Editable from Admin.)',6),
  ('Do you have software available?','Yes, advanced ALP astrology software is available. (Editable from Admin.)',7)
on conflict do nothing;

-- ---------- TESTIMONIALS (editable placeholders) ----------
insert into public.testimonials (name, role, content, rating, position) values
  ('Placeholder Name','Student','The ALP course gave me clarity and confidence. Editable from Admin.',5,0),
  ('Placeholder Name','Consultation Client','The birth chart reading was deeply insightful. Editable from Admin.',5,1),
  ('Placeholder Name','Course Graduate','Structured, practical, and easy to follow. Editable from Admin.',5,2)
on conflict do nothing;

-- ---------- BLOG CATEGORIES + POSTS ----------
insert into public.categories (name, slug, kind) values
  ('Foundations','foundations','blog'),('Predictions','predictions','blog'),
  ('Zodiac','zodiac','blog'),('Remedies','remedies','blog')
on conflict (slug) do nothing;

insert into public.blogs (title, slug, excerpt, content, author, status, published_at, category_id, meta_title, meta_description) values
  ('Decoding Your Birth Horoscope','decoding-your-birth-horoscope','Understand the building blocks of your birth chart and what they reveal about your life path.','<p>Your birth horoscope is a cosmic snapshot of the heavens at the moment you were born. (Editable from Admin.)</p>','ALP Astrology','published', now(),(select id from public.categories where slug='foundations'),'Decoding Your Birth Horoscope | ALP Astrology','A beginner-friendly guide to reading your birth chart.'),
  ('How Planetary Movements Shape Your Life','how-planetary-movements-shape-your-life','Explore how transits and planetary progressions influence the rhythm of your life.','<p>Planets are always in motion, and their movements shape the seasons of our lives. (Editable from Admin.)</p>','ALP Astrology','published', now(),(select id from public.categories where slug='predictions'),'How Planetary Movements Shape Your Life | ALP Astrology','Understand transits and progressions in ALP Astrology.'),
  ('Zodiac Signs and Their Unique Characteristics','zodiac-signs-characteristics','A tour through the twelve zodiac signs and the traits that make each one unique.','<p>Each zodiac sign carries its own energy, strengths and lessons. (Editable from Admin.)</p>','ALP Astrology','published', now(),(select id from public.categories where slug='zodiac'),'Zodiac Signs and Their Unique Characteristics | ALP Astrology','Discover the personality of all twelve zodiac signs.'),
  ('Powerful Astrological Remedies and Ritual Practices','astrological-remedies-and-rituals','Practical remedies and rituals to balance energies and invite positive transformation.','<p>Remedies are time-tested practices to harmonise planetary energies. (Editable from Admin.)</p>','ALP Astrology','published', now(),(select id from public.categories where slug='remedies'),'Powerful Astrological Remedies and Ritual Practices | ALP Astrology','Astrological remedies and rituals explained.')
on conflict (slug) do nothing;
