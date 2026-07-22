import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/terms",
  title: "Terms and Conditions",
  description:
    "Review the ALP Astrology terms and conditions covering use of our website, courses, consultations and astrology software, plus your rights and obligations.",
});

export default async function TermsPage() {
  const sections = await getPageSections("terms");
  return <SectionRenderer sections={sections} />;
}
