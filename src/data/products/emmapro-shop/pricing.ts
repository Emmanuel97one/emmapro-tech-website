import type { ProductEdition } from "@/data/products/types";
import { emmaproShopEditions } from "./editions";

const pricing: Record<
  string,
  Record<
    "monthly" | "annual" | "one-time",
    { base: number; additional: number }
  >
> = {
  pro: {
    monthly: { base: 8.99, additional: 3 },
    annual: { base: 89, additional: 30 },
    "one-time": { base: 219, additional: 75 },
  },
  "pro-plus": {
    monthly: { base: 17.99, additional: 4 },
    annual: { base: 179, additional: 40 },
    "one-time": { base: 399, additional: 95 },
  },
};
const periods = ["monthly", "annual", "one-time"] as const;

export const emmaproShopPricing: ProductEdition[] = emmaproShopEditions.map(
  (edition) => ({
    ...edition,
    pricingUnavailableAction: "contact-sales",
    pricingOptions: periods.map((period, index) => ({
      id: `${edition.id}-${period}`,
      pricingModel: "fixed",
      amount: { amount: pricing[edition.id][period].base, currency: "USD" },
      additionalUnitPrice: {
        amount: pricing[edition.id][period].additional,
        currency: "USD",
      },
      includedQuantity: 1,
      quantitySelectorMax: 20,
      seatCount: 1,
      billingPeriod: period,
      unit: "user",
      displayOrder: index + 1,
    })),
  }),
);
