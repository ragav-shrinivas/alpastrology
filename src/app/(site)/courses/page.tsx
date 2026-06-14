import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = { title: "Courses" };

export default async function CoursesPage() {
  const sections = await getPageSections("courses");
  return <SectionRenderer sections={sections} />;
}
