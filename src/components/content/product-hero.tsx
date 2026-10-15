import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { createProductJsonLd } from "@/lib/metadata";
import {
  getProductThemeStyle,
  getProductTranslation,
} from "@/data/products/registry";
import type { Product } from "@/data/products/types";
import { messages } from "@/content/messages";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { ProductIcon } from "@/components/ui/product-icon";
import { ProductLogo } from "@/components/ui/product-logo";

export function ProductJsonLd({ product }: { product: Product }) {
  const structuredData = createProductJsonLd(product);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function ProductHero({ product }: { product: Product }) {
  const copy = getProductTranslation(product);
  const cta = copy.ctas[0];

  return (
    <section
      className="product-hero"
      style={getProductThemeStyle(product)}
    >
      <Container>
        <Breadcrumb
          items={[
            { label: messages.navigation.home, href: "/" },
            { label: messages.navigation.products, href: "/products" },
            { label: copy.productName },
          ]}
        />
        <div className="product-hero__content">
          <div>
            <div className="product-hero__identity">
              <IconBadge productIcon={product.icon} />
              <p>{copy.solutionCategory}</p>
            </div>
            <h1>{copy.productName}</h1>
            <p className="product-hero__lead">{copy.tagline}</p>
            <p className="product-hero__description">{copy.shortDescription}</p>
            <div className="product-hero__meta">
              <span>{messages.productPage.status[product.status]}</span>
              <span>{messages.productPage.availability[product.availability]}</span>
              {product.version && <span>{product.version}</span>}
            </div>
            {cta && (
              <div className="product-hero__actions">
                <Button href={cta.href ?? "/contact#product"}>
                  {cta.label}
                  <ArrowRight size={17} aria-hidden="true" />
                </Button>
                <a className="text-link" href="#pricing">
                  {messages.productPage.viewPricing}
                </a>
              </div>
            )}
          </div>
          <div className="product-hero__panel">
            {product.heroImagePath ? (
              <div className="product-hero__visual">
                <Image
                  src={product.heroImagePath}
                  alt={copy.productName}
                  fill
                  sizes="(max-width: 780px) 100vw, 38vw"
                  priority
                />
              </div>
            ) : product.logoPath ? (
              <ProductLogo
                src={product.logoPath}
                alt={`${copy.productName} logo`}
                className="product-hero__logo"
              />
            ) : (
              <span className="product-hero__panel-mark" aria-hidden="true">
                <ProductIcon id={product.icon} />
              </span>
            )}
            <p className="eyebrow">{messages.productPage.productBy}</p>
            <p className="product-hero__panel-title">{copy.productName}</p>
            <p>{copy.solutionCategory}</p>
            <span className="product-hero__panel-rule" />
            <span className="product-hero__panel-foot">{copy.shortDescription}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
