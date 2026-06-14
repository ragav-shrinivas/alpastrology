import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = { title: "Terms and Conditions" };

export default async function TermsPage() {
  const sections = await getPageSections("terms");
  return <SectionRenderer sections={sections} />;
}
