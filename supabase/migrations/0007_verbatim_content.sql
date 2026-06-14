-- 0007_verbatim_content.sql
-- Client revision: restore hero, remove the zodiac-journey section (the glyphs
-- now float in the background instead), and replace About/intro/vision/founder
-- copy + testimonials with EXACT verbatim text from the original ALP site.
-- Idempotent. Already applied to the live project.

begin;

-- Restore hero; hide the standalone zodiac-journey section.
update sections set is_visible = true  where type = 'hero';
update sections set is_visible = false where type = 'zodiac_journey';

-- Introduction to ALP Astrology (verbatim)
update sections set content = $j${
  "title": "Introduction to ALP Astrology",
  "subtitle": "Akshaya Lagna Paddhati",
  "paragraphs": [
    "Welcome to the fascinating world of ALP Astrology. ALP is known as Akshaya Lagna Paddhati or Age Lagna Paddhati. ALP Astrology offers you to delve deeply into wellspring of traditional astrological knowledge, enabling you to unlock the secrets of the cosmos and gain a deeper understanding of your inner self, life's journey predictions.",
    "Foremost among them in common is the DASA and BUKTHI based on the moon and the star it merely occupies. All major predictions derived from this, but this does not do justice to LAGNA or ASCENDANT. Hence the specific need to produce predictive astrology more complete and more accurate by ascribing sufficient importance to the Lagna.",
    "In the course of his independent research, the author has concluded at the precise speed the Lagna travels which is ONE year ONE month, and TEN days to navigate one Nakshatra Pada. It vicariously experiences TEN years to navigate one zodiac sign, so it comprehensively covers 120 years of life spans of a specific individual same as VIMSHOTTARI DASA.",
    "Akshaya means growth. He raised question himself like the growing roots; can the Lagna also grow as the time moves? Why can't the Lagna progress? Why should it be static when the Moon is progressed? What will happen precisely if one progresses the Lagna? And properly use the progressed Lagna to accurately predict the events — this inevitably resulted in the development of 'ALP' Akshaya Lagna Paddhati."
  ]
}$j$::jsonb where type = 'about_alp';

-- Our Purpose (verbatim)
update sections set content = $j${
  "title": "Our Purpose: Revolutionizing Astrological Consultation",
  "paragraphs": [
    "ALP Astrology is dedicated to empowering individuals by offering profound insights into their lives through the fusion of traditional astrology and modern psychological understanding. Our vision extends to a world where every household has ready access to a skilled ALP astrologer. In this envisioned future, astrology is consulted in an organized and structured manner, becoming an integral part of personal development, and allowing the wisdom of the Stars to elevate individuals to new levels of self-discovery and growth.",
    "We envision a world where astrology is highly respected and integral part of personal development, self-awareness, and decision-making."
  ],
  "button": { "label": "Learn More About Us", "href": "/about" }
}$j$::jsonb where type = 'who_we_are';

-- Our Vision A–F (verbatim)
update sections set content = $j${
  "title": "Our Vision",
  "items": [
    "A. One Astrologer per Household: Our goal is to make personalized astrological guidance easily accessible to every household, ensuring that individuals have the opportunity to tap into the wisdom of the stars for navigating life's challenges and opportunities with effectiveness and insight.",
    "B. Structured, Organized & Ethical Consultation: We envision a system where astrology consultations are carried out in an organized and professional manner, fostering trust and reliability among clients. Our team of astrologers will strictly adhere to a code of ethics and best practices, ensuring that each consultation is of the highest quality, providing clients with a trustworthy and meaningful experience.",
    "C. Taking Astrology to the Next Level: We are dedicated to pushing the boundaries and elevating the credibility and effectiveness of astrology by seamlessly integrating it with modern psychology, personal and professional development, and other relevant fields. Our approach involves combining traditional astrological knowledge with contemporary insights, fostering the evolution of astrology to stay relevant in the 21st century and beyond.",
    "D. Accessible Learning: We envision a world where individuals interested in astrology can readily access comprehensive and structured courses designed for both beginners and advanced practitioners. Through the provision of accessible and high-quality education, our goal is to elevate the standards of astrological practice, ensuring that enthusiasts at all levels receive valuable and enriching learning experiences.",
    "E. Global Community: ALP Astrology endeavors to cultivate a global community of astrologers, enthusiasts, and wisdom seekers. Through networking, knowledge sharing, and collaboration, our goal is to establish a supportive ecosystem that propels the field forward and brings benefits to all involved. We are committed to supporting ongoing education in astrology, ensuring that our astrologers stay abreast of the latest developments in the field. This dedication to continuous learning is integral to enhancing the quality of our consultations and maintaining a dynamic and evolving astrological community.",
    "F. Empowerment: Our ultimate vision is to empower individuals to make informed choices, embrace their true selves, and lead fulfilling lives. We firmly believe that astrology can serve as a valuable tool for self-awareness and personal growth, and we are steadfast in our commitment to making it accessible to all who seek its guidance."
  ]
}$j$::jsonb where type = 'mission';

-- Founder (verbatim bio)
update sections set content = $j${
  "title": "Dr. S. Pothuvudaimoorthy, Ph.D.",
  "subtitle": "Founder & Inventor of ALP Astrology",
  "image": "",
  "bio": [
    "Dr. S. Pothuvudaimoorthy is renowned as the mastermind behind the groundbreaking Akshaya Lagna Paddhati, a revolutionary approach to astrology that has left an indelible mark on the field. As the fourth generation in a lineage of esteemed astrologers, Dr. Pothuvudaimoorthy's journey into the cosmos began over two decades ago.",
    "With an insatiable thirst for knowledge and an unquenchable curiosity, he embarked on a lifelong quest to decipher the celestial mysteries that shape our lives. With unwavering determination, he pursued the noble goal of achieving a singular prediction for any given horoscope, irrespective of the astrologer's background.",
    "This pursuit of consistency gave birth to the innovative 'Akshaya Lagna Paddhati' method, affectionately known as ALP, which stands as a testament to his pioneering spirit in the realm of astrology.",
    "He has authored seven books on ALP Astrology in Tamil and English, developed the ALP Astrology software (offered by Dr. S. Pothuvudaimoorthy, Ph.D., with 100,000+ users, released on 2 December 2019), and created the ALP Thirumana Porutham system for marriage compatibility. ALP Astrology is co-founded by his wife, Smt. Arularasi Pothuvudaimoorthy (D.T.Ed., M.Sc., B.Ed.), who serves as the organisation's administrator and leads its publications."
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
}$j$::jsonb where type = 'founder';

-- Real student testimonials (verbatim from the original "Students Corner")
delete from testimonials;
insert into testimonials (name, role, content, rating, position, status) values
('Naga Suganya','ALP Student', $t$Im proud to be an ALP student, when I came to the class I have 0 knowledge about astrology, after 15 days of class we can definitely know how to predict the astrology. Our guruji MR. POTHUVUDAIMOORTHY and our teachers will teach us in the way the beginners will understand. It's a proper astrology institution with the rule and regulations. only the dedicated students can learn from our guruji, the dedication of our teachers is wonderful, u cannot see anywhere this much of oganized, well deciplined teachers, coaches and volunteers. MONEY IS NOT A BIG MATTER FOR OUR GURU, HIS MOTIVATION IS "VEETUKKU ORU JOTHIDAR". proud to be his student, THANKS GURUJI$t$, 5, 0, 'published'),
('Senthil Kumar Elavazhagan','ALP Student', $t$This is an awesome experience, Bringing astrology close to you and making you learn astrology in a very short span of time is remarkable. Its not just learning, he helps us predict and ensures our prediction is accurate. ALP Astrology Method is the best. Many thanks to Guruji PothuvudaiMoorthy sir.$t$, 5, 1, 'published'),
('Amutha Shanmugaraj','Psychologist & Psychotherapist', $t$I learned ALP astrology from Poduvudaimoorthy Sir. It's prediction is 100% true. I am a psychologist and psychotherapist. For counselling I am using Alp Astrology as scnning report. Actually It's a life Value added concept. It must be taught to every children in the school. It's simple to learn. Sir's prediction is 100% true. It help us to lead a life by accepting everything happened to us is because of our Karma done previously by us and do good Karma in this present. Alp is life learning lessons. Thank you Sir.$t$, 5, 2, 'published'),
('Thejas Sundara','ALP Student', $t$Excellent teaching in early morning during Brammah muhoortham. Dr.S. Pothuvudaimoorthi Ayya himself taught 15 days class in simplest manner. We have to apply the rules and it works out like a miracle. We found the accuracy wherever we predict horoscope. All ALP astrologers are using this method and everyone prediction is uniform. No difference of opinions. Software is the Akshaya vessel and it feeds us present, past and future events. At any point of time ALP astrologers fixing the date never changes. This is the whole strength of ALP Astrologers. We are so gratitude to the founder of ALP Dr.S.Pothuvudaimoorthi Ayya for sharpening us.$t$, 5, 3, 'published'),
('Dr. Senthil Kumaran','ALP Student', $t$My Experience with Akshaya Lagna Pathadi (ALP) Astrology — I am writing to express my deepest gratitude for the incredible Akshaya Lagna Paddhati (ALP) Astrology training & its Great Inventor, Seer, Guru, Teacher, Professor, All in one Dr. S. PothuvudaiMoorthy Jothidar. The journey through the intricacies of astrology has been nothing short of transformative, & I feel compelled to share my appreciation. Thank you, Shri Podhuvudai Moorthy Sir, for being a beacon of knowledge and inspiration. Your dedication to the craft of astrology has left an indelible mark on my learning journey, and I am excited to continue exploring the depths of this ancient wisdom.$t$, 5, 4, 'published'),
('Dr. R. Sugantha','ALP Student', $t$Excellent structured curriculum, dedicated teachers. Without much effort the subject goes inside us naturally. I can say ALP as astrology for ALl LEVEL PEOPLE (ALP). No complicated calculation, we can get prediction with 100 persent accuracy provided the date of birth is correct. There is a unique way to find the given date of birth is correct. I recommend atleast one from each family should learn ALP astrology. They can guide their family each and every occasion. Thank you poothuvudai moorthy sir for a wonderful tool to the mankind. Blessed to learn the subject from the inventor directly.$t$, 5, 5, 'published');

commit;
