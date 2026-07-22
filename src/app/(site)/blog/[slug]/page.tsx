import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug, getBlogs } from "@/lib/cms/content";
import { pageMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({
    path: `/blog/${blog.slug}`,
    title: blog.meta_title || blog.title,
    description:
      blog.meta_description ||
      blog.excerpt ||
      `${blog.title} — an article on Vedic astrology and Akshaya Lagna Paddhati from ALP Astrology.`,
    image: blog.featured_image,
    type: "article",
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <article className="container-px mx-auto max-w-3xl py-16 md:py-24">
      <Link
        href="/blog"
        className="text-muted hover:text-primary mb-8 inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft className="size-4" /> Back to blog
      </Link>

      <p className="text-primary text-sm">{formatDate(blog.published_at)}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">
        {blog.title}
      </h1>
      {blog.author && (
        <p className="text-muted mt-3 text-sm">By {blog.author}</p>
      )}

      {blog.featured_image && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={blog.featured_image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div
        className="mt-10 space-y-4 leading-relaxed text-white/85 [&_a]:text-primary [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_img]:rounded-xl [&_p]:text-muted"
        dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
      />
    </article>
  );
}
