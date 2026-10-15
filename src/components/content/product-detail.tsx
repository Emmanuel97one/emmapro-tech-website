import type { Product } from "@/data/products/types";
import { getProductThemeStyle } from "@/data/products/registry";
import { ProductHero, ProductJsonLd } from "@/components/content/product-hero";
import {
  ProductBenefits,
  ProductCTASection,
  ProductEditionSection,
  ProductFAQ,
  ProductFeatureGrid,
  ProductImportance,
  ProductLicensingSection,
  ProductModuleGrid,
  ProductOverview,
  ProductPricingSection,
  ProductRequirements,
  ProductScreenshotGallery,
  ProductValueEstimator,
} from "@/components/content/product-sections";

export function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="product-page" style={getProductThemeStyle(product)}>
      <ProductJsonLd product={product} />
      <ProductHero product={product} />
      <ProductOverview product={product} />
      <ProductImportance product={product} />
      <ProductBenefits product={product} />
      <ProductFeatureGrid product={product} />
      <ProductModuleGrid product={product} />
      <ProductScreenshotGallery product={product} />
      <ProductEditionSection product={product} />
      <ProductPricingSection product={product} />
      <ProductLicensingSection product={product} />
      <ProductValueEstimator product={product} />
      <ProductRequirements product={product} />
      <ProductFAQ product={product} />
      <ProductCTASection product={product} />
    </div>
  );
}
