import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/courses",
  title: "Courses",
  description:
    "Structured astrology courses from ALP — learn Akshaya Lagna Paddhati and Vedic astrology step by step with expert guidance, video lessons and certification.",
});

export default async function CoursesPage() {
  const sections = await getPageSections("courses");
  return <SectionRenderer sections={sections} />;
}
