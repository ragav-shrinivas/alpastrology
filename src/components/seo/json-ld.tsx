import { SITE_URL } from "@/lib/constants";

/** Organization + Website structured data for rich results. */
export function OrganizationJsonLd({
  name,
  description,
  logo,
  socials,
  phone,
  address,
}: {
  name: string;
  description: string;
  logo?: string;
  socials: (string | undefined)[];
  phone?: string;
  address?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: SITE_URL,
    description,
    ...(logo ? { logo } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(address ? { address: { "@type": "PostalAddress", streetAddress: address } } : {}),
    sameAs: socials.filter(Boolean),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
