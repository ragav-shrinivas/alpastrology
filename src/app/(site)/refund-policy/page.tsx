import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/refund-policy",
  title: "Refund Policy",
  description:
    "Understand the ALP Astrology refund policy for courses, consultations and software purchases — eligibility, timelines and how to request a refund.",
});

export default async function RefundPage() {
  const sections = await getPageSections("refund-policy");
  return <SectionRenderer sections={sections} />;
}
