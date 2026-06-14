import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { ServicesSection } from "@/components/sections/collection-sections";

export const revalidate = 60;
export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const sections = await getPageSections("services");
  return (
    <>
      <SectionRenderer sections={sections} />
      <ServicesSection content={{}} />
    </>
  );
}
