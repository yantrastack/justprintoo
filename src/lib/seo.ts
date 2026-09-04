// Centralised SEO helpers. Pure data only — no side effects, no UI, no
// behaviour. Route `head()` functions import from here so the production
// domain, canonical URLs and structured data stay consistent in one place.

import type { Product } from "./products";

export const SITE_URL = "https://www.justprinto.com";
export const SITE_NAME = "JustPrint";

/**
 * Branded social-share card (`public/og-image.jpg`, 1200x630). Used for both
 * Open Graph and Twitter previews. Kept as an absolute production URL so
 * scrapers (Facebook, LinkedIn, X, WhatsApp) always resolve it.
 */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`;

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
    { property: "og:image", content: OG_IMAGE_URL },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${SITE_NAME} — printing press in Hanamkonda, Warangal` },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: OG_IMAGE_URL },
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

/**
 * "From" price for a product, in whole rupees.
 *
 * This mirrors exactly the figure already shown in the visible UI
 * (`src/routes/index.tsx` and `src/routes/products.index.tsx`), so the
 * structured data below never asserts a price the customer cannot see.
 * Keep this in sync if that visible formula ever changes.
 */
function fromPrice(product: Product): number {
  return Math.round(product.basePrice * Math.max(product.minQty, 50));
}

/**
 * Product structured data for a product detail route.
 *
 * Uses only values already present in `src/lib/products.ts` and already
 * rendered on the page: name, description, image and the same "from" price
 * shown in the catalog. No rating, review or stock count is asserted — the
 * offer is an open-ended `AggregateOffer` with a low price only. `image`
 * is resolved against the production origin (the same path the page's
 * `<img>` already loads).
 */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: absoluteUrl(product.image),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: fromPrice(product),
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/products/${product.slug}`),
      seller: { "@id": `${SITE_URL}/#organization` },
    },
  };
}

/**
 * BreadcrumbList structured data mirroring the existing URL hierarchy
 * Home → Products → <product>. No visible breadcrumb UI is added; this is
 * JSON-LD only and uses the real route paths and product name.
 */
export function breadcrumbJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: absoluteUrl("/products"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: absoluteUrl(`/products/${product.slug}`),
      },
    ],
  };
}
