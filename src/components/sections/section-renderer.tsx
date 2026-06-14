import type { Section } from "@/types/database";
import { SectionFrame } from "@/components/editor/section-frame";
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

/** Maps a stored section `type` to its renderer. Unknown types are skipped.
 *  `sectionId` is threaded so inline editing can save back to the right row. */
function renderSection(type: string, content: Content, sectionId: string) {
  switch (type) {
    case "hero":
      return <HeroSection content={content} sectionId={sectionId} />;
    case "zodiac_journey":
      return <ZodiacJourney content={content} />;
    case "page_header":
      return <PageHeaderSection content={content} sectionId={sectionId} />;
    case "who_we_are":
      return <WhoWeAreSection content={content} sectionId={sectionId} />;
    case "about_alp":
      return <AboutAlpSection content={content} sectionId={sectionId} />;
    case "mission":
      return <MissionSection content={content} sectionId={sectionId} />;
    case "consultation":
      return <ConsultationSection content={content} sectionId={sectionId} />;
    case "video":
      return <VideoSection content={content} sectionId={sectionId} />;
    case "founder":
      return <FounderSection content={content} sectionId={sectionId} />;
    case "legal":
      return <LegalSection content={content} sectionId={sectionId} />;
    case "cta":
      return <CtaSection content={content} sectionId={sectionId} />;
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
  const ids = sections.map((s) => s.id);
  return (
    <>
      {sections.map((s) => (
        <SectionFrame
          key={s.id}
          sectionId={s.id}
          isVisible={s.is_visible}
          siblingIds={ids}
        >
          {renderSection(s.type, (s.content ?? {}) as Content, s.id)}
        </SectionFrame>
      ))}
    </>
  );
}
