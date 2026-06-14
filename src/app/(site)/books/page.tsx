import type { Metadata } from "next";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = { title: "Books" };

export default async function BooksPage() {
  const sections = await getPageSections("books");
  return <SectionRenderer sections={sections} />;
}
