import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy",
  description:
    "Read the ALP Astrology privacy policy to understand how we collect, use and protect your personal information when you use our website and services.",
});

export default async function PrivacyPage() {
  const sections = await getPageSections("privacy-policy");
  return <SectionRenderer sections={sections} />;
}
