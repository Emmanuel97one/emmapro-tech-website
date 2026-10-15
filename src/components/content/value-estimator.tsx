"use client";

import { useState } from "react";
import type {
  BillingPeriod,
  Product,
  PricingUnit,
} from "@/data/products/types";
import { getProductTranslation } from "@/data/products/registry";
import { messages } from "@/content/messages";
import { calculateProductPrice } from "@/lib/pricing/calculate-product-price";
import { calculateValueEstimate } from "@/lib/pricing/calculate-value-estimate";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function ValueEstimator({ product }: { product: Product }) {
  const content = getProductTranslation(product);
  const editions = content.editions;
  const [editionId, setEditionId] = useState(
    editions.find((edition) => edition.recommended)?.id ?? editions[0]?.id ?? "",
  );
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [quantity, setQuantity] = useState(1);
  const [manualHours, setManualHours] = useState(0);
  const [hourlyCost, setHourlyCost] = useState(0);
  const [timeReduction, setTimeReduction] = useState(
    content.roi?.exampleTimeReductionPercent ?? 10,
  );
  const [locations, setLocations] = useState(1);
  const [operationalUnits, setOperationalUnits] = useState(1);
  const [staff, setStaff] = useState(1);
  const selectedEdition =
    editions.find((edition) => edition.id === editionId) ?? editions[0];
  const quantityOption = selectedEdition?.pricingOptions.find(
    (option) => option.additionalUnitPrice,
  );
  const minimumQuantity = Math.max(1, quantityOption?.includedQuantity ?? 1);
  const maximumQuantity =
    quantityOption?.quantitySelectorMax ??
    quantityOption?.maximumQuantity ??
    undefined;
  const quantityLabel = getQuantityLabel(quantityOption?.unit);
  const quantityRangeLabel = messages.commercial.quantityRange
    .replace("{quantity}", quantityLabel)
    .replace("{minimum}", String(minimumQuantity))
    .replace(
      "{maximum}",
      maximumQuantity === undefined
        ? messages.commercial.noMaximumQuantity
        : String(maximumQuantity),
    );
  const billingPeriods = Array.from(
    new Set(
      (selectedEdition?.pricingOptions ?? []).flatMap((option) =>
        option.billingPeriod ? [option.billingPeriod] : [],
      ),
    ),
  );
  const selectedBillingPeriod = billingPeriods.includes(billingPeriod)
    ? billingPeriod
    : billingPeriods[0] ?? "monthly";
  const pricingQuantity = quantityOption
    ? normalizeQuantity(quantity, minimumQuantity, maximumQuantity)
    : 1;
  const price = selectedEdition
    ? calculateProductPrice({
        product,
        edition: selectedEdition,
        quantity: pricingQuantity,
        billingPeriod: selectedBillingPeriod,
      })
    : undefined;
  if (!content.roi || !editions.length) return null;

  const estimate = calculateValueEstimate({
    hoursPerPersonPerWeek: manualHours,
    locations,
    operationalUnitsPerLocation: operationalUnits,
    staffPerUnit: staff,
    timeReductionPercent: timeReduction,
    hourlyLaborCost: hourlyCost,
    softwarePrice: price,
  });
  const currency = price?.currency ?? "USD";

  return (
    <section className="content-section value-estimator-section" id="value-estimator">
      <Container>
        <SectionHeading
          eyebrow={messages.commercial.illustrativePlanningTool}
          title={messages.commercial.potentialValueTitle}
          description={messages.commercial.potentialValueDescription}
        />
        <div className="value-estimator">
          <div className="value-estimator__inputs">
            <label>
              {content.roi.locationLabel}
              <input type="number" min={1} value={locations} onChange={(event) => setLocations(readPositiveInteger(event.target.value))} />
            </label>
            <label>
              {content.roi.operationalUnitLabel}
              <input type="number" min={1} value={operationalUnits} onChange={(event) => setOperationalUnits(readPositiveInteger(event.target.value))} />
            </label>
            <label>
              {content.roi.staffLabel}
              <input type="number" min={1} value={staff} onChange={(event) => setStaff(readPositiveInteger(event.target.value))} />
            </label>
            <label>
              {content.roi.workloadLabel}
              <input type="number" min={0} step="0.5" value={manualHours} onChange={(event) => setManualHours(readNonNegativeNumber(event.target.value))} />
            </label>
            <label>
              {messages.commercial.hourlyLaborCost} ({currency})
              <input type="number" min={0} step="0.01" value={hourlyCost} onChange={(event) => setHourlyCost(readNonNegativeNumber(event.target.value))} />
            </label>
            <label>
              {messages.commercial.exampleTimeReduction}
              <input type="number" min={0} max={100} step={1} value={timeReduction} onChange={(event) => setTimeReduction(Math.min(100, readNonNegativeNumber(event.target.value)))} />
            </label>
            <label>
              {messages.commercial.pricingEdition}
              <select value={editionId} onChange={(event) => setEditionId(event.target.value)}>
                {editions.map((edition) => <option value={edition.id} key={edition.id}>{edition.name}</option>)}
              </select>
            </label>
            {quantityOption && (
              <label>
                {quantityLabel}
                <input
                  type="number"
                  min={minimumQuantity}
                  max={maximumQuantity}
                  value={normalizeQuantity(quantity, minimumQuantity, maximumQuantity)}
                  onChange={(event) =>
                    setQuantity(
                      normalizeQuantity(
                        readPositiveInteger(event.target.value),
                        minimumQuantity,
                        maximumQuantity,
                      ),
                    )
                  }
                  aria-label={quantityRangeLabel}
                />
              </label>
            )}
            <label>
              {messages.commercial.billingTerm}
              <select
                value={selectedBillingPeriod}
                disabled={!billingPeriods.length}
                onChange={(event) => {
                  const value = billingPeriods.find(
                    (period) => period === event.target.value,
                  );
                  if (value) setBillingPeriod(value);
                }}
              >
                {billingPeriods.map((period) => (
                  <option value={period} key={period}>
                    {billingPeriodLabel(period)}
                  </option>
                ))}
              </select>
            </label>
            <p className="value-estimator__input-guidance">{messages.commercial.roiInputGuidance}</p>
          </div>
          <div className="value-estimator__results" aria-live="polite">
            <p className="eyebrow">{messages.commercial.estimate}</p>
            <div className="value-estimator__scope">
              <span>{locations} {content.roi.locationLabel.toLowerCase()}</span>
              <span>{operationalUnits} {content.roi.operationalUnitLabel.toLowerCase()}</span>
              <span>{staff} {content.roi.staffLabel.toLowerCase()}</span>
            </div>
            <dl>
              <div>
                <dt>{selectedBillingPeriod === "one-time" ? messages.commercial.oneTimeSoftwareCost : messages.commercial.firstYearSoftwareCost}</dt>
                <dd>{estimate.firstYearSoftwareCost === undefined ? messages.commercial.pricingUnavailable : formatMoney(estimate.firstYearSoftwareCost, currency)}</dd>
              </div>
              <div>
                <dt>{messages.commercial.workloadHours}</dt>
                <dd>{formatNumber(estimate.workloadHoursPerWeek)} {messages.commercial.hoursPerWeek}</dd>
              </div>
              <div>
                <dt>{messages.commercial.timeRecovered}</dt>
                <dd>{formatNumber(estimate.hoursRecoveredPerWeek)} {estimate.hoursRecoveredPerWeek === 1 ? messages.commercial.hourPerWeek : messages.commercial.hoursPerWeek}</dd>
              </div>
              <div>
                <dt>{messages.commercial.annualLaborValue}</dt>
                <dd>{formatMoney(estimate.annualLaborValue, currency)}</dd>
              </div>
              <div>
                <dt>{messages.commercial.netFirstYearValue}</dt>
                <dd>{estimate.estimatedNetValue === undefined ? messages.commercial.unavailable : formatMoney(estimate.estimatedNetValue, currency)}</dd>
              </div>
              <div>
                <dt>{messages.commercial.paybackPeriod}</dt>
                <dd>{estimate.paybackMonths === undefined ? messages.commercial.enterWorkload : formatPaybackPeriod(estimate.paybackMonths)}</dd>
              </div>
            </dl>
            <p className="value-estimator__disclaimer">
              {messages.commercial.roiDisclaimer}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function getQuantityLabel(unit?: PricingUnit): string {
  return unit === "user" ? messages.commercial.seats : messages.commercial.quantity;
}

function normalizeQuantity(
  value: number,
  minimum: number,
  maximum?: number,
): number {
  const normalized = Number.isFinite(value)
    ? Math.max(minimum, Math.floor(value))
    : minimum;
  return maximum === undefined
    ? normalized
    : Math.min(normalized, maximum);
}

function billingPeriodLabel(period: BillingPeriod): string {
  switch (period) {
    case "monthly":
      return messages.commercial.monthly;
    case "quarterly":
      return messages.commercial.quarterly;
    case "semiannual":
      return messages.commercial.semiannual;
    case "annual":
      return messages.commercial.annual;
    case "one-time":
      return messages.commercial.oneTimeLicense;
    case "custom":
      return messages.commercial.custom;
  }
}

function readPositiveInteger(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(1, Math.floor(parsed)) : 1;
}

function readNonNegativeNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(value);
}

function formatPaybackPeriod(months: number): string {
  if (months < 1) {
    const days = (months * 365) / 12;
    const roundedDays = Number(days.toFixed(1));
    if (roundedDays < 0.1) return messages.commercial.paybackUnderDay;
    return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(roundedDays)} ${roundedDays === 1 ? messages.commercial.paybackDay : messages.commercial.paybackDays}`;
  }

  return `${formatNumber(months)} months`;
}
