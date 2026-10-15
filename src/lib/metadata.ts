import type { Metadata } from "next";
import { brand } from "@/config/brand";
import type { Product } from "@/data/products/types";
import { getProductTranslation } from "@/data/products/registry";

export const metadataBase = brand.siteUrl ? new URL(brand.siteUrl) : undefined;

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
): Metadata {
  const absoluteImage =
    image && brand.siteUrl ? new URL(image, brand.siteUrl).toString() : undefined;

  return {
    title,
    description,
    ...(brand.siteUrl && { alternates: { canonical: path } }),
    openGraph: {
      type: "website",
      siteName: brand.name,
      title,
      description,
      ...(brand.siteUrl && { url: new URL(path, brand.siteUrl).toString() }),
      ...(absoluteImage && { images: [absoluteImage] }),
    },
    ...(absoluteImage && {
      twitter: { card: "summary_large_image", images: [absoluteImage] },
    }),
  };
}

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
    ...(content.seo.keywords?.length && { keywords: content.seo.keywords }),
  };
}

export function createProductJsonLd(product: Product) {
  const content = getProductTranslation(product);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: content.productName,
    applicationCategory: content.solutionCategory,
    description: content.shortDescription,
    ...(brand.siteUrl && {
      url: new URL(`/products/${product.slug}`, brand.siteUrl).toString(),
    }),
    publisher: {
      "@type": "Organization",
      name: brand.name,
      ...(brand.siteUrl && { url: brand.siteUrl }),
    },
  };
}
