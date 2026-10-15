import type {
  BillingPeriod,
  PriceAmount,
  Product,
  PricingQuantityDimension,
  ResolvedProductEdition,
} from "@/data/products/types";
import { getProductTranslation } from "@/data/products/registry";

export interface CalculatedQuantityDimension {
  id: string;
  label: string;
  unit: PricingQuantityDimension["unit"];
  quantity: number;
  includedQuantity: number;
  additionalQuantity: number;
  listedAdditionalUnitPrice: number;
  additionalUnitPrice: number;
  volumeDiscountPercent: number;
  volumeSavings: number;
  additionalTotal: number;
}

interface RegressionPoint {
  quantity: number;
  total: number;
}

const volumePricingReference = {
  basePrice: 500,
  points: [
    { quantity: 1, total: 500 },
    { quantity: 2, total: 899 },
    { quantity: 3, total: 1025 },
  ] satisfies RegressionPoint[],
};

const volumeAdditionalPriceRatio =
  getLinearRegressionSlope(volumePricingReference.points) /
  volumePricingReference.basePrice;

export interface ProductPriceCalculation {
  currency: string;
  billingPeriod: BillingPeriod;
  pricingUnit?: string;
  quantity: number;
  includedQuantity: number;
  additionalQuantity: number;
  listedAdditionalUnitPrice: number;
  basePrice: number;
  additionalUnitPrice: number;
  volumeDiscountPercent: number;
  volumeSavings: number;
  additionalTotal: number;
  total: number;
  quantityDimensions: CalculatedQuantityDimension[];
}

export function calculateProductPrice({
  product,
  edition,
  quantity,
  quantityDimensions = {},
  billingPeriod,
}: {
  product: Product;
  edition: ResolvedProductEdition;
  quantity: number;
  quantityDimensions?: Record<string, number>;
  billingPeriod: BillingPeriod;
}): ProductPriceCalculation | undefined {
  const option = edition.pricingOptions.find(
    (candidate) =>
      candidate.active !== false &&
      candidate.billingPeriod === billingPeriod &&
      candidate.amount,
  );
  if (!option?.amount) return undefined;

  const includedQuantity = Math.max(1, option.includedQuantity ?? 1);
  const maximumQuantity = option.maximumQuantity ?? null;
  if (maximumQuantity !== null && maximumQuantity < includedQuantity) {
    throw new Error(
      `Invalid quantity range for ${product.slug} ${edition.id} ${billingPeriod} pricing`,
    );
  }
  const safeQuantity = Math.max(
    includedQuantity,
    Math.floor(
      maximumQuantity === null
        ? Number.isFinite(quantity) ? quantity : includedQuantity
        : Math.min(
            Number.isFinite(quantity) ? quantity : includedQuantity,
            maximumQuantity,
          ),
    ),
  );
  const additionalQuantity = Math.max(0, safeQuantity - includedQuantity);
  const listedAdditionalUnitPrice = option.additionalUnitPrice?.amount ?? 0;
  const additionalUnitPrice = applyVolumePriceRatio(
    listedAdditionalUnitPrice,
  );
  const additionalSavings = roundCurrency(
    additionalQuantity * (listedAdditionalUnitPrice - additionalUnitPrice),
  );
  const quantityDimensionResults = (option.quantityDimensions ?? []).map(
    (dimension) => {
      const dimensionIncludedQuantity = Math.max(
        1,
        dimension.includedQuantity ?? 1,
      );
      const dimensionMaximum =
        dimension.quantitySelectorMax ?? dimension.maximumQuantity ?? null;
      if (
        dimensionMaximum !== null &&
        dimensionMaximum < dimensionIncludedQuantity
      ) {
        throw new Error(
          `Invalid quantity range for ${product.slug} ${edition.id} ${billingPeriod} ${dimension.id} pricing`,
        );
      }
      const requestedQuantity = quantityDimensions[dimension.id];
      const dimensionQuantity = Math.max(
        dimensionIncludedQuantity,
        Math.floor(
          dimensionMaximum === null
            ? Number.isFinite(requestedQuantity)
              ? requestedQuantity
              : dimensionIncludedQuantity
            : Math.min(
                Number.isFinite(requestedQuantity)
                  ? requestedQuantity
                  : dimensionIncludedQuantity,
                dimensionMaximum,
              ),
        ),
      );
      const dimensionAdditionalQuantity = Math.max(
        0,
        dimensionQuantity - dimensionIncludedQuantity,
      );
      const dimensionListedAdditionalUnitPrice =
        dimension.additionalUnitPrice?.amount ?? 0;
      const dimensionAdditionalUnitPrice = applyVolumePriceRatio(
        dimensionListedAdditionalUnitPrice,
      );

      if (
        dimension.additionalUnitPrice &&
        dimension.additionalUnitPrice.currency !== option.amount?.currency
      ) {
        throw new Error(
          `Inconsistent currencies for ${product.slug} ${edition.id} ${billingPeriod} ${dimension.id} pricing`,
        );
      }

      return {
        id: dimension.id,
        label: dimension.label,
        unit: dimension.unit,
        quantity: dimensionQuantity,
        includedQuantity: dimensionIncludedQuantity,
        additionalQuantity: dimensionAdditionalQuantity,
        listedAdditionalUnitPrice: dimensionListedAdditionalUnitPrice,
        additionalUnitPrice: dimensionAdditionalUnitPrice,
        volumeDiscountPercent: getVolumeDiscountPercent(),
        volumeSavings: roundCurrency(
          dimensionAdditionalQuantity *
            (dimensionListedAdditionalUnitPrice -
              dimensionAdditionalUnitPrice),
        ),
        additionalTotal: roundCurrency(
          dimensionAdditionalQuantity * dimensionAdditionalUnitPrice,
        ),
      };
    },
  );
  const additionalTotal = roundCurrency(
    additionalQuantity * additionalUnitPrice +
      quantityDimensionResults.reduce(
        (total, dimension) => total + dimension.additionalTotal,
        0,
      ),
  );
  const volumeSavings = roundCurrency(
    additionalSavings +
      quantityDimensionResults.reduce(
        (total, dimension) => total + dimension.volumeSavings,
        0,
      ),
  );
  const basePrice = option.amount.amount;
  const currency = option.amount.currency;

  if (
    edition.pricingOptions.some(
      (candidate) =>
        candidate.billingPeriod === billingPeriod &&
        candidate.amount !== undefined &&
        candidate.amount.currency !== currency,
    )
  ) {
    throw new Error(
      `Inconsistent currencies for ${product.slug} ${edition.id} ${billingPeriod} pricing`,
    );
  }

  return {
    currency,
    billingPeriod,
    pricingUnit: option.unit,
    quantity: safeQuantity,
    includedQuantity,
    additionalQuantity,
    listedAdditionalUnitPrice,
    basePrice,
    additionalUnitPrice,
    volumeDiscountPercent: getVolumeDiscountPercent(),
    volumeSavings,
    additionalTotal,
    total: roundCurrency(basePrice + additionalTotal),
    quantityDimensions: quantityDimensionResults,
  };
}

function getLinearRegressionSlope(points: RegressionPoint[]): number {
  const count = points.length;
  const meanQuantity =
    points.reduce((total, point) => total + point.quantity, 0) / count;
  const meanTotal =
    points.reduce((total, point) => total + point.total, 0) / count;
  const covariance = points.reduce(
    (total, point) =>
      total +
      (point.quantity - meanQuantity) * (point.total - meanTotal),
    0,
  );
  const variance = points.reduce(
    (total, point) => total + (point.quantity - meanQuantity) ** 2,
    0,
  );

  if (count < 2 || variance === 0) {
    throw new Error("Volume pricing regression requires distinct quantities");
  }
  return covariance / variance;
}

function applyVolumePriceRatio(listedUnitPrice: number): number {
  return roundCurrency(listedUnitPrice * volumeAdditionalPriceRatio);
}

function getVolumeDiscountPercent(): number {
  return Math.round((1 - volumeAdditionalPriceRatio) * 1000) / 10;
}

export function calculateAnnualSavings(
  monthlyPrice: PriceAmount | undefined,
  annualPrice: PriceAmount | undefined,
): { amount: number; percentage: number } | undefined {
  if (
    !monthlyPrice ||
    !annualPrice ||
    monthlyPrice.currency !== annualPrice.currency
  ) {
    return undefined;
  }
  const monthlyYear = monthlyPrice.amount * 12;
  const amount = roundCurrency(monthlyYear - annualPrice.amount);
  return amount > 0
    ? {
        amount,
        percentage: Math.round((amount / monthlyYear) * 100),
      }
    : undefined;
}

function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function getProductEdition(
  product: Product,
  editionId: string,
): ResolvedProductEdition | undefined {
  return getProductTranslation(product).editions.find(
    (edition) => edition.id === editionId,
  );
}
