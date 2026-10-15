import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products/types";
import { getProductThemeStyle, getProductTranslation, productRegistry } from "@/data/products/registry";
import { messages } from "@/content/messages";
import { IconBadge } from "@/components/ui/icon-badge";
import { ProductLogo } from "@/components/ui/product-logo";

export function ProductCard({ product }: { product: Product }) {
  const copy = getProductTranslation(product);
  const index = productRegistry.findIndex((item) => item.id === product.id) + 1;

  return (
    <article className="product-card" style={getProductThemeStyle(product)}>
      <div className="product-card__top">
        {product.logoPath ? (
          <ProductLogo
            src={product.logoPath}
            alt={`${copy.productName} logo`}
            className="product-card__logo"
          />
        ) : (
          <IconBadge productIcon={product.icon} />
        )}
        <span className="product-card__index">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <p className="product-card__category">{copy.solutionCategory}</p>
      <h3>{copy.productName}</h3>
      <p className="product-card__description">{copy.shortDescription}</p>
      <Link className="text-link" href={`/products/${product.slug}`}>
        {messages.common.learnMore} <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </article>
  );
}
