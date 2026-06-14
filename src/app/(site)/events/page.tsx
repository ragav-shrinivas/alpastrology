import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { EventsSection } from "@/components/sections/collection-sections";

export const revalidate = 60;
export const metadata: Metadata = { title: "Events" };

export default async function EventsPage() {
  const sections = await getPageSections("events");
  return (
    <>
      <SectionRenderer sections={sections} />
      <EventsSection content={{}} />
    </>
  );
}
