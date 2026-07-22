import { SITE_URL, OG_IMAGE_PATH } from "@/lib/constants";

/** Organization + WebSite structured data (JSON-LD) for rich results.
 *  Covers the four things search engines look for: the organization, the
 *  website, contact information, and linked social profiles. All URLs are
 *  absolute against the canonical production origin. */
export function OrganizationJsonLd({
  name,
  description,
  logo,
  socials,
  phone,
  email,
  address,
}: {
  name: string;
  description: string;
  logo?: string;
  socials: (string | undefined)[];
  phone?: string;
  email?: string;
  address?: string;
}) {
  const abs = (u: string) => (/^https?:\/\//i.test(u) ? u : `${SITE_URL}${u}`);
  const logoUrl = abs(logo || OG_IMAGE_PATH);
  const sameAs = socials.filter((s): s is string => Boolean(s));

  const contactPoint =
    phone || email
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            ...(phone ? { telephone: phone } : {}),
            ...(email ? { email } : {}),
            areaServed: "IN",
            availableLanguage: ["en", "ta"],
          },
        }
      : {};

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name,
    url: SITE_URL,
    description,
    logo: logoUrl,
    image: logoUrl,
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(address
      ? { address: { "@type": "PostalAddress", streetAddress: address } }
      : {}),
    ...contactPoint,
    ...(sameAs.length ? { sameAs } : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
