import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections, getGallery } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { VideoGrid } from "@/components/gallery/video-grid";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/videos",
  title: "Videos",
  description:
    "Watch ALP Astrology videos — lessons, talks and demonstrations on Vedic astrology and Akshaya Lagna Paddhati from our teachers and student community.",
});

export default async function VideosPage() {
  const [sections, gallery] = await Promise.all([
    getPageSections("videos"),
    getGallery(),
  ]);
  const videos = gallery.filter((g) => g.type === "video");

  return (
    <>
      <SectionRenderer sections={sections} />
      <section className="container-px mx-auto max-w-7xl pb-24">
        <VideoGrid items={videos} />
      </section>
    </>
  );
}
