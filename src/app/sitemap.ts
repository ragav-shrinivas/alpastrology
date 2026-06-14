import type { MetadataRoute } from "next";
import { getAllPages, getBlogs, getCourses } from "@/lib/cms/content";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, blogs, courses] = await Promise.all([
    getAllPages(),
    getBlogs(),
    getCourses(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = pages
    .filter((p) => p.status === "published")
    .map((p) => ({
      url: `${SITE_URL}${p.slug === "home" ? "" : `/${p.slug}`}`,
      lastModified: p.updated_at,
      changeFrequency: "weekly",
      priority: p.slug === "home" ? 1 : 0.7,
    }));

  const blogEntries: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: b.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const courseEntries: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${SITE_URL}/courses/${c.slug}`,
    lastModified: c.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries, ...courseEntries];
}
