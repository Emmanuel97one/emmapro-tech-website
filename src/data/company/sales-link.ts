import { companyContact, productSalesEmails } from "@/data/company/contact";
import type {
  BillingPeriod,
  PricingUnit,
  Product,
} from "@/data/products/types";
import { getProductTranslation } from "@/data/products/registry";

const billingLabels: Record<string, string> = {
  monthly: "monthly",
  quarterly: "quarterly",
  semiannual: "semiannual",
  annual: "annual",
  "one-time": "one-time license",
  custom: "custom billing",
};
const quantityLabels: Record<PricingUnit, string> = {
  license: "licenses",
  workstation: "workstations",
  device: "devices",
  branch: "branches",
  site: "sites",
  user: "seats",
  server: "servers",
  custom: "units",
};

export function getProductSalesHref(
  product: Product,
  options: {
    editionId?: string;
    editionName?: string;
    quantity?: number;
    quantityDimensions?: Record<string, number>;
    billingPeriod?: BillingPeriod;
    channel?: "email" | "whatsapp";
  } = {},
): string {
  const translation = getProductTranslation(product);
  const productName = translation.productName;
  const subject = `${productName} enquiry`;
  const selectedEdition = translation.editions.find(
    (edition) =>
      edition.id === options.editionId ||
      edition.name === options.editionName,
  );
  const quantityOption = (
    selectedEdition?.pricingOptions ??
    translation.editions.flatMap((edition) => edition.pricingOptions)
  ).find(
    (option) => option.additionalUnitPrice || option.quantityDimensions?.length,
  );
  const quantityLabel = quantityOption?.unit
    ? quantityLabels[quantityOption.unit]
    : "licenses";
  const requestedQuantities = [
    options.quantity && `${options.quantity} ${quantityLabel}`,
    ...(quantityOption?.quantityDimensions ?? []).flatMap((dimension) => {
      const quantity = options.quantityDimensions?.[dimension.id];
      return quantity === undefined
        ? []
        : [`${quantity} ${dimension.label.toLowerCase()}`];
    }),
  ].filter(Boolean);
  const interest = [
    productName,
    options.editionName,
    requestedQuantities.length > 0 &&
      `for ${requestedQuantities.join(" and ")}`,
  ].filter(Boolean).join(" ");
  const message = [
    "Hello EMMAPRO Tech,",
    `I'm interested in ${interest}${options.billingPeriod ? ` with a ${billingLabels[options.billingPeriod]} license` : ""}.`,
    "Please provide more information.",
  ].join("\n");
  const email = productSalesEmails[product.slug];
  if (options.channel === "email" && email) {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }

  if (options.channel === "whatsapp" || !options.channel) {
    if (options.channel === "whatsapp") {
      return buildWhatsAppHref(message);
    }
    const query = new URLSearchParams({ product: product.slug });
    if (selectedEdition) query.set("edition", selectedEdition.id);
    if (options.billingPeriod) query.set("billing", options.billingPeriod);
    if (options.quantity) query.set("quantity", String(options.quantity));
    for (const [id, quantity] of Object.entries(
      options.quantityDimensions ?? {},
    )) {
      query.set(id, String(quantity));
    }
    return `/contact?${query.toString()}#product`;
  }

  return buildWhatsAppHref(message);
}

export function buildWhatsAppHref(message: string): string {
  const phone = (companyContact.whatsapp ?? companyContact.phone ?? "")
    .replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppHref(): string {
  return buildWhatsAppHref(
    "Hello EMMAPRO Tech,\nI would like more information about your software solutions.",
  );
}
