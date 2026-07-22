import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, OG_IMAGE_PATH } from "@/lib/constants";

/** Absolute URL for a root-relative path, against the canonical production
 *  origin. Use for JSON-LD and anywhere an absolute URL is required outside the
 *  Next.js Metadata API (which resolves relatives via `metadataBase`). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  /** Route path, e.g. "/about" or "/blog/my-post". Home is "/". */
  path: string;
  /** Short page title; the root layout template appends " | ALP Astrology". */
  title?: string;
  /** Meta description (aim for ~140–160 chars). */
  description?: string;
  /** Absolute or root-relative image URL(s); falls back to the brand OG image. */
  image?: string | null;
  /** Open Graph type — "website" (default) or "article" for blog posts. */
  type?: "website" | "article";
  /** Set true for pages that must not be indexed (login, previews). */
  noindex?: boolean;
};

/**
 * Builds a complete, self-consistent Metadata object for a page: canonical URL
 * plus a fully-redeclared Open Graph and Twitter card.
 *
 * Next.js merges metadata **shallowly** — a page that sets `openGraph` fully
 * replaces the parent layout's `openGraph` (og:image included). So every page
 * must redeclare the whole object; centralising it here keeps canonical, OG and
 * Twitter in lockstep across all routes.
 */
export function pageMetadata({
  path,
  title,
  description,
  image,
  type = "website",
  noindex = false,
}: PageMetaInput): Metadata {
  const url = path === "/" ? SITE_URL : absoluteUrl(path);
  const ogTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const ogImage = absoluteUrl(image || OG_IMAGE_PATH);

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
