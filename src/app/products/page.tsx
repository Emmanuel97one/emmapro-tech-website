import { createPageMetadata } from "@/lib/metadata";
import { ProductCard } from "@/components/cards/product-card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/content/cta-section";
import { getProducts } from "@/data/products/registry";

export const metadata = createPageMetadata(
  "Products",
  "Explore EMMAPRO Tech products and their product-specific information.",
  "/products",
);

const products = getProducts();

export default function ProductsPage() {
  return (
    <>
      <section className="page-hero">
        <Container>
          <p className="eyebrow">EMMAPRO Tech portfolio</p>
          <h1>Products for specific work.</h1>
          <p className="page-hero__description">
            Explore EMMAPRO Tech software for pharmacy operations, retail
            management, and poultry farm management. Each product page presents
            its own published capabilities, editions, licensing, and pricing.
          </p>
        </Container>
      </section>
      <section className="content-section content-section--soft">
        <Container>
          <SectionHeading
            eyebrow="Our products"
            title="Choose the product for your operation."
            description="Review each solution’s overview, features, modules, editions, requirements, and commercial information."
          />
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
        </Container>
      </section>
      <CtaSection />
    </>
  );
}
