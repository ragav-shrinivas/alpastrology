import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { ConsultantsSection } from "@/components/sections/collection-sections";

export const revalidate = 60;
export const metadata: Metadata = { title: "Consultants" };

export default async function ConsultantsPage() {
  const sections = await getPageSections("consultants");
  return (
    <>
      <SectionRenderer sections={sections} />
      <ConsultantsSection content={{}} />
    </>
  );
}
