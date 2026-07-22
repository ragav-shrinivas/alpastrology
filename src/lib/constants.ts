/** Site-wide constants and design tokens mirrored for use in TS/Three.js. */

export const SITE_NAME = "ALP Astrology";

/**
 * Canonical, indexable production origin — the branded custom domain, NOT the
 * `*.vercel.app` deployment alias. This is the single source of truth for every
 * absolute URL on the site (canonical tags, Open Graph, Twitter, sitemap,
 * robots, JSON-LD). Pointing these at the vercel.app alias would split ranking
 * signals and let the alias get indexed instead of the brand domain.
 *
 * Resolution order:
 *  1. `NEXT_PUBLIC_SITE_URL` — honoured only when it is NOT a `*.vercel.app`
 *     alias, so a stale alias value can never become the canonical host.
 *  2. Vercel production build → the branded domain below.
 *  3. Vercel preview build → that deployment's own URL.
 *  4. Local dev → localhost.
 *
 * The apex (alpastrosanthakumar.com) 308-redirects to www, so www is the final,
 * canonical host.
 */
export const PRODUCTION_ORIGIN = "https://www.alpastrosanthakumar.com";

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (explicit) {
    let host = "";
    try {
      host = new URL(explicit).hostname;
    } catch {
      /* malformed value → ignore and fall through */
    }
    if (host && !/\.vercel\.app$/i.test(host)) return explicit;
  }
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_ORIGIN;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

/** Default social-share image (1200×630). Used for og:image / twitter:image
 *  when neither the CMS `seo.og_image` nor a row's own image is set. Kept as a
 *  root-relative path so `metadataBase` resolves it to an absolute URL. */
export const OG_IMAGE_PATH = "/og-image.png";

/** Canonical business WhatsApp number — every enquiry/booking/contact CTA
 *  routes here. Digits only; `whatsappLink()` adds the country code. */
export const BUSINESS_WHATSAPP = "9840072167";

/** Google Maps place link for the ALP office, used when `contact.map_embed`
 *  is empty. Share links like this one can't be framed — Google sends
 *  X-Frame-Options: SAMEORIGIN — so the contact map is a still image that
 *  links out rather than an <iframe>. */
export const DEFAULT_MAP_URL = "https://maps.app.goo.gl/Mcxk5HgdkU65xEHv6?g_st=aw";

/** Shown until a staff member uploads their own image to `contact.map_image`.
 *  Rendered from OpenStreetMap tiles (© OpenStreetMap contributors, ODbL);
 *  the attribution is baked into the bottom-right of the image. */
export const DEFAULT_MAP_IMAGE = "/contact-map.png";

/** Brand palette — single source of truth for canvas/WebGL colors. */
export const COLORS = {
  primary: "#FF6A00",
  secondary: "#C62828",
  accent: "#FFD54F",
  background: "#0A0A0A",
  text: "#FFFFFF",
} as const;

/** Zodiac glyphs used by the floating-symbols Three.js scene. */
export const ZODIAC_SYMBOLS = [
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
] as const;

/** Fallbacks used when the database is unreachable (keeps the site rendering). */
export const FALLBACK_SETTINGS: Record<string, unknown> = {
  "site.title": SITE_NAME,
  "branding.logo_text": SITE_NAME,
  "meta.title": "ALP Astrology — Unlock the Secrets of Your Destiny",
  "meta.description":
    "Traditional Vedic wisdom and modern interpretation — consultations, courses, and astrology software.",
  "navigation.items": [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Courses", href: "/courses" },
    { label: "Consultants", href: "/consultants" },
    { label: "Gallery", href: "/gallery" },
    { label: "Events", href: "/events" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
