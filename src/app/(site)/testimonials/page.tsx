import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { TestimonialsSection } from "@/components/sections/collection-sections";

export const revalidate = 60;
export const metadata: Metadata = { title: "Testimonials" };

export default async function TestimonialsPage() {
  const sections = await getPageSections("testimonials");
  return (
    <>
      <SectionRenderer sections={sections} />
      <TestimonialsSection content={{}} />
    </>
  );
}
