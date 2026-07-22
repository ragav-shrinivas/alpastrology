import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { getPageSections, getBlogs } from "@/lib/cms/content";
import { SectionRenderer } from "@/components/sections/section-renderer";
import { BlogCard } from "@/components/cards/blog-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export const revalidate = 60;
export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog",
  description:
    "Read ALP Astrology articles on Vedic astrology, Akshaya Lagna Paddhati, remedies and predictive techniques — practical insights for students and seekers.",
});

export default async function BlogPage() {
  const [sections, blogs] = await Promise.all([
    getPageSections("blog"),
    getBlogs(),
  ]);

  return (
    <>
      <SectionRenderer sections={sections} />
      <section className="container-px mx-auto max-w-7xl pb-24">
        {blogs.length ? (
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <StaggerItem key={b.id}>
                <BlogCard blog={b} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : (
          <p className="text-muted text-center">
            Articles will appear here once published in Admin.
          </p>
        )}
      </section>
    </>
  );
}
