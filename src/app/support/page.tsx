import Link from "next/link";
import { ArrowUpRight, LifeBuoy } from "lucide-react";
import { createPageMetadata } from "@/lib/metadata";
import { ContentPage } from "@/components/content/content-page";
import { getProductTranslation, getProducts } from "@/data/products/registry";

export const metadata = createPageMetadata(
  "Support",
  "Find product support information for EMMAPRO Tech products.",
  "/support",
);

const products = getProducts();

export default function SupportPage() {
  return (
    <ContentPage
      eyebrow="Support"
      title="Product information and support."
      description="Choose a product to review its published information. Contact the team for enquiries about a product or its licensing."
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Support" }]}
    >
      <div className="support-intro">
        <LifeBuoy size={23} aria-hidden="true" />
        <p>
          Support channels, service scope, and response hours have not yet been
          published. Select a product below to review its information, or{" "}
          <Link href="/contact">contact the team</Link> with an enquiry.
        </p>
      </div>
      <div className="support-product-list">
        {products.map((product) => (
          <Link
            href={`/products/${product.slug}`}
            className="support-product"
            key={product.slug}
          >
            <span>
              <strong>{getProductTranslation(product).productName}</strong>
              <span>{getProductTranslation(product).solutionCategory}</span>
            </span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </ContentPage>
  );
}
