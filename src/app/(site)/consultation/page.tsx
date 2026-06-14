import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = { title: "Consultation" };

export default async function ConsultationPage() {
  const sections = await getPageSections("consultation");
  return <SectionRenderer sections={sections} />;
}
