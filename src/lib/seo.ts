// Centralised SEO helpers. Pure data only — no side effects, no UI, no
// behaviour. Route `head()` functions import from here so the production
// domain, canonical URLs and structured data stay consistent in one place.

export const SITE_URL = "https://www.justprinto.com";
export const SITE_NAME = "JustPrint";

/** Absolute URL for a site-relative path (leading slash required). */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

/**
 * `<link rel="canonical">` entry for a route `head().links` array.
 * Always pass a clean, query-less path so filtered variants such as
 * `/products?cat=corporate` still canonicalise to `/products`.
 */
export function canonical(path: string) {
  return { rel: "canonical", href: absoluteUrl(path) };
}

type SocialMetaInput = {
  title: string;
  description: string;
  /** Clean, query-less path for og:url, e.g. "/products". */
  path: string;
  type?: "website" | "article";
};

/** Open Graph + Twitter meta entries for a route `head().meta` array. */
export function socialMeta({
  title,
  description,
  path,
  type = "website",
}: SocialMetaInput) {
  return [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: absoluteUrl(path) },
    { property: "og:type", content: type },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

/**
 * Organization + WebSite structured data.
 *
 * Uses only information already published elsewhere on the site (the footer
 * and contact bar). No ratings, reviews, testimonials, customer counts,
 * social profiles, email address, opening hours or geo coordinates are
 * asserted here, and LocalBusiness is deliberately not used.
 */
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: "JustPrint Press Pvt. Ltd.",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/sb-logo.jpg`,
      telephone: "+91-86397-36631",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hunter Road, Hanamkonda",
        addressLocality: "Warangal",
        addressRegion: "Telangana",
        postalCode: "506001",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};
