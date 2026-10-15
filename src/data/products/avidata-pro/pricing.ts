import type { ProductEdition } from "@/data/products/types";
import { avidataEditions } from "./editions";

const amounts: Record<string, { monthly: number; annual: number; "one-time": number }> = {
  lite: { monthly: 6.99, annual: 69, "one-time": 169 },
  pro: { monthly: 16.99, annual: 169, "one-time": 399 },
  "pro-plus": { monthly: 34.99, annual: 349, "one-time": 799 },
};
const periods = ["monthly", "annual", "one-time"] as const;

export const avidataPricing: ProductEdition[] = avidataEditions.map(
  (edition) => ({
    ...edition,
    pricingUnavailableAction: "contact-sales",
    pricingOptions: periods.map((period, index) => {
      const amount = { amount: amounts[edition.id][period], currency: "USD" };
      return {
        id: `${edition.id}-${period}`,
        pricingModel: "fixed",
        amount,
        billingPeriod: period,
        unit: "license",
        quantityDimensions: [
          {
            id: "farm-sites",
            label: "Farm sites",
            unit: "site",
            includedQuantity: 1,
            additionalUnitPrice: amount,
            maximumQuantity: getSiteMaximum(edition.limits?.Sites),
          },
        ],
        displayOrder: index + 1,
      };
    }),
  }),
);

function getSiteMaximum(
  limit: string | number | boolean | null | undefined,
): number | null | undefined {
  if (limit === null || limit === undefined) return undefined;
  if (typeof limit === "number") return limit;
  if (typeof limit !== "string") return undefined;
  if (limit.toLowerCase() === "unlimited") return null;
  const match = limit.match(/\d+$/);
  return match ? Number(match[0]) : undefined;
}
