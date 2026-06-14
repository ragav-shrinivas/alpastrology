import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const sections = await getPageSections("about");
  return <SectionRenderer sections={sections} />;
}
