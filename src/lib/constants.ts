/** Site-wide constants and design tokens mirrored for use in TS/Three.js. */

export const SITE_NAME = "ALP Astrology";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
