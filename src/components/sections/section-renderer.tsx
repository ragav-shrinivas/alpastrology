import type { Section } from "@/types/database";
import { HeroSection } from "./hero-section";
import {
  PageHeaderSection,
  WhoWeAreSection,
  AboutAlpSection,
  MissionSection,
  ConsultationSection,
  VideoSection,
  FounderSection,
  LegalSection,
  CtaSection,
} from "./content-sections";
import {
  ServicesSection,
  CoursesSection,
  ConsultantsSection,
  EventsSection,
  BlogSection,
  TestimonialsSection,
} from "./collection-sections";
import { ZodiacJourney } from "@/components/zodiac/zodiac-journey";

type Content = Record<string, unknown>;

/** Maps a stored section `type` to its renderer. Unknown types are skipped. */
function renderSection(type: string, content: Content) {
  switch (type) {
    case "hero":
      return <HeroSection content={content} />;
    case "zodiac_journey":
      return <ZodiacJourney content={content} />;
    case "page_header":
      return <PageHeaderSection content={content} />;
    case "who_we_are":
      return <WhoWeAreSection content={content} />;
    case "about_alp":
      return <AboutAlpSection content={content} />;
    case "mission":
      return <MissionSection content={content} />;
    case "consultation":
      return <ConsultationSection content={content} />;
    case "video":
      return <VideoSection content={content} />;
    case "founder":
      return <FounderSection content={content} />;
    case "legal":
      return <LegalSection content={content} />;
    case "cta":
      return <CtaSection content={content} />;
    case "services":
      return <ServicesSection content={content} />;
    case "courses":
      return <CoursesSection content={content} />;
    case "consultants":
      return <ConsultantsSection content={content} />;
    case "events":
      return <EventsSection content={content} />;
    case "blog":
      return <BlogSection content={content} />;
    case "testimonials":
      return <TestimonialsSection content={content} />;
    default:
      return null;
  }
}

export function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s) => (
        <div key={s.id}>
          {renderSection(s.type, (s.content ?? {}) as Content)}
        </div>
      ))}
    </>
  );
}
