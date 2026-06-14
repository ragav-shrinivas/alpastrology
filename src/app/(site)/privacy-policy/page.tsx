import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  const sections = await getPageSections("privacy-policy");
  return <SectionRenderer sections={sections} />;
}
