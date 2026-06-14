import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { FALLBACK_SETTINGS } from "@/lib/constants";
import type {
  Section,
  Service,
  Course,
  Consultant,
  GalleryItem,
  EventItem,
  Testimonial,
  Faq,
  Blog,
  Category,
} from "@/types/database";

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

export type SettingsBag = {
  get: <T = string>(key: string, fallback?: T) => T;
  raw: Record<string, unknown>;
};

export const getSettings = cache(async (): Promise<SettingsBag> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("settings").select("key, value");

  const raw: Record<string, unknown> = { ...FALLBACK_SETTINGS };
  for (const row of data ?? []) raw[row.key] = row.value;

  return {
    raw,
    get<T = string>(key: string, fallback?: T): T {
      const v = raw[key];
      if (v === undefined || v === null || v === "") {
        return (fallback ?? FALLBACK_SETTINGS[key] ?? "") as T;
      }
      return v as T;
    },
  };
});

/* ------------------------------------------------------------------ */
/* Pages + sections (page-builder content)                            */
/* ------------------------------------------------------------------ */

export type SectionContent = Record<string, unknown>;

export const getPageSections = cache(
  async (slug: string): Promise<Section[]> => {
    const supabase = createPublicClient();
    const { data: page } = await supabase
      .from("pages")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (!page) return [];

    const { data } = await supabase
      .from("sections")
      .select("*")
      .eq("page_id", page.id)
      .eq("is_visible", true)
      .order("position", { ascending: true });

    return data ?? [];
  },
);

export const getAllPages = cache(async () => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("pages")
    .select("*")
    .order("position", { ascending: true });
  return data ?? [];
});

/* ------------------------------------------------------------------ */
/* Content collections                                                */
/* ------------------------------------------------------------------ */

export const getServices = cache(async (): Promise<Service[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("status", "published")
    .order("position");
  return data ?? [];
});

export const getCourses = cache(async (): Promise<Course[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("position");
  return data ?? [];
});

export const getConsultants = cache(async (): Promise<Consultant[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("consultants")
    .select("*")
    .eq("status", "published")
    .order("position");
  return data ?? [];
});

export const getGallery = cache(async (): Promise<GalleryItem[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .eq("status", "published")
    .order("position");
  return data ?? [];
});

export const getEvents = cache(async (): Promise<EventItem[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("position");
  return data ?? [];
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("position");
  return data ?? [];
});

export const getFaqs = cache(async (): Promise<Faq[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("faq")
    .select("*")
    .eq("status", "published")
    .order("position");
  return data ?? [];
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase.from("categories").select("*").order("name");
  return data ?? [];
});

export const getBlogs = cache(async (): Promise<Blog[]> => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return data ?? [];
});

export const getBlogBySlug = cache(
  async (slug: string): Promise<Blog | null> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    return data ?? null;
  },
);

export const getCourseBySlug = cache(
  async (slug: string): Promise<Course | null> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return data ?? null;
  },
);
