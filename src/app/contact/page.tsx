import { Suspense } from "react";
import { productSalesEmails } from "@/data/company/contact";
import { getProductTranslation, getProducts } from "@/data/products/registry";
import { getProductSalesHref } from "@/data/company/sales-link";
import { createPageMetadata } from "@/lib/metadata";
import { messages } from "@/content/messages";
import { ContactForm } from "@/components/content/contact-form";
import { ContactInformation } from "@/components/content/contact-information";
import { ContentPage } from "@/components/content/content-page";

export const metadata = createPageMetadata(
  "Contact",
  "Contact EMMAPRO Tech about its software products.",
  "/contact",
);

const products = getProducts().map((product) => {
  const copy = getProductTranslation(product);
  return {
    id: product.id,
    slug: product.slug,
    name: copy.productName,
    email: productSalesEmails[product.slug],
    whatsappHref: getProductSalesHref(product, { channel: "whatsapp" }),
    editions: copy.editions.map((edition) => ({
      id: edition.id,
      name: edition.name,
      pricingOptions: edition.pricingOptions.map((option) => ({
        billingPeriod: option.billingPeriod,
        unit: option.unit,
        includedQuantity: option.includedQuantity,
        maximumQuantity: option.maximumQuantity,
        quantitySelectorMax: option.quantitySelectorMax,
        additionalUnitPrice: option.additionalUnitPrice,
        quantityDimensions: option.quantityDimensions,
      })),
    })),
  };
});

export default function ContactPage() {
  return (
    <ContentPage
      eyebrow="Contact"
      title="Let’s talk about what you need."
      description={messages.contactPage.introduction}
      breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
    >
      <div className="contact-page">
        <ContactInformation products={products} />
        <Suspense
          fallback={
            <section className="contact-form-wrap" aria-busy="true">
              <h2>{messages.contactPage.formTitle}</h2>
              <p className="form-notice">{messages.contactPage.formLoading}</p>
            </section>
          }
        >
          <ContactForm products={products} />
        </Suspense>
      </div>
    </ContentPage>
  );
}
