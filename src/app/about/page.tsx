import { createPageMetadata } from "@/lib/metadata";
import { ContentPage } from "@/components/content/content-page";
import { company } from "@/data/company/company";
import { getProducts } from "@/data/products/registry";
import { ProductCard } from "@/components/cards/product-card";
import { SectionHeading } from "@/components/ui/section-heading";

const products = getProducts();

export const metadata = createPageMetadata(
  "About",
  company.description,
  "/about",
);

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow="About EMMAPRO Tech"
      title="Software for specialized business operations."
      description={company.description}
      breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
    >
      <article className="content-note about-company">
        <h2>About EMMAPRO Tech</h2>
        <p>
          The company’s current portfolio includes pharmacy management, point
          of sale and retail management, and poultry farm management software.
          Product capabilities, editions, licensing, and pricing are described
          on each product page.
        </p>
        <p>
          A fuller company profile, including verified history and team
          information, will be published when those details are approved.
        </p>
      </article>
      <div>
        <SectionHeading
          eyebrow="Our products"
          title="The current product portfolio."
          description="Explore each product’s published overview, features, editions, licensing, and pricing."
        />
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </ContentPage>
  );
}
