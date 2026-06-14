import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = { title: "Refund Policy" };

export default async function RefundPage() {
  const sections = await getPageSections("refund-policy");
  return <SectionRenderer sections={sections} />;
}
