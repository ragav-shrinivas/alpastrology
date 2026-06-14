import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = { title: "Software" };

export default async function SoftwarePage() {
  const sections = await getPageSections("software");
  return <SectionRenderer sections={sections} />;
}
