import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className combiner used across the design system. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build a URL-safe slug from arbitrary text. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Format an ISO date into a human-readable string. */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Strip HTML tags to a plain-text preview. */
export function stripHtml(html: string | null | undefined, max = 160): string {
  if (!html) return "";
  const text = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

/** Build a wa.me link from a phone/whatsapp number. */
export function whatsappLink(number: string, message?: string): string {
  const clean = number.replace(/[^\d]/g, "");
  const withCc = clean.length === 10 ? `91${clean}` : clean;
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${withCc}${q}`;
}
