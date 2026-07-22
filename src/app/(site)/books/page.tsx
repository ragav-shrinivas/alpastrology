import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/books",
  title: "Books",
  description:
    "Astrology books from ALP — study Akshaya Lagna Paddhati and Vedic astrology through clear, authentic texts. Browse titles, synopses and pricing here.",
});

export default async function BooksPage() {
  const sections = await getPageSections("books");
  return <SectionRenderer sections={sections} />;
}
