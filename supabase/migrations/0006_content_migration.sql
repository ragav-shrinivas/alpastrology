-- 0006_content_migration.sql
-- Complete content migration from the original ALP Astrology website
-- (alpastrology.co.in / alpastrology.org) into the CMS.
-- Idempotent: safe to re-run. Already applied to the live project.

begin;

/* ------------------------------------------------------------------ */
/* Settings: contact, navigation, socials, footer                     */
/* ------------------------------------------------------------------ */
update settings set value = to_jsonb('+91 80001 15656, +91 80002 95656'::text) where key = 'contact.phone';
update settings set value = to_jsonb('alpastrology.org@gmail.com'::text) where key = 'contact.email';
update settings set value = to_jsonb('918000115656'::text) where key = 'contact.whatsapp';
update settings set value = to_jsonb('F2, 1st Floor, Shiva Homes, Jayalakshmi Nagar, Anandha Sayanam, Moulivakkam, Chennai, Tamil Nadu, India - 600116'::text) where key = 'contact.address';
update settings set value = to_jsonb('https://www.facebook.com/astrologer.moorthy.pattukkottai/'::text) where key = 'social.facebook';
update settings set value = to_jsonb('https://www.instagram.com/alp_astrology/'::text) where key = 'social.instagram';
update settings set value = to_jsonb('https://www.youtube.com/@ALPASTROLOGY'::text) where key = 'social.youtube';

update settings set value = '[
  {"href":"/","label":"Home"},
  {"href":"/about","label":"About"},
  {"href":"/courses","label":"Courses"},
  {"href":"/consultation","label":"Consultation"},
  {"href":"/software","label":"Software"},
  {"href":"/books","label":"Books"},
  {"href":"/events","label":"Events"},
  {"href":"/videos","label":"Videos"},
  {"href":"/blog","label":"Blog"},
  {"href":"/contact","label":"Contact"}
]'::jsonb where key = 'navigation.items';

update settings set value = '[
  {"title":"Explore","links":[
    {"href":"/about","label":"About Us"},
    {"href":"/courses","label":"Courses"},
    {"href":"/consultation","label":"Consultation"},
    {"href":"/software","label":"Software"},
    {"href":"/books","label":"Books"}
  ]},
  {"title":"Resources","links":[
    {"href":"/events","label":"Events"},
    {"href":"/videos","label":"Videos"},
    {"href":"/gallery","label":"Gallery"},
    {"href":"/services","label":"Services"},
    {"href":"/consultants","label":"Consultants"},
    {"href":"/blog","label":"Articles"},
    {"href":"/faq","label":"FAQ"}
  ]},
  {"title":"Legal","links":[
    {"href":"/privacy-policy","label":"Privacy Policy"},
    {"href":"/terms","label":"Terms & Conditions"},
    {"href":"/refund-policy","label":"Refund Policy"},
    {"href":"/contact","label":"Contact"}
  ]}
]'::jsonb where key = 'footer.columns';

update settings set value = to_jsonb('ALP Astrology — Akshaya Lagna Paddhati. Founded by Dr. S. Pothuvudaimoorthy, Ph.D. We blend traditional astrology with modern psychological understanding to bring clarity, self-discovery, and positive transformation.'::text) where key = 'footer.about';

/* ------------------------------------------------------------------ */
/* Home / About content sections (founder, methodology, vision)       */
/* ------------------------------------------------------------------ */
update sections set content = $json$ {
  "title": "What is ALP Astrology?",
  "subtitle": "Akshaya Lagna Paddhati",
  "paragraphs": [
    "ALP stands for Akshaya Lagna Paddhati (also called Age Lagna Paddhati). Welcome to the fascinating world of ALP Astrology, where you can unlock the secrets of the cosmos and gain a deeper understanding of your inner self.",
    "Traditional astrology relies primarily on Dasa and Bukthi calculated from the position of the Moon. ALP Astrology gives proper, due weight to the Lagna (Ascendant) — the most personal point in a horoscope — and treats it as a living, progressing factor rather than a static one.",
    "In ALP, the Lagna progresses at a precise rate: it takes ONE year, ONE month and TEN days to traverse a single Nakshatra Pada, and TEN years to move through one zodiac sign — covering the complete 120-year human lifespan. This progression of the Lagna is the key innovation that makes ALP predictions remarkably accurate.",
    "This methodology was discovered by Dr. S. Pothuvudaimoorthy, Ph.D., a fourth-generation astrologer, whose insight into the progression of the Lagna came during deep meditation and a pilgrimage to the Himalayas."
  ]
} $json$::jsonb where type = 'about_alp';

update sections set content = $json$ {
  "title": "Who We Are",
  "paragraphs": [
    "At ALP Astrology, our purpose is to empower individuals by offering profound insights into their lives through the fusion of traditional astrology and modern psychological understanding.",
    "ALP — Akshaya Lagna Paddhati — was founded by Dr. S. Pothuvudaimoorthy, Ph.D., and co-founded by Smt. Arularasi Pothuvudaimoorthy. Together they have built a structured, ethical and accessible system of astrology that is now practised by over 10,000 ALP astrologers worldwide.",
    "We are revolutionising astrological consultation: making guidance organised and trustworthy, integrating astrology with modern psychology, and building a global community of astrologers, enthusiasts and seekers of wisdom."
  ],
  "button": { "label": "Learn More About Us", "href": "/about" }
} $json$::jsonb where type = 'who_we_are';

update sections set content = $json$ {
  "title": "Our Purpose & Vision",
  "items": [
    "One Astrologer per Household — making personalised astrological guidance easily accessible to every family.",
    "Structured, Organised & Ethical Consultation — consultations carried out in a professional manner that fosters trust.",
    "Taking Astrology to the Next Level — integrating astrology with modern psychology and personal & professional development.",
    "Accessible Learning — comprehensive, structured courses designed for both beginners and advanced practitioners.",
    "Global Community — building a worldwide community of astrologers, enthusiasts and wisdom seekers.",
    "Empowerment — enabling individuals to make informed choices, embrace their true selves, and lead fulfilling lives."
  ]
} $json$::jsonb where type = 'mission';

update sections set content = $json$ {
  "title": "Dr. S. Pothuvudaimoorthy, Ph.D.",
  "subtitle": "Founder & Inventor of ALP Astrology",
  "image": "",
  "bio": [
    "Dr. S. Pothuvudaimoorthy, Ph.D., is the inventor of Akshaya Lagna Paddhati (ALP) and a fourth-generation astrologer. His revolutionary insight — that the Lagna (Ascendant) progresses over a lifetime — came to him during deep meditation and a pilgrimage to the Himalayas, where observing the aerial roots of a banyan tree prompted his enquiry into the movement of the Lagna.",
    "Beyond astrology, he is an accomplished practitioner of Pranic Healing, Reiki and Past-Life Regression therapy, and has deeply studied classical systems including Prasna Marga and Nimittam. He holds a Ph.D. in Astrology.",
    "He has authored seven books on ALP Astrology in Tamil and English, developed the ALP Astrology software (over 100,000 users, launched on 2 December 2019), and created the ALP Thirumana Porutham system for marriage compatibility. His vision is to place one skilled ALP astrologer in every household.",
    "ALP Astrology is co-founded by his wife, Smt. Arularasi Pothuvudaimoorthy (D.T.Ed., M.Sc., B.Ed.), who serves as the organisation's administrator and leads its publications."
  ],
  "achievements": [
    "Inventor of Akshaya Lagna Paddhati (ALP)",
    "Fourth-generation astrologer",
    "Ph.D. in Astrology",
    "Author of 7 books (Tamil & English)",
    "Creator of ALP software — 100,000+ users"
  ],
  "awards": [],
  "media_appearances": [
    "ALP Astrology YouTube channel",
    "ALP Prassannam Mobile App",
    "English & Telugu book launch events"
  ]
} $json$::jsonb where type = 'founder';

update sections set content = $json$ {
  "title": "Personalised Astrology Consultation",
  "description": "Appointments can be fixed for either Online or Physical consultation, based on mutual convenience, after making the necessary payment. Please contact the ALP Office or a nearby ALP Astrologer to book your sitting.",
  "items": [
    "Birth Chart (Horoscope) Analysis using the ALP method",
    "Career & Financial Guidance",
    "Marriage Matching & Compatibility (ALP Thirumana Porutham)",
    "Timing of Marriage, Children & Major Life Events",
    "Health & Wellness Remedies",
    "Online or Physical sittings as per your convenience"
  ],
  "button": { "label": "Book a Consultation", "href": "/consultation" }
} $json$::jsonb where type = 'consultation';

update sections set content = $json$ {
  "title": "Watch & Learn — ALP on YouTube",
  "description": "Real experiences, interviews and lessons from the ALP Astrology community. Explore our full video library on the Videos page.",
  "topics": [
    "Why you should learn ALP Astrology — Dr. Srinivasan",
    "The most accurate system of prediction — Mr. Vasudevan, ISRO",
    "Can you learn ALP Astrology in 15 days? — Mrs. Usha Rajagopal",
    "ALP English Books & Software Launch",
    "ALP Prassannam Mobile App",
    "Maha Sivaratri Live Event"
  ]
} $json$::jsonb where type = 'video';

/* ------------------------------------------------------------------ */
/* Courses                                                            */
/* ------------------------------------------------------------------ */
update courses set
  description = 'The Basic ALP Astrology course is designed for absolute beginners — no prior knowledge of astrology is required and there is no age restriction. Anyone who can read, write, speak and understand the language can learn. Over 15 to 20 class days you will learn to read a horoscope using the Akshaya Lagna Paddhati method and understand why events happen in life and how to prepare for them. Classes are conducted online during the auspicious Brahma Muhurat. On registration you receive 64 training videos to support your learning.',
  duration = '15-20 class days • Mon-Sat, 4:32 AM - 6:32 AM (Brahma Muhurat)',
  languages = array['Tamil','English','Hindi','Kannada','Telugu'],
  instructor = 'ALP Teachers',
  price = 'Contact ALP Office for fees',
  syllabus = $j$["Introduction to Akshaya Lagna Paddhati (ALP)","Planetary characteristics and the 3 types of Karma","The progression of the Lagna (Ascendant)","Akshaya Rasi and Akshaya Lagna calculations","Reading the 12 Bhavas (houses)","Gochar (transit) principles","64 training videos provided on registration","Free ALP software supports your learning","No certificate at Basic level — wisdom for self-awareness"]$j$::jsonb
where slug = 'basic-alp-astrology';

update courses set
  description = 'The Advanced ALP Astrology course is open to eligible ALP astrologers selected by the ALP Teachers after completing the Basic course. Approximately 15-20 days in duration, it sharpens your predictive skills and qualifies you to practise professionally. A qualifying examination is conducted online on completion, after which you receive a course-completion certificate and become a certified ALP practitioner.',
  duration = 'Approx. 15-20 days • Online',
  languages = array['Tamil','English'],
  instructor = 'ALP Teachers',
  price = 'Contact ALP Office for fees',
  syllabus = $j$["Advanced horoscope interpretation with ALP","Deep marriage compatibility analysis (30-year outlook)","Advanced Gochar and the timing of events","Professional consultation techniques","Advanced ALP software (subscription)","Online qualifying examination on completion","Course-completion certificate on passing","Become a certified ALP practitioner"]$j$::jsonb
where slug = 'advanced-alp-astrology';

update courses set
  description = 'The Master ALP Astrology course is an elite track for eligible ALP astrologers, selected through a personal process by Dr. S. Pothuvudaimoorthy. It represents the highest level of mastery in the Akshaya Lagna Paddhati system, taught by the founder and Master-level instructors. The ALP teaching faculty includes 20 staff, of whom 10 are Master-level instructors.',
  duration = 'By selection • Online',
  languages = array['Tamil','English'],
  instructor = 'Dr. S. Pothuvudaimoorthy & Master Instructors',
  price = 'By selection',
  syllabus = $j$["Mastery of the complete ALP system","Research-level predictive techniques","Direct mentorship under Dr. S. Pothuvudaimoorthy","Eligibility by personal selection process"]$j$::jsonb
where slug = 'master-alp-astrology';

update courses set
  description = 'ALP Thirumana Porutham is the ALP system of marriage matching and compatibility. Unlike conventional matching that checks the ten porutham for the present year alone, ALP evaluates compatibility across at least 30 years and for the couple''s present Lagna — giving a far more reliable picture of married life. The dedicated ALP TP software supports this analysis.',
  duration = 'Specialised module',
  languages = array['Tamil','English'],
  instructor = 'ALP Teachers',
  price = 'Contact ALP Office for fees',
  syllabus = $j$["Principles of ALP marriage matching","30-year compatibility outlook (not just the present year)","Matching for the present Lagna of bride and groom","Akshaya Rasi and Nakshatra compatibility","Using the ALP TP (Thirumana Porutham) software"]$j$::jsonb
where slug = 'alp-thirumana-porutham';

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */
update services set
  description = 'Professional ALP consultation providing detailed horoscope analysis and practical, ethical guidance. Appointments can be booked for online or physical sittings, based on mutual convenience, after making the necessary payment.',
  features = array['Birth Chart Analysis (ALP method)','Career & Financial Guidance','Marriage & Compatibility Analysis','Timing of major life events','Health & Wellness Remedies','Online or Physical sittings']
where slug ilike '%consult%' or title ilike '%consult%';

update services set
  description = 'Structured ALP Astrology courses for beginners, advancing learners and aspiring professionals — Basic, Advanced, Master and Thirumana Porutham. Learn online with 64 training videos, an online examination and professional certification.',
  features = array['Basic course (15-20 days, no prerequisites)','Advanced course (with exam & certification)','Master course (by selection)','ALP Thirumana Porutham module','Taught in Tamil, English, Hindi, Kannada & Telugu','64 training videos on registration']
where slug ilike '%course%' or title ilike '%course%';

update services set
  description = 'ALP Astrology software supports predictive astrology using the Akshaya Lagna Paddhati method, giving due weight to the progressing Lagna. The mobile app has over 100,000 users (launched 2 December 2019); subscription packages are available for Basic, Advanced and TP.',
  features = array['Mobile app — 100,000+ users','Basic, Advanced & TP packages','Available in Tamil & English','Free ALP software for learners','ALP Thirumana Porutham marriage matching','Available on Google Play']
where slug ilike '%software%' or title ilike '%software%';

/* ------------------------------------------------------------------ */
/* Consultants (founders)                                             */
/* ------------------------------------------------------------------ */
delete from consultants;
insert into consultants (name, designation, experience, languages, specialization, description, whatsapp, booking_link, position, status) values
('Dr. S. Pothuvudaimoorthy, Ph.D.', 'Founder & Inventor of ALP Astrology',
 'Fourth-generation astrologer • Ph.D. in Astrology',
 array['Tamil','English'],
 array['ALP Astrology','Marriage Matching (Thirumana Porutham)','Pranic Healing','Reiki','Past-Life Regression','Prasna Marga'],
 'Inventor of Akshaya Lagna Paddhati (ALP) and a fourth-generation astrologer. Author of 7 books, creator of the ALP software (100,000+ users) and the ALP Thirumana Porutham system. His vision is one skilled ALP astrologer in every household.',
 '918000115656', 'https://wa.me/918000115656', 0, 'published'),
('Smt. Arularasi Pothuvudaimoorthy', 'Co-Founder & Administrator',
 'D.T.Ed., M.Sc., B.Ed.',
 array['Tamil','English'],
 array['Administration','Publications','Marriage Matching'],
 'Co-founder of ALP Astrology and wife of Dr. S. Pothuvudaimoorthy. She serves as the organisation''s administrator and leads its publications, helping bring ALP''s books and courses to learners worldwide.',
 '918000295656', 'https://wa.me/918000295656', 1, 'published');

/* ------------------------------------------------------------------ */
/* Events (complete history from the original site)                   */
/* ------------------------------------------------------------------ */
delete from events;
insert into events (slug, title, description, event_date, location, status, is_published, position) values
('event-2026-02-07-basic-class','ALP Astrology Basic Class — 07 Feb 2026','Online Basic ALP Astrology training batch. Contact the ALP Office for the schedule and registration.','2026-02-07','Online / ALP Office, Chennai','past',true,0),
('event-2025-12-14-basic-class','ALP Astrology Basic Class — 14 Dec 2025','Online Basic ALP Astrology training batch.','2025-12-14','Online / ALP Office, Chennai','past',true,1),
('event-2025-11-08-basic-class','ALP Astrology Basic Class — 08 Nov 2025','Online Basic ALP Astrology training batch.','2025-11-08','Online / ALP Office, Chennai','past',true,2),
('event-2025-08-09-basic-class','ALP Astrology Basic Class — 09 Aug 2025','Online Basic ALP Astrology training batch.','2025-08-09','Online / ALP Office, Chennai','past',true,3),
('event-2025-07-05-homam','Suyamvara Kala Parvathi Homam','Spiritual homam for marriage and auspicious beginnings, conducted by ALP Astrology.','2025-07-05','Chennai','past',true,4),
('event-2025-07-05-basic-class','ALP Astrology Basic Class — 05 Jul 2025 (Tamil, English)','Online Basic ALP Astrology training batch in Tamil and English.','2025-07-05','Online / ALP Office, Chennai','past',true,5),
('event-2025-03-08-vastu-direct','ALP Vastu Direct Class — 8 & 9 Mar 2025','Direct (in-person) ALP Vastu class held over two days.','2025-03-08','Chennai','past',true,6),
('event-2025-02-15-basic-class','ALP Astrology Basic Class — 15 Feb 2025 (Tamil, English, Hindi)','Online Basic ALP Astrology training batch in Tamil, English and Hindi.','2025-02-15','Online / ALP Office, Chennai','past',true,7),
('event-2025-01-11-basic-class','ALP Astrology Basic Class — 11 Jan 2025 (Tamil, English, Hindi)','Online Basic ALP Astrology training batch in Tamil, English and Hindi.','2025-01-11','Online / ALP Office, Chennai','past',true,8),
('event-2024-12-22-homam','Suyamvara Kala Parvathi Homam','Spiritual homam for marriage and auspicious beginnings, conducted by ALP Astrology.','2024-12-22','Chennai','past',true,9),
('event-2024-12-07-basic-class','ALP Astrology Basic Class — 07 Dec 2024','Online Basic ALP Astrology training batch.','2024-12-07','Online / ALP Office, Chennai','past',true,10),
('event-2024-11-17-basic-class','ALP Astrology Basic Class — 17 Nov 2024','Online Basic ALP Astrology training batch.','2024-11-17','Online / ALP Office, Chennai','past',true,11),
('event-2024-10-19-basic-direct','ALP Astrology Basic Direct Class — 19 & 20 Oct 2024','Direct (in-person) Basic ALP Astrology class held over two days.','2024-10-19','Chennai','past',true,12),
('event-2024-10-19-basic-class','ALP Astrology Basic Class — 19 Oct 2024','Online Basic ALP Astrology training batch.','2024-10-19','Online / ALP Office, Chennai','past',true,13),
('event-2024-10-12-convocation','Advanced Class Convocation & Telugu Book Part 1 Release','ALP Astrology Advanced students'' convocation and the release of the ALP Astrology Telugu Book, Part 1.','2024-10-12','Chennai','past',true,14),
('event-2024-09-21-basic-class','ALP Astrology Basic Class — 21 Sep 2024','Online Basic ALP Astrology training batch.','2024-09-21','Online / ALP Office, Chennai','past',true,15),
('event-2024-08-10-advanced-class','ALP Astrology Advanced Class — 10 Aug 2024','Online Advanced ALP Astrology training batch for eligible astrologers.','2024-08-10','Online / ALP Office, Chennai','past',true,16),
('event-2024-07-13-basic-hindi','ALP Astrology Basic Hindi Class — 13 Jul 2024','Online Basic ALP Astrology training batch in Hindi.','2024-07-13','Online / ALP Office, Chennai','past',true,17),
('event-2024-07-13-basic-kannada','ALP Astrology Basic Kannada Class — 13 Jul 2024','Online Basic ALP Astrology training batch in Kannada.','2024-07-13','Online / ALP Office, Chennai','past',true,18),
('event-2024-07-13-basic-english','ALP Astrology Basic English Class — 13 Jul 2024','Online Basic ALP Astrology training batch in English.','2024-07-13','Online / ALP Office, Chennai','past',true,19),
('event-2024-07-13-basic-tamil','ALP Astrology Basic Class (Tamil) — 13 Jul 2024','Online Basic ALP Astrology training batch in Tamil.','2024-07-13','Online / ALP Office, Chennai','past',true,20),
('event-2024-06-08-basic-class','ALP Astrology Basic Class — 08 Jun 2024','Online Basic ALP Astrology training batch.','2024-06-08','Online / ALP Office, Chennai','past',true,21),
('event-2024-05-11-basic-class','ALP Astrology Basic Class — 11 May 2024','Online Basic ALP Astrology training batch.','2024-05-11','Online / ALP Office, Chennai','past',true,22),
('event-2024-04-12-basic-class','ALP Astrology Basic Class — 12 Apr 2024','Online Basic ALP Astrology training batch.','2024-04-12','Online / ALP Office, Chennai','past',true,23),
('event-2024-03-30-vastu-class','Akshaya Vastu Class — 30 Mar 2024','Akshaya Vastu class introducing ALP principles of Vastu.','2024-03-30','Online / ALP Office, Chennai','past',true,24),
('event-2024-03-08-sivaratri','Maha Sivaratri','Maha Sivaratri spiritual observance conducted by ALP Astrology.','2024-03-08','Chennai','past',true,25),
('event-2024-02-14-basic-class','ALP Astrology Basic Class — 14 Feb 2024','Online Basic ALP Astrology training batch.','2024-02-14','Online / ALP Office, Chennai','past',true,26),
('event-2024-01-27-english-book-launch','ALP English Book Release Function','Launch function for the Akshaya Lagna Paddhati English book.','2024-01-27','Chennai','past',true,27),
('event-2024-01-10-basic-class','ALP Astrology Basic Class — Jan 2024','Online Basic ALP Astrology training batch.','2024-01-10','Online / ALP Office, Chennai','past',true,28),
('event-2022-07-19-homam','Suyamvara Kala Parvathi Homam','Spiritual homam for marriage and auspicious beginnings, conducted by ALP Astrology.','2022-07-19','Chennai','past',true,29);

/* ------------------------------------------------------------------ */
/* FAQ (verbatim from the original site)                              */
/* ------------------------------------------------------------------ */
delete from faq;
insert into faq (question, answer, category, position, status) values
($q$How do I get an appointment for Consultations?$q$, $a$Please contact ALP Office or near by ALP Astrologer. Appointment can be fixed either for Online or Physical consultation, based on mutual convenience after making necessary payment.$a$, 'Consultation', 0, 'published'),
($q$What are the Courses taught?$q$, $a$We have Basic & Advanced courses. Basic course is designed for beginners. We recommend starting with the Basic Course before progressing to the Advanced Course for a strong foundation.$a$, 'Courses', 1, 'published'),
($q$Do I need any prior knowledge of astrology to enroll & any age restriction to learn ALP Astrology?$q$, $a$No, our courses are designed to accommodate beginners and those with prior astrological knowledge. There is no specific age restriction to learn ALP Astrology.$a$, 'Courses', 2, 'published'),
($q$What is the course duration and is it offered in multiple languages?$q$, $a$Course duration would normally be 15 to 20 class days. Primary medium is in Tamil and courses are taught in multiple languages as well. Please contact ALP Office to know the schedule of the courses, including their dates and times.$a$, 'Courses', 3, 'published'),
($q$Why should I learn ALP Astrology rather than consultation?$q$, $a$Seeking advice from an astrologer may provide a solution for a specific problem, but acquiring knowledge in ALP astrology offers a broader understanding of the reasons behind life's occurrences and how to proactively address them. It's not just about acquiring knowledge; it's a journey of self-discovery. ALP astrology serves as a guiding light, helping you discern the necessary actions and pitfalls to avoid.$a$, 'Courses', 4, 'published'),
($q$Do you have any books released so far?$q$, $a$We have released 7 books so far, in both Tamil & English. They can be ordered through ALP Office or ALP Website or e-Commerce websites like Amazon etc.$a$, 'Books', 5, 'published'),
($q$Do you have any Software to support?$q$, $a$We do have 3 different Software packages such as Basic, Advanced & TP – Thirumana Porutham. It is available in Tamil & English as Subscription Packages.$a$, 'Software', 6, 'published'),
($q$Can I take both courses simultaneously?$q$, $a$We recommend starting with the Basic Course before progressing to the Advanced Course for a strong foundation.$a$, 'Courses', 7, 'published'),
($q$Are there any prerequisites?$q$, $a$No, our courses are designed to accommodate beginners and those with prior astrological knowledge.$a$, 'Courses', 8, 'published'),
($q$Isn't it scary to know future events before time using ALP? Why should anyone learn ALP astrology, if they might lose their peace of mind?$q$, $a$In our opinion, in this case, ignorance is not bliss. Why do people do master health checkup? Isn't it useful to know, if all is good with one's health and if in case of any discrepancies in their health, they can immediately take doctor's help and treat early and save their lives. This is just the same, to know one's future path and plan life accordingly with preparedness.$a$, 'General', 9, 'published'),
($q$Can we get recordings of missed class?$q$, $a$No. Since the class is scheduled only for 15 days, it is expected that no one misses any class and take notes only to facilitate their learning process.$a$, 'Courses', 10, 'published'),
($q$Do you have classes at different timings?$q$, $a$No.$a$, 'Courses', 11, 'published'),
($q$Are these classes available in other languages?$q$, $a$Kindly contact ALP office for further details.$a$, 'Courses', 12, 'published'),
($q$Will we get certificate after completion of ALP basic course?$q$, $a$No. Certificates are provided only after completion of ALP Advanced course.$a$, 'Courses', 13, 'published'),
($q$Why is there no certificate after ALP basic course?$q$, $a$ALP basic course gives one the wisdom to know and be aware of their situation based on their horoscope but it doesn't qualify them fully to practice professionally.$a$, 'Courses', 14, 'published'),
($q$Can we practice as an ALP astrologer after completion of ALP advanced course?$q$, $a$Yes. You will be a certified practitioner on completion of the ALP Advanced course.$a$, 'Courses', 15, 'published'),
($q$Will there be any examination on completion of course to qualify for certificate?$q$, $a$Yes.$a$, 'Courses', 16, 'published'),
($q$Is ALP software essential to be purchased at the time of joining the class?$q$, $a$No. Initially the free ALP software can support the understanding. Eventually, software is needed, which can be purchased later along the ALP basic course.$a$, 'Software', 17, 'published'),
($q$What is the duration of ALP advanced course?$q$, $a$Approximately 15 - 20 days.$a$, 'Courses', 18, 'published'),
($q$Is there separate software for ALP Advanced level?$q$, $a$Yes. It is available on subscription basis.$a$, 'Software', 19, 'published'),
($q$Is there any age restriction to learn ALP astrology?$q$, $a$There is no specific age restriction to learn ALP Astrology. Anyone who can read, write, speak and understand the language can learn ALP astrology.$a$, 'Courses', 20, 'published'),
($q$How far will learning ALP astrology help a man or woman in their marriage life?$q$, $a$It is highly recommended to learn ALP Astrology before getting married because only then they will come to know, how will be their married life according to their horoscope. So that, they will not blame anyone else for whatever happens in their future life. They will get a better understanding of how to proceed in their marriage life.$a$, 'Marriage', 21, 'published'),
($q$How does ALP Astrology help in avoiding late marriages?$q$, $a$ALP astrology helps in giving a clarity about why late marriages occur. There are many reasons for late marriages. But one major factor in this is lack of realization of the fact lying in their horoscope. This ALP astrology will guide how to select a perfect life partner according to your own planetary positions.$a$, 'Marriage', 22, 'published'),
($q$Getting married even after analysing all the 10 matches in both (bride and bridegroom) horoscopes, many marriages still fail. How does ALP differ in this case?$q$, $a$In ALP, marriage matching is seen at least for about 30 years and not for the present year alone. And moreover marriage matching should be done for their present lagna. All these are taught in ALP astrology class and anyone can learn and implement in their life and help others too.$a$, 'Marriage', 23, 'published');

/* ------------------------------------------------------------------ */
/* Testimonials (from the original video library)                     */
/* ------------------------------------------------------------------ */
delete from testimonials;
insert into testimonials (name, role, content, rating, position, status) values
('Mr. Vasudevan','ISRO', $t$There is no other system of astrology that gives predictions as precise as ALP.$t$, 5, 0, 'published'),
('Dr. Srinivasan','ALP Astrologer', $t$Everyone should learn ALP astrology — it shows you why things happen in life and exactly what to do about it.$t$, 5, 1, 'published'),
('Mrs. Usha Rajagopal','ALP Student', $t$I never imagined one could truly learn astrology in fifteen days, but ALP made it possible.$t$, 5, 2, 'published'),
('Mrs. Shylaja Vaitheeswaran','ALP Student', $t$ALP astrology brought a genuine, positive change in my life.$t$, 5, 3, 'published'),
('Smt. Annapurani','Chennai', $t$Astonishingly accurate — ALP astrology completely amazed me.$t$, 5, 4, 'published'),
('Mr. Babu','Indian Army', $t$ALP gives a clear, practical and reliable view of life.$t$, 5, 5, 'published'),
('Mrs. Vigneshwari','Malaysia', $t$Even from abroad, learning ALP has been a wonderful, life-guiding experience.$t$, 5, 6, 'published'),
('Dr. Suresh Kumar','Sun TV', $t$ALP astrology made a real difference — precise, insightful and trustworthy.$t$, 5, 7, 'published');

/* ------------------------------------------------------------------ */
/* Videos (gallery, type=video) from the original Videos page         */
/* ------------------------------------------------------------------ */
delete from gallery where type = 'video';
insert into gallery (title, url, thumbnail, type, category, position, status) values
($v$மஹா சிவராத்திரி நேரலை நிகழ்வு$v$,'https://www.youtube.com/watch?v=cBrCI6nk90c','https://img.youtube.com/vi/cBrCI6nk90c/hqdefault.jpg','video','Videos',0,'published'),
($v$அட்சய லக்ன பத்ததி ஆங்கில புத்தக & மென்பொருள் வெளியீட்டு விழா$v$,'https://www.youtube.com/watch?v=D9QEAz8mU8U','https://img.youtube.com/vi/D9QEAz8mU8U/hqdefault.jpg','video','Videos',1,'published'),
($v$ALP Astrology English Books$v$,'https://youtu.be/D9QEAz8mU8U','https://img.youtube.com/vi/D9QEAz8mU8U/hqdefault.jpg','video','Videos',2,'published'),
($v$ALP Prassannam Mobile App$v$,'https://youtu.be/D9QEAz8mU8U','https://img.youtube.com/vi/D9QEAz8mU8U/hqdefault.jpg','video','Videos',3,'published'),
($v$ALP Astrology — துல்லியமான பலன் | Dr. S. Pothuvudaimoorthy$v$,'https://www.youtube.com/shorts/fp2xAiXSoDc','https://img.youtube.com/vi/fp2xAiXSoDc/hqdefault.jpg','video','Videos',4,'published'),
($v$அப்ராட் மக்களை அசந்து போய் பார்த்த அட்சய லக்ன பத்ததி$v$,'https://youtube.com/shorts/MgBJL_o4yeA','https://img.youtube.com/vi/MgBJL_o4yeA/hqdefault.jpg','video','Videos',5,'published'),
($v$அட்சய லக்ன பத்ததி (ALP) — Mrs. Vigneshwari, Malaysia$v$,'https://youtu.be/SfulivemqFY','https://img.youtube.com/vi/SfulivemqFY/hqdefault.jpg','video','Videos',6,'published'),
($v$அட்சய லக்ன பத்ததி (ALP) — Mr. Srinath, Bangalore$v$,'https://youtu.be/BTvIeuDxBvA','https://img.youtube.com/vi/BTvIeuDxBvA/hqdefault.jpg','video','Videos',7,'published'),
($v$மாற்றத்தை உண்டாக்கிய ALP ஜோதிடம் | Mrs. Shylaja Vaitheeswaran$v$,'https://youtu.be/kPSwf71c_U8','https://img.youtube.com/vi/kPSwf71c_U8/hqdefault.jpg','video','Videos',8,'published'),
($v$நீங்கள் ஏன் ALP ஜோதிடம் படிக்க வேண்டும் | Dr. Srinivasan$v$,'https://youtu.be/MGidor9-l7E','https://img.youtube.com/vi/MGidor9-l7E/hqdefault.jpg','video','Videos',9,'published'),
($v$இதை விட துல்லியமாக பலன் சொல்ல வேறு ஜோதிடம் இல்லை | Mr. Vasudevan, ISRO$v$,'https://youtu.be/9yhr-VAHpkc','https://img.youtube.com/vi/9yhr-VAHpkc/hqdefault.jpg','video','Videos',10,'published'),
($v$பிரமிப்பூட்டும் ALP ஜோதிடம் | Smt. Annapurani, Chennai$v$,'https://youtu.be/9yhr-VAHpkc','https://img.youtube.com/vi/9yhr-VAHpkc/hqdefault.jpg','video','Videos',11,'published'),
($v$ALP ஜோதிடம் பற்றி ஒரு பார்வை | Mr. Babu, Indian Army$v$,'https://youtu.be/zolNTjJOQl8','https://img.youtube.com/vi/zolNTjJOQl8/hqdefault.jpg','video','Videos',12,'published'),
($v$மாற்றத்தை உண்டாக்கிய ALP ஜோதிடம் | Mr. Balasubramanian$v$,'https://youtu.be/D5QE7ns5goE','https://img.youtube.com/vi/D5QE7ns5goE/hqdefault.jpg','video','Videos',13,'published'),
($v$என்னுடைய வாழ்வை மாற்றிய ஒரே ஜோதிடம் ALP-தான்$v$,'https://youtu.be/72DA4ISkLtI','https://img.youtube.com/vi/72DA4ISkLtI/hqdefault.jpg','video','Videos',14,'published'),
($v$இந்த ஜோதிடமுறையை அனைவரும் கற்றறிய வேண்டும்$v$,'https://youtu.be/gSIQyIjR-RI','https://img.youtube.com/vi/gSIQyIjR-RI/hqdefault.jpg','video','Videos',15,'published'),
($v$தாலிக்கு பின்னாடி ஒரு ரகசியம் | Actor Rajesh$v$,'https://youtube.com/shorts/osFr6iIjkEA','https://img.youtube.com/vi/osFr6iIjkEA/hqdefault.jpg','video','Videos',16,'published'),
($v$எங்கள் குடும்பத்தில் மட்டுமே 7 ALP ஜோதிடர்கள் | திருமதி. திலகவதி$v$,'https://youtu.be/MgC9TyI6weE','https://img.youtube.com/vi/MgC9TyI6weE/hqdefault.jpg','video','Videos',17,'published'),
($v$அட்சய லக்ன பத்ததி — திரு. சத்யநாராயணன்$v$,'https://youtu.be/LH7et7Jzt78','https://img.youtube.com/vi/LH7et7Jzt78/hqdefault.jpg','video','Videos',18,'published'),
($v$அட்சய லக்ன பத்ததி பற்றி திரு. திருமலை கேசவன்$v$,'https://youtu.be/ZIHfUUDx4Z8','https://img.youtube.com/vi/ZIHfUUDx4Z8/hqdefault.jpg','video','Videos',19,'published'),
($v$ALP இணையவழி கலந்துரையாடல் | Dr. K. Periaiah, IPS$v$,'https://youtu.be/Y1rBcM88Fno','https://img.youtube.com/vi/Y1rBcM88Fno/hqdefault.jpg','video','Videos',20,'published'),
($v$ALP இணையவழி கலந்துரையாடல் | சொற்கோ இரா. கருணாநிதி$v$,'https://youtu.be/rWsCsB-cRUs','https://img.youtube.com/vi/rWsCsB-cRUs/hqdefault.jpg','video','Videos',21,'published'),
($v$ALP இணையவழி கலந்துரையாடல் | திருமதி. புனித கணேசன்$v$,'https://youtu.be/rmvsy3TzhI8','https://img.youtube.com/vi/rmvsy3TzhI8/hqdefault.jpg','video','Videos',22,'published'),
($v$ALP இணையவழி கலந்துரையாடல் | கவிஞர் Dr. R. ஜோதிபாசு$v$,'https://youtu.be/P0auU-GnovA','https://img.youtube.com/vi/P0auU-GnovA/hqdefault.jpg','video','Videos',23,'published'),
($v$ALP இணையவழி கலந்துரையாடல் | T. ராமதுரைமுருகன்$v$,'https://youtu.be/N1RzvMHZcaQ','https://img.youtube.com/vi/N1RzvMHZcaQ/hqdefault.jpg','video','Videos',24,'published'),
($v$ALP இணையவழி கலந்துரையாடல் | இயக்குனர் என். மகாராஜன்$v$,'https://youtu.be/WWQeFWv8s0s','https://img.youtube.com/vi/WWQeFWv8s0s/hqdefault.jpg','video','Videos',25,'published'),
($v$பதினைந்து நாளில் ALP ஜோதிடம் கற்க முடியுமா? | Mrs. Usha Rajagopal$v$,'https://youtu.be/GcZrxWjNP2E','https://img.youtube.com/vi/GcZrxWjNP2E/hqdefault.jpg','video','Videos',26,'published'),
($v$ALP ஜோதிட வகுப்பின் நிகழ்வு — Sreedhanya (Twins)$v$,'https://youtu.be/aVDXJ64Njeg','https://img.youtube.com/vi/aVDXJ64Njeg/hqdefault.jpg','video','Videos',27,'published'),
($v$மாற்றத்தை உண்டாக்கிய ALP ஜோதிடம் | Dr. Suresh Kumar, Sun TV$v$,'https://youtu.be/RQDkR9Q2A4U','https://img.youtube.com/vi/RQDkR9Q2A4U/hqdefault.jpg','video','Videos',28,'published'),
($v$அட்சய லக்ன பத்ததி ஜோதிட வகுப்பின் நிகழ்வுகள்$v$,'https://youtu.be/K1WReO9aIvk','https://img.youtube.com/vi/K1WReO9aIvk/hqdefault.jpg','video','Videos',29,'published'),
($v$வேதாரண்யம் திருமறைக்காடு சிவன் கோவில்$v$,'https://youtu.be/fyHI24xYtfw','https://img.youtube.com/vi/fyHI24xYtfw/hqdefault.jpg','video','Videos',30,'published'),
($v$என்ன கல்வி படிக்கலாம்?$v$,'https://youtu.be/ndrANKtDEKA','https://img.youtube.com/vi/ndrANKtDEKA/hqdefault.jpg','video','Videos',31,'published');

/* ------------------------------------------------------------------ */
/* New pages: Consultation, Software, Books, Videos                   */
/* ------------------------------------------------------------------ */
insert into pages (slug, title, position, status, is_system) values
('consultation','Consultation',14,'published',false),
('software','Software',15,'published',false),
('books','Books',16,'published',false),
('videos','Videos',17,'published',false)
on conflict (slug) do nothing;

-- Reset sections for the new pages so this migration is re-runnable.
delete from sections where page_id in (select id from pages where slug in ('consultation','software','books','videos'));

insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Header', 'page_header', $j${"title":"Consultation","subtitle":"Personalised ALP astrology guidance — online or in person."}$j$::jsonb, 0, true from pages where slug='consultation';
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Consultation', 'consultation', $j${"title":"Book Your ALP Consultation","description":"Appointments can be fixed for either Online or Physical consultation, based on mutual convenience, after making the necessary payment. Please contact the ALP Office or a nearby ALP Astrologer to arrange your sitting.","items":["Birth Chart (Horoscope) Analysis using the ALP method","Career & Financial Guidance","Marriage Matching & Compatibility (ALP Thirumana Porutham)","Timing of Marriage, Children & Major Life Events","Health & Wellness Remedies","Online or Physical sittings as per your convenience"],"button":{"label":"Contact the ALP Office","href":"/contact"}}$j$::jsonb, 1, true from pages where slug='consultation';
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'CTA', 'cta', $j${"title":"Ready to gain clarity?","description":"Reach out to book a personalised consultation with a certified ALP astrologer.","buttons":[{"label":"Book Now","href":"/contact"},{"label":"Chat on WhatsApp","href":"https://wa.me/918000115656","variant":"secondary"}]}$j$::jsonb, 2, true from pages where slug='consultation';

insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Header', 'page_header', $j${"title":"ALP Astrology Software","subtitle":"Precise predictive tools built on the Akshaya Lagna Paddhati method."}$j$::jsonb, 0, true from pages where slug='software';
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Intro', 'about_alp', $j${"title":"ALP Astrology Software","subtitle":"100,000+ Users","paragraphs":["The ALP Astrology software supports predictive astrology using the Akshaya Lagna Paddhati method — giving due weight to the progressing Lagna (Ascendant) alongside the traditional Dasa and Bukthi calculations.","The ALP mobile app has over 100,000 users and was launched on 2 December 2019. A free version supports learners during the Basic course, with full subscription packages available as you advance.","The software was created by Dr. S. Pothuvudaimoorthy, Ph.D., inventor of ALP."]}$j$::jsonb, 1, true from pages where slug='software';
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Packages', 'mission', $j${"title":"Software Packages","items":["Basic Package — core ALP charting and predictions for learners and practitioners.","Advanced Package — advanced predictive tools, available on subscription.","TP (Thirumana Porutham) Package — dedicated marriage-matching software.","Free ALP software — supports your understanding during the Basic course.","Available in Tamil & English as subscription packages.","ALP mobile app available on Google Play (100,000+ users)."]}$j$::jsonb, 2, true from pages where slug='software';
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'CTA', 'cta', $j${"title":"Get the ALP Astrology App","description":"Download the app or contact the ALP Office for software subscriptions.","buttons":[{"label":"Get it on Google Play","href":"https://play.google.com/store/search?q=ALP%20Astrology&c=apps"},{"label":"Enquire","href":"/contact","variant":"secondary"}]}$j$::jsonb, 3, true from pages where slug='software';

insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Header', 'page_header', $j${"title":"Books","subtitle":"Seven books on Akshaya Lagna Paddhati, in Tamil & English."}$j$::jsonb, 0, true from pages where slug='books';
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Intro', 'about_alp', $j${"title":"ALP Astrology Books","subtitle":"By Dr. S. Pothuvudaimoorthy, Ph.D.","paragraphs":["We have released seven books so far, in both Tamil and English. They can be ordered through the ALP Office, the ALP Website, or e-commerce websites such as Amazon. Kindle versions are available for e-readers.","The books cover the complete Akshaya Lagna Paddhati system — from an introduction to ALP and planetary characteristics, through Akshaya Rasi and Lagna calculations, the 12 Bhavas and Gochar, to detailed marriage matching (ALP Thirumana Porutham)."]}$j$::jsonb, 1, true from pages where slug='books';
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Titles', 'mission', $j${"title":"Published Titles","items":["ALP Volume 1 — Rs. 120 — Introduction to Akshaya Lagna Paddhati, planetary characteristics, and the 3 types of Karma.","ALP Volume 2 — Rs. 280 — Akshaya Rasi and Akshaya Lagna calculations, and birth objectives using the ALP system.","ALP Volume 3 — Rs. 280 — Gochar principles, Leo Constellation nakshatras, and Aries Lagna predictions across the 12 Bhavas.","ALP Volume 4 — Rs. 250 — Sagittarius Constellation nakshatras, marriage compatibility evaluation, and horoscope interpretation.","ALP Volume 5 — Rs. 300 — Detailed marriage matching, Akshaya Rasi and nakshatra compatibility with sample horoscopes.","ALP Volume 6 — Rs. 220 — Complete manual and salient features of ALP, with Karma explained in detail.","ALP Thirumana Porutham — Marriage-matching methodology and use of the ALP TP software.","ALP English Volume 1 — English edition of Volume 1.","ALP English Volume 2 — English edition of Volume 2.","ALP English Volume 3 — English edition of Volume 3."]}$j$::jsonb, 2, true from pages where slug='books';
insert into sections (page_id, name, type, content, position, is_visible)
select id, 'CTA', 'cta', $j${"title":"Order Your Copy","description":"Books can be ordered through the ALP Office, the ALP Website, or Amazon.","buttons":[{"label":"Order via WhatsApp","href":"https://wa.me/918000115656"},{"label":"Contact ALP Office","href":"/contact","variant":"secondary"}]}$j$::jsonb, 3, true from pages where slug='books';

insert into sections (page_id, name, type, content, position, is_visible)
select id, 'Header', 'page_header', $j${"title":"Videos","subtitle":"Talks, interviews and real experiences from the ALP Astrology community."}$j$::jsonb, 0, true from pages where slug='videos';

/* ------------------------------------------------------------------ */
/* Existing page headers                                              */
/* ------------------------------------------------------------------ */
update sections s set content = $j${"title":"About ALP Astrology","subtitle":"Akshaya Lagna Paddhati — the science of the progressing Lagna."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='about' and s.type='page_header';
update sections s set content = $j${"title":"What We Offer","subtitle":"Consultation, structured courses and professional astrology software."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='services' and s.type='page_header';
update sections s set content = $j${"title":"ALP Astrology Courses","subtitle":"Structured training for beginners, practitioners and masters."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='courses' and s.type='page_header';
update sections s set content = $j${"title":"Our Astrologers","subtitle":"Meet the founders and teachers of ALP Astrology."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='consultants' and s.type='page_header';
update sections s set content = $j${"title":"Gallery","subtitle":"Moments from ALP classes, events and ceremonies."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='gallery' and s.type='page_header';
update sections s set content = $j${"title":"Events","subtitle":"Classes, homams, book launches and spiritual programs."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='events' and s.type='page_header';
update sections s set content = $j${"title":"Testimonials","subtitle":"What our community says about ALP Astrology."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='testimonials' and s.type='page_header';
update sections s set content = $j${"title":"Articles","subtitle":"Insights and guidance from the ALP Astrology team."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='blog' and s.type='page_header';
update sections s set content = $j${"title":"Contact Us","subtitle":"Reach the ALP Office for consultations, courses and books."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='contact' and s.type='page_header';
update sections s set content = $j${"title":"Frequently Asked Questions","subtitle":"Answers about ALP consultations, courses, software and books."}$j$::jsonb from pages p where s.page_id=p.id and p.slug='faq' and s.type='page_header';

commit;
