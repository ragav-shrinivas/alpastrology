import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { EventsSection } from "@/components/sections/collection-sections";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/events",
  title: "Events",
  description:
    "Explore ALP Astrology events, workshops and gatherings — dates, highlights and how to join our growing community of Vedic astrology learners and seekers.",
});

export default async function EventsPage() {
  const sections = await getPageSections("events");
  return (
    <>
      <SectionRenderer sections={sections} />
      <EventsSection content={{}} />
    </>
  );
}
