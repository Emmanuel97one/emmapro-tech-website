import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";
import { productRegistry } from "@/data/products/registry";

export const dynamic = "force-static";

const staticRoutes = [
  "/",
  "/products",
  "/about",
  "/support",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = brand.siteUrl;
  if (!siteUrl) return [];

  const productRoutes = productRegistry
    .filter((product) => product.status !== "archived")
    .map((product) => `/products/${product.slug}`);

  return [...staticRoutes, ...productRoutes].flatMap((path) => {
    const englishUrl = new URL(path, siteUrl).toString();
    const frenchPath = path === "/" ? "/fr" : `/fr${path}`;
    const frenchUrl = new URL(frenchPath, siteUrl).toString();
    const languages = {
      en: englishUrl,
      fr: frenchUrl,
      "x-default": englishUrl,
    };

    return [
      { url: englishUrl, alternates: { languages } },
      { url: frenchUrl, alternates: { languages } },
    ];
  });
}
