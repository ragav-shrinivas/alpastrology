import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "Meet ALP Astrology (Akshaya Lagna Paddhati): our purpose, vision, and the teachers bringing authentic Vedic astrology and modern clarity to every seeker.",
});

export default async function AboutPage() {
  const sections = await getPageSections("about");
  return <SectionRenderer sections={sections} />;
}
