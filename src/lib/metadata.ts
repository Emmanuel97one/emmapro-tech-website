import type { Metadata } from "next";
import { brand } from "@/config/brand";
import type { Product } from "@/data/products/types";
import { getProductTranslation } from "@/data/products/registry";

export const metadataBase = brand.siteUrl
  ? new URL(brand.siteUrl)
  : undefined;

/**
 * Creates reusable SEO metadata for standard website pages.
 */
export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
  locale: "en" | "fr" = "en",
): Metadata {
  const canonicalUrl = brand.siteUrl ? new URL(path, brand.siteUrl).toString() : undefined;
  const englishPath =
    path === "/fr" ? "/" : path.startsWith("/fr/") ? path.slice(3) : path;
  const frenchPath = englishPath === "/" ? "/fr" : `/fr${englishPath}`;

  const absoluteImage =
    image && brand.siteUrl
      ? new URL(image, brand.siteUrl).toString()
      : undefined;

  return {
    title,
    description,

    ...(brand.siteUrl && {
      alternates: {
        canonical: new URL(path, brand.siteUrl).toString(),
        languages: {
          en: new URL(englishPath, brand.siteUrl).toString(),
          fr: new URL(frenchPath, brand.siteUrl).toString(),
          "x-default": new URL(englishPath, brand.siteUrl).toString(),
        },
      },
    }),

    openGraph: {
      type: "website",
      siteName: brand.name,
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      ...(canonicalUrl && {
        url: canonicalUrl,
      }),
      ...(absoluteImage && {
        images: [
          {
            url: absoluteImage,
            alt: title,
          },
        ],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(absoluteImage && {
        images: [absoluteImage],
      }),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

/**
 * Creates SEO metadata for a product page.
 *
 * Product-specific titles, descriptions, and keywords are stored
 * with the product content rather than hard-coded here. This keeps
 * the SEO architecture scalable when new EMMAPRO Tech products
 * are added.
 */
export function createProductMetadata(product: Product): Metadata {
  const content = getProductTranslation(product);

  const metadata = createPageMetadata(
    content.seo.title,
    content.seo.description,
    `/products/${product.slug}`,
    product.openGraphImagePath,
  );

  return {
    ...metadata,

    ...(content.seo.keywords?.length
      ? {
          keywords: content.seo.keywords,
        }
      : {}),
  };
}

export function createFrenchProductMetadata(product: Product): Metadata {
  const content = getProductTranslation(product, "fr");
  const metadata = createPageMetadata(
    content.seo.title,
    content.seo.description,
    `/fr/products/${product.slug}`,
    product.openGraphImagePath,
    "fr",
  );

  return {
    ...metadata,
    title: {
      absolute: content.seo.title,
    },
    ...(content.seo.keywords?.length
      ? {
          keywords: content.seo.keywords,
        }
      : {}),
  };
}

/**
 * Creates SoftwareApplication structured data for search engines.
 */
export function createProductJsonLd(
  product: Product,
  locale: "en" | "fr" = "en",
) {
  const content = getProductTranslation(product, locale);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",

    name: content.productName,
    description: content.shortDescription,
    applicationCategory: content.solutionCategory,

    ...(brand.siteUrl && {
      url: new URL(
        `${locale === "fr" ? "/fr" : ""}/products/${product.slug}`,
        brand.siteUrl,
      ).toString(),
    }),

    publisher: {
      "@type": "Organization",
      name: brand.name,
      ...(brand.siteUrl && {
        url: brand.siteUrl,
      }),
    },
  };
}