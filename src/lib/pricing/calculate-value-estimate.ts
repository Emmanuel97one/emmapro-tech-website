import type { BillingPeriod } from "@/data/products/types";
import type { ProductPriceCalculation } from "./calculate-product-price";

export interface ValueEstimate {
  workloadHoursPerWeek: number;
  hoursRecoveredPerWeek: number;
  monthlyLaborValue: number;
  annualLaborValue: number;
  firstYearSoftwareCost?: number;
  estimatedNetValue?: number;
  paybackMonths?: number;
}

export function calculateValueEstimate({
  hoursPerPersonPerWeek,
  locations,
  operationalUnitsPerLocation,
  staffPerUnit,
  timeReductionPercent,
  hourlyLaborCost,
  softwarePrice,
}: {
  hoursPerPersonPerWeek: number;
  locations: number;
  operationalUnitsPerLocation: number;
  staffPerUnit: number;
  timeReductionPercent: number;
  hourlyLaborCost: number;
  softwarePrice?: ProductPriceCalculation;
}): ValueEstimate {
  const workloadHoursPerWeek = Math.min(
    1000000,
    nonNegative(hoursPerPersonPerWeek) *
      positiveInteger(locations) *
      positiveInteger(operationalUnitsPerLocation) *
      positiveInteger(staffPerUnit),
  );
  const safeReduction = Math.min(100, nonNegative(timeReductionPercent)) / 100;
  const safeHourlyCost = nonNegative(hourlyLaborCost);
  const hoursRecoveredPerWeek = workloadHoursPerWeek * safeReduction;
  const monthlyLaborValue = (hoursRecoveredPerWeek * safeHourlyCost * 52) / 12;
  const annualLaborValue = monthlyLaborValue * 12;
  const firstYearSoftwareCost = softwarePrice
    ? annualizedSoftwareCost(softwarePrice.total, softwarePrice.billingPeriod)
    : undefined;
  const estimatedNetValue =
    firstYearSoftwareCost === undefined
      ? undefined
      : roundCurrency(annualLaborValue - firstYearSoftwareCost);
  const paybackMonths =
    firstYearSoftwareCost === undefined ||
    softwarePrice === undefined ||
    monthlyLaborValue <= 0
      ? undefined
      : softwarePrice.total / monthlyLaborValue;

  return {
    workloadHoursPerWeek,
    hoursRecoveredPerWeek,
    monthlyLaborValue,
    annualLaborValue,
    firstYearSoftwareCost,
    estimatedNetValue,
    paybackMonths,
  };
}

function annualizedSoftwareCost(
  amount: number,
  period: BillingPeriod,
): number | undefined {
  if (period === "monthly") return roundCurrency(amount * 12);
  if (period === "quarterly") return roundCurrency(amount * 4);
  if (period === "semiannual") return roundCurrency(amount * 2);
  if (period === "annual" || period === "one-time") return amount;
  return undefined;
}

function nonNegative(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function positiveInteger(value: number): number {
  return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1;
}

function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}
