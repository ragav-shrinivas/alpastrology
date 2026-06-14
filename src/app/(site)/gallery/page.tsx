import type { Metadata } from "next";
import { getPageSections, getGallery } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const revalidate = 60;
export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const [sections, items] = await Promise.all([
    getPageSections("gallery"),
    getGallery(),
  ]);

  return (
    <>
      <SectionRenderer sections={sections} />
      <section className="container-px mx-auto max-w-7xl pb-24">
        <GalleryGrid items={items} />
      </section>
    </>
  );
}
