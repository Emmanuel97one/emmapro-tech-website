import avidataPro from "@/data/products/avidata-pro/product";
import emmaproPharma from "@/data/products/emmapro-pharma/product";
import emmaproShop from "@/data/products/emmapro-shop/product";
import type {
  Locale,
  Product,
  ProductEdition,
  ResolvedProductEdition,
  ResolvedProductTranslation,
} from "@/data/products/types";
import type { CSSProperties } from "react";

export const productRegistry: readonly Product[] = [
  emmaproPharma,
  emmaproShop,
  avidataPro,
].sort((a, b) => a.displayOrder - b.displayOrder);

const productsBySlug = new Map(
  productRegistry.map((product) => [product.slug, product]),
);

export function getProductBySlug(slug: string): Product | undefined {
  return productsBySlug.get(slug);
}

export function getProductTranslation(
  product: Product,
  locale: Locale = "en",
): ResolvedProductTranslation {
  const translation = product.translations[locale] ?? product.translations.en;
  const importance = translation.importance;
  const productName = translation.productName || product.id;
  const shortDescription = translation.shortDescription ?? "";

  return {
    ...translation,
    tagline: translation.tagline ?? "",
    shortDescription,
    overview: translation.overview ?? shortDescription,
    productName,
    solutionCategory: translation.solutionCategory ?? "",
    importance: {
      ...importance,
      problems: importance?.problems ?? [],
      operationalBenefits: importance?.operationalBenefits ?? [],
      targetIndustries: importance?.targetIndustries ?? [],
      targetOrganizations: importance?.targetOrganizations ?? [],
      targetUsers: importance?.targetUsers ?? [],
      useCases: importance?.useCases ?? [],
    },
    features: translation.features ?? [],
    modules: translation.modules ?? [],
    editions: (translation.editions ?? []).map(normalizeEdition),
    screenshots: translation.screenshots ?? [],
    licensing: translation.licensing ?? {},
    requirements: translation.requirements ?? {},
    faqs: translation.faqs ?? [],
    ctas: translation.ctas ?? [],
    seo: {
      title: translation.seo?.title ?? productName,
      description: translation.seo?.description ?? shortDescription,
      keywords: translation.seo?.keywords,
    },
  };
}

function normalizeEdition(edition: ProductEdition): ResolvedProductEdition {
  return {
    ...edition,
    pricingOptions: edition.pricingOptions ?? [],
    includedFeatureIds: edition.includedFeatureIds ?? [],
    excludedFeatureIds: edition.excludedFeatureIds ?? [],
    includedModuleIds: edition.includedModuleIds ?? [],
    excludedModuleIds: edition.excludedModuleIds ?? [],
    ctas: edition.ctas ?? [],
  };
}

export function getProductThemeStyle(
  product: Product,
): CSSProperties & {
  "--product-primary": string;
  "--product-secondary": string;
  "--product-soft": string;
  "--product-foreground": string;
  "--product-gradient": string;
} {
  const { theme } = product;
  const primary = theme.primary || "#0f6470";

  return {
    "--product-primary": primary,
    "--product-secondary": theme.secondary ?? primary,
    "--product-soft": theme.soft ?? `color-mix(in srgb, ${primary} 12%, white)`,
    "--product-foreground": theme.foreground ?? "#ffffff",
    "--product-gradient":
      theme.gradient ??
      `radial-gradient(ellipse at 87% 19%, color-mix(in srgb, ${primary} 16%, transparent), transparent 36%)`,
  };
}

export function getProducts(options: { featuredOnly?: boolean } = {}): Product[] {
  return productRegistry.filter(
    (product) =>
      product.status !== "archived" &&
      (!options.featuredOnly || product.featured),
  );
}
