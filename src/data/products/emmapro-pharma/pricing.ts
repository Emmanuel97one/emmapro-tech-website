import type { BillingPeriod, ProductEdition } from "@/data/products/types";
import { emmaproPharmaEditions } from "./editions";

const prices: Record<string, Record<"monthly" | "annual" | "one-time", number>> = {
  pro: { monthly: 9.99, annual: 99, "one-time": 249 },
  "pro-plus": { monthly: 19.99, annual: 199, "one-time": 449 },
  "pro-max": { monthly: 34.99, annual: 349, "one-time": 749 },
  ultra: { monthly: 59.99, annual: 599, "one-time": 1199 },
};

const periods: ("monthly" | "annual" | "one-time")[] = [
  "monthly",
  "annual",
  "one-time",
];

export const emmaproPharmaPricing: ProductEdition[] = emmaproPharmaEditions.map(
  (edition) => ({
    ...edition,
    pricingUnavailableAction: "contact-sales",
    pricingOptions: periods.map((period: BillingPeriod, index) => {
      const amount = {
        amount: prices[edition.id][period as keyof (typeof prices)["pro"]],
        currency: "USD",
      };
      return {
        id: `${edition.id}-${period}`,
        pricingModel: "fixed",
        amount,
        billingPeriod: period,
        unit: "license",
        quantityDimensions: [
          {
            id: "pharmacy-sites",
            label: "Pharmacy sites",
            unit: "site",
            includedQuantity: 1,
            additionalUnitPrice: amount,
            maximumQuantity: 50,
          },
        ],
        displayOrder: index + 1,
      };
    }),
  }),
);
