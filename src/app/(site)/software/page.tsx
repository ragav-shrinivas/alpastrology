import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/software",
  title: "Software",
  description:
    "ALP Astrology software for accurate charts, predictions and Akshaya Lagna Paddhati calculations — practical tools for astrologers, students and enthusiasts.",
});

export default async function SoftwarePage() {
  const sections = await getPageSections("software");
  return <SectionRenderer sections={sections} />;
}
