 "use client";

import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import type {
  BillingPeriod,
  Product,
  ProductFeature,
  ProductModule,
  PricingQuantityDimension,
  PricingUnit,
  ResolvedProductEdition,
} from "@/data/products/types";
import { getProductTranslation } from "@/data/products/registry";
import { messages } from "@/content/messages";
import { calculateAnnualSavings, calculateProductPrice } from "@/lib/pricing/calculate-product-price";
import { getProductSalesHref } from "@/data/company/sales-link";

export function EditionComparisonTable({ product }: { product: Product }) {
  const content = getProductTranslation(product);
  const editions = content.editions;
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [selectedEditionId, setSelectedEditionId] = useState(
    editions.find((edition) => edition.recommended)?.id ?? editions[0]?.id ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [dimensionQuantities, setDimensionQuantities] = useState<
    Record<string, number>
  >({});
  if (!editions.length) return null;
  const selectedEdition =
    editions.find((edition) => edition.id === selectedEditionId) ?? editions[0];
  const hasQuantityPricing = editions.some((edition) =>
    edition.pricingOptions.some(
      (option) =>
        option.additionalUnitPrice || option.quantityDimensions?.length,
    ),
  );
  const selectedBillingPeriods = Array.from(
    new Set(
      selectedEdition.pricingOptions.flatMap((option) =>
        option.billingPeriod ? [option.billingPeriod] : [],
      ),
    ),
  );
  const selectedBillingPeriod = selectedBillingPeriods.includes(billingPeriod)
    ? billingPeriod
    : selectedBillingPeriods[0] ?? "monthly";
  const selectedPricingOption =
    selectedEdition.pricingOptions.find(
      (option) => option.billingPeriod === selectedBillingPeriod,
    ) ?? selectedEdition.pricingOptions[0];
  const quantityOption = selectedPricingOption?.additionalUnitPrice
    ? selectedPricingOption
    : selectedEdition.pricingOptions.find((option) => option.additionalUnitPrice);
  const selectedDimensions = selectedPricingOption?.quantityDimensions ?? [];
  const selectedEditionHasQuantityPricing = Boolean(
    quantityOption || selectedDimensions.length,
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
  const safeQuantity = normalizeQuantity(
    quantity,
    minimumQuantity,
    maximumQuantity,
  );
  const safeDimensionQuantities = normalizeDimensionQuantities(
    selectedDimensions,
    dimensionQuantities,
  );
  const selectedPrice = calculateProductPrice({
    product,
    edition: selectedEdition,
    quantity: safeQuantity,
    quantityDimensions: safeDimensionQuantities,
    billingPeriod: selectedBillingPeriod,
  });
  const selectedPlanSummary =
    selectedPrice?.quantityDimensions.length
      ? `${selectedEdition.name} · ${selectedPrice.quantityDimensions
          .map(
            (dimension) =>
              `${dimension.label}: ${dimension.quantity}`,
          )
          .join(" · ")} · ${periodLabel(selectedBillingPeriod)}`
      : selectedPrice
        ? messages.commercial.selectedPlan
            .replace("{edition}", selectedEdition.name)
            .replace("{quantity}", String(selectedPrice.quantity))
            .replace("{unit}", quantityLabel.toLowerCase())
            .replace("{term}", periodLabel(selectedBillingPeriod))
        : "";

  return (
    <div className="pricing-experience">
      <div className="pricing-controls">
        {hasQuantityPricing && editions.length > 1 && (
          <label>
            {messages.commercial.pricingEdition}
            <select
              value={selectedEditionId}
              onChange={(event) => setSelectedEditionId(event.target.value)}
            >
              {editions.map((edition) => (
                <option value={edition.id} key={edition.id}>{edition.name}</option>
              ))}
            </select>
          </label>
        )}
        <label>
          {messages.commercial.billingTerm}
          <select
            value={selectedBillingPeriod}
            disabled={!selectedBillingPeriods.length}
            onChange={(event) => {
              const value = selectedBillingPeriods.find(
                (period) => period === event.target.value,
              );
              if (value) setBillingPeriod(value);
            }}
          >
            {selectedBillingPeriods.map((period) => (
              <option value={period} key={period}>{periodLabel(period)}</option>
            ))}
          </select>
        </label>
        {quantityOption && (
          <label className="pricing-seat-control">
            {quantityLabel}
            {maximumQuantity !== undefined && (
              <input
                type="range"
                min={minimumQuantity}
                max={maximumQuantity}
                value={safeQuantity}
                onChange={(event) =>
                  setQuantity(
                    normalizeQuantity(
                      Number(event.currentTarget.value),
                      minimumQuantity,
                      maximumQuantity,
                    ),
                  )
                }
                aria-label={quantityRangeLabel}
              />
            )}
            <div className="pricing-quantity-stepper">
              <button
                type="button"
                aria-label={`Decrease ${quantityLabel.toLowerCase()}`}
                disabled={safeQuantity <= minimumQuantity}
                onClick={() =>
                  setQuantity(
                    normalizeQuantity(
                      safeQuantity - 1,
                      minimumQuantity,
                      maximumQuantity,
                    ),
                  )
                }
              >
                <Minus size={16} aria-hidden="true" />
              </button>
              <input
                type="number"
                min={minimumQuantity}
                max={maximumQuantity}
                value={safeQuantity}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (Number.isFinite(value)) {
                    setQuantity(
                      normalizeQuantity(
                        value,
                        minimumQuantity,
                        maximumQuantity,
                      ),
                    );
                  }
                }}
                aria-label={quantityRangeLabel}
              />
              <button
                type="button"
                aria-label={`Increase ${quantityLabel.toLowerCase()}`}
                disabled={
                  maximumQuantity !== undefined &&
                  safeQuantity >= maximumQuantity
                }
                onClick={() =>
                  setQuantity(
                    normalizeQuantity(
                      safeQuantity + 1,
                      minimumQuantity,
                      maximumQuantity,
                    ),
                  )
                }
              >
                <Plus size={16} aria-hidden="true" />
              </button>
            </div>
          </label>
        )}
        {selectedDimensions.map((dimension) => (
          <QuantityDimensionControl
            key={dimension.id}
            dimension={dimension}
            value={safeDimensionQuantities[dimension.id]}
            onChange={(value) =>
              setDimensionQuantities((current) => ({
                ...current,
                [dimension.id]: value,
              }))
            }
          />
        ))}
      </div>
      {selectedEditionHasQuantityPricing && selectedPrice && (
        <div className="pricing-calculation" aria-live="polite">
          <strong>{selectedPlanSummary}</strong>
          <span>{messages.commercial.baseLicense}: {formatMoney(selectedPrice.basePrice, selectedPrice.currency)}</span>
          {selectedPrice.quantityDimensions.length > 0
            ? selectedPrice.quantityDimensions.map((dimension) => (
                <span key={dimension.id}>
                  {dimension.label}: {dimension.quantity} total ({dimension.includedQuantity} included) ·{" "}
                  {dimension.additionalQuantity} additional ×{" "}
                {formatMoney(dimension.listedAdditionalUnitPrice, selectedPrice.currency)} list rate ·{" "}
                {messages.commercial.volumeDiscount
                  .replace("{percentage}", String(dimension.volumeDiscountPercent))
                  .replace("{quantity}", dimension.label.toLowerCase())
                  .replace("{amount}", formatMoney(dimension.volumeSavings, selectedPrice.currency))} ·{" "}
                {formatMoney(dimension.additionalUnitPrice, selectedPrice.currency)} per additional unit ={" "}
                {formatMoney(dimension.additionalTotal, selectedPrice.currency)}
                </span>
            ))
            : (
              <span>
                {messages.commercial.additionalQuantity.replace("{quantity}", quantityLabel.toLowerCase())}: {selectedPrice.additionalQuantity} × {formatMoney(selectedPrice.listedAdditionalUnitPrice, selectedPrice.currency)} list rate ·{" "}
                {messages.commercial.volumeDiscount
                  .replace("{percentage}", String(selectedPrice.volumeDiscountPercent))
                  .replace("{quantity}", quantityLabel.toLowerCase())
                  .replace("{amount}", formatMoney(selectedPrice.volumeSavings, selectedPrice.currency))} ·{" "}
                {formatMoney(selectedPrice.additionalUnitPrice, selectedPrice.currency)} per additional unit = {formatMoney(selectedPrice.additionalTotal, selectedPrice.currency)}
              </span>
            )}
          <b>{messages.commercial.total}: {formatMoney(selectedPrice.total, selectedPrice.currency)}{billingSuffix(selectedBillingPeriod)}</b>
        </div>
      )}
      <div className="pricing-desktop comparison-table-wrap">
        <table className="comparison-table pricing-table">
          <thead>
            <tr>
              <th scope="col">{messages.commercial.pricingEdition}</th>
              <th scope="col">{messages.commercial.capacity}</th>
              <th scope="col">{messages.commercial.monthly}</th>
              <th scope="col">{messages.commercial.annual}</th>
              <th scope="col">{messages.commercial.oneTimeLicense}</th>
              <th scope="col">{messages.commercial.bestFor}</th>
              <th scope="col">{messages.commercial.action}</th>
            </tr>
          </thead>
          <tbody>
            {editions.map((edition) => {
              const editionQuantityOption = edition.pricingOptions.find(
                (option) =>
                  option.billingPeriod === selectedBillingPeriod &&
                  option.additionalUnitPrice,
              ) ?? edition.pricingOptions.find((option) => option.additionalUnitPrice);
              const editionQuantity = normalizeQuantity(
                quantity,
                Math.max(1, editionQuantityOption?.includedQuantity ?? 1),
                editionQuantityOption?.quantitySelectorMax ??
                  editionQuantityOption?.maximumQuantity ??
                  undefined,
              );
              const monthly = calculateProductPrice({
                product,
                edition,
                quantity: editionQuantity,
                quantityDimensions: getEditionDimensionQuantities(
                  edition,
                  "monthly",
                  dimensionQuantities,
                ),
                billingPeriod: "monthly",
              });
              const annual = calculateProductPrice({
                product,
                edition,
                quantity: editionQuantity,
                quantityDimensions: getEditionDimensionQuantities(
                  edition,
                  "annual",
                  dimensionQuantities,
                ),
                billingPeriod: "annual",
              });
              const once = calculateProductPrice({
                product,
                edition,
                quantity: editionQuantity,
                quantityDimensions: getEditionDimensionQuantities(
                  edition,
                  "one-time",
                  dimensionQuantities,
                ),
                billingPeriod: "one-time",
              });
              const editionDimensionQuantities = getEditionDimensionQuantities(
                edition,
                selectedBillingPeriod,
                dimensionQuantities,
              );
              const savings = calculateAnnualSavings(
                monthly && { amount: monthly.total, currency: monthly.currency },
                annual && { amount: annual.total, currency: annual.currency },
              );
              return (
                <tr key={edition.id}>
                  <th scope="row" data-label={messages.commercial.pricingEdition}>
                    <span className="comparison-edition">{edition.name}</span>
                    {edition.recommended && <span className="edition-card__badge">{messages.commercial.recommended}</span>}
                  </th>
                  <td data-label={messages.commercial.capacity}>{formatLimits(edition.limits)}</td>
                  <td data-label={messages.commercial.monthly}>{monthly ? formatMoney(monthly.total, monthly.currency) : messages.commercial.contactSales}</td>
                  <td data-label={messages.commercial.annual}>
                    {annual ? formatMoney(annual.total, annual.currency) : messages.commercial.contactSales}
                    {savings && <small className="pricing-savings">{messages.commercial.annualSavings.replace("{amount}", formatMoney(savings.amount, annual?.currency ?? "USD")).replace("{percentage}", String(savings.percentage))}</small>}
                  </td>
                  <td data-label={messages.commercial.oneTimeLicense} title={content.licensing.oneTimeLicenseExplanation}>
                    {once ? formatMoney(once.total, once.currency) : messages.commercial.contactSales}
                  </td>
                  <td data-label={messages.commercial.bestFor}>{edition.bestFor ?? edition.description ?? messages.commercial.contactSales}</td>
                  <td data-label={messages.commercial.action}>
                    <a className="text-link" href={getProductSalesHref(product, { editionId: edition.id, editionName: edition.name, quantity: quantityOption ? editionQuantity : undefined, quantityDimensions: editionDimensionQuantities, billingPeriod: selectedBillingPeriod })}>
                      {hasQuantityPricing ? messages.commercial.askAboutPlan : messages.commercial.contactSales}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pricing-cards">
        {editions.map((edition) => {
          const editionQuantityOption = edition.pricingOptions.find(
            (option) =>
              option.billingPeriod === selectedBillingPeriod &&
              option.additionalUnitPrice,
          ) ?? edition.pricingOptions.find((option) => option.additionalUnitPrice);
          const editionQuantity = normalizeQuantity(
            quantity,
            Math.max(1, editionQuantityOption?.includedQuantity ?? 1),
            editionQuantityOption?.quantitySelectorMax ??
              editionQuantityOption?.maximumQuantity ??
              undefined,
          );
          const editionDimensionQuantities = getEditionDimensionQuantities(
            edition,
            selectedBillingPeriod,
            dimensionQuantities,
          );
          const price = calculateProductPrice({
            product,
            edition,
            quantity: editionQuantity,
            quantityDimensions: editionDimensionQuantities,
            billingPeriod: selectedBillingPeriod,
          });
          const monthly = calculateProductPrice({
            product,
            edition,
            quantity: editionQuantity,
            quantityDimensions: getEditionDimensionQuantities(
              edition,
              "monthly",
              dimensionQuantities,
            ),
            billingPeriod: "monthly",
          });
          const annual = calculateProductPrice({
            product,
            edition,
            quantity: editionQuantity,
            quantityDimensions: getEditionDimensionQuantities(
              edition,
              "annual",
              dimensionQuantities,
            ),
            billingPeriod: "annual",
          });
          const savings = calculateAnnualSavings(
            monthly && { amount: monthly.total, currency: monthly.currency },
            annual && { amount: annual.total, currency: annual.currency },
          );
          const featureNames = new Map(content.features.map((feature) => [feature.id, feature.name]));
          const keyFeatures = edition.includedFeatureIds
            .map((id) => featureNames.get(id))
            .filter((name): name is string => Boolean(name))
            .slice(0, 4);
          return (
            <article className="pricing-card" key={edition.id}>
              <div className="edition-card__heading">
                <h3>{edition.name}</h3>
                {edition.recommended && <span className="edition-card__badge">{messages.commercial.recommended}</span>}
              </div>
              <p>{edition.bestFor ?? edition.description}</p>
              <dl className="pricing-card__capacity">
                {Object.entries(edition.limits ?? {}).map(([label, value]) => (
                  <div key={label}><dt>{label}</dt><dd>{String(value ?? "Unlimited")}</dd></div>
                ))}
              </dl>
              <p className="pricing-card__price">
                {price ? formatMoney(price.total, price.currency) : messages.commercial.contactSales}
                <span>{billingSuffix(selectedBillingPeriod)}</span>
              </p>
              {billingPeriod === "annual" && savings && (
                <p className="pricing-savings">{messages.commercial.annualSavings.replace("{amount}", formatMoney(savings.amount, annual?.currency ?? "USD")).replace("{percentage}", String(savings.percentage))}</p>
              )}
              {keyFeatures.length > 0 && (
                <ul>{keyFeatures.map((name) => <li key={name}>{name}</li>)}</ul>
              )}
              <a className="button button--primary" href={getProductSalesHref(product, { editionId: edition.id, editionName: edition.name, quantity: quantityOption ? editionQuantity : undefined, quantityDimensions: editionDimensionQuantities, billingPeriod: selectedBillingPeriod })}>
                {messages.commercial.askingAboutEdition.replace("{edition}", edition.name)}
              </a>
            </article>
          );
        })}
      </div>
      <details className="one-time-explanation">
        <summary>{messages.commercial.whatOneTimeIncludes}</summary>
        <p>{content.licensing.oneTimeLicenseExplanation ?? messages.commercial.oneTimeExplanation}</p>
      </details>
    </div>
  );
}

function QuantityDimensionControl({
  dimension,
  value,
  onChange,
}: {
  dimension: PricingQuantityDimension;
  value: number;
  onChange: (value: number) => void;
}) {
  const minimum = Math.max(1, dimension.includedQuantity ?? 1);
  const maximum =
    dimension.quantitySelectorMax ?? dimension.maximumQuantity ?? undefined;
  const rangeLabel = messages.commercial.quantityRange
    .replace("{quantity}", dimension.label)
    .replace("{minimum}", String(minimum))
    .replace(
      "{maximum}",
      maximum === undefined
        ? messages.commercial.noMaximumQuantity
        : String(maximum),
    );

  return (
    <label className="pricing-seat-control">
      {dimension.label}
      {maximum !== undefined && maximum > minimum && (
        <input
          type="range"
          min={minimum}
          max={maximum}
          value={value}
          onChange={(event) =>
            onChange(
              normalizeQuantity(
                Number(event.currentTarget.value),
                minimum,
                maximum,
              ),
            )
          }
          aria-label={rangeLabel}
        />
      )}
      <div className="pricing-quantity-stepper">
        <button
          type="button"
          aria-label={`Decrease ${dimension.label.toLowerCase()}`}
          disabled={value <= minimum}
          onClick={() => onChange(normalizeQuantity(value - 1, minimum, maximum))}
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        <input
          type="number"
          min={minimum}
          max={maximum}
          value={value}
          disabled={maximum !== undefined && maximum <= minimum}
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            if (Number.isFinite(nextValue)) {
              onChange(normalizeQuantity(nextValue, minimum, maximum));
            }
          }}
          aria-label={rangeLabel}
        />
        <button
          type="button"
          aria-label={`Increase ${dimension.label.toLowerCase()}`}
          disabled={maximum !== undefined && value >= maximum}
          onClick={() => onChange(normalizeQuantity(value + 1, minimum, maximum))}
        >
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>
    </label>
  );
}

function getEditionDimensionQuantities(
  edition: ResolvedProductEdition,
  billingPeriod: BillingPeriod,
  requested: Record<string, number>,
): Record<string, number> {
  const option = edition.pricingOptions.find(
    (candidate) => candidate.billingPeriod === billingPeriod,
  );
  return normalizeDimensionQuantities(
    option?.quantityDimensions ?? [],
    requested,
  );
}

function normalizeDimensionQuantities(
  dimensions: PricingQuantityDimension[],
  requested: Record<string, number>,
): Record<string, number> {
  return Object.fromEntries(
    dimensions.map((dimension) => {
      const minimum = Math.max(1, dimension.includedQuantity ?? 1);
      const maximum =
        dimension.quantitySelectorMax ?? dimension.maximumQuantity ?? undefined;
      return [
        dimension.id,
        normalizeQuantity(
          requested[dimension.id] ?? minimum,
          minimum,
          maximum,
        ),
      ];
    }),
  );
}

export function EditionModuleMatrix({ product }: { product: Product }) {
  const { editions, modules } = getProductTranslation(product);
  const activeModules = modules
    .filter((module) => module.active !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  if (!editions.length || !activeModules.length) return null;

  return (
    <ComparisonMatrix
      title={messages.productPage.moduleComparison}
      rowHeading={messages.productPage.modules}
      editions={editions}
      rows={activeModules}
      isIncluded={moduleIncluded}
    />
  );
}

export function EditionFeatureMatrix({ product }: { product: Product }) {
  const { editions, features } = getProductTranslation(product);
  const activeFeatures = features
    .filter((feature) => feature.active !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  if (!editions.length || !activeFeatures.length) return null;

  return (
    <ComparisonMatrix
      title={messages.productPage.featureComparison}
      rowHeading={messages.productPage.features}
      editions={editions}
      rows={activeFeatures}
      isIncluded={featureIncluded}
    />
  );
}

function ComparisonMatrix<T extends ProductModule | ProductFeature>({
  title,
  rowHeading,
  editions,
  rows,
  isIncluded,
}: {
  title: string;
  rowHeading: string;
  editions: ResolvedProductEdition[];
  rows: T[];
  isIncluded: (row: T, edition: ResolvedProductEdition) => boolean | undefined;
}) {
  return (
    <div className="edition-matrix">
      <h3>{title}</h3>
      <p className="comparison-table__legend">{messages.commercial.comparisonLegend}</p>
      <div className="comparison-table-wrap">
        <table className="comparison-table comparison-table--matrix">
          <thead>
            <tr>
              <th scope="col">{rowHeading}</th>
              {editions.map((edition) => (
                <th scope="col" key={edition.id}>
                  {edition.shortName ?? edition.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <th scope="row">{row.name}</th>
                {editions.map((edition) => {
                  const included = isIncluded(row, edition);
                  return (
                    <td
                      key={edition.id}
                      data-label={edition.shortName ?? edition.name}
                      aria-label={`${row.name}: ${availabilityLabel(included)}`}
                      title={availabilityLabel(included)}
                    >
                      {included === true ? (
                        <Check size={17} aria-hidden="true" />
                      ) : included === false ? (
                        <Minus size={17} aria-hidden="true" />
                      ) : (
                        <span aria-hidden="true">—</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function moduleIncluded(
  module: ProductModule,
  edition: ResolvedProductEdition,
): boolean | undefined {
  if (edition.excludedModuleIds.includes(module.id)) return false;
  if (edition.includedModuleIds.includes(module.id)) return true;
  if (module.availableInEditionIds) {
    return module.availableInEditionIds.includes(edition.id);
  }
  return undefined;
}

function featureIncluded(
  feature: ProductFeature,
  edition: ResolvedProductEdition,
): boolean | undefined {
  if (edition.excludedFeatureIds.includes(feature.id)) return false;
  if (edition.includedFeatureIds.includes(feature.id)) return true;
  return undefined;
}

function availabilityLabel(included: boolean | undefined): string {
  if (included === true) return messages.commercial.availabilityConfirmed;
  if (included === false) return messages.commercial.availabilityNotIncluded;
  return messages.commercial.availabilityUnconfirmed;
}

function formatLimits(limits: ResolvedProductEdition["limits"]): string {
  if (!limits) return "—";
  return Object.entries(limits)
    .map(([label, value]) => `${label}: ${value === null ? "Unlimited" : String(value)}`)
    .join(" · ");
}

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function periodLabel(period: BillingPeriod): string {
  if (period === "monthly") return messages.commercial.monthly;
  if (period === "annual") return messages.commercial.annual;
  if (period === "one-time") return messages.commercial.oneTimeLicense;
  return messages.productPage.billingPeriods[period];
}

function billingSuffix(period: BillingPeriod): string {
  if (period === "monthly") return ` ${messages.commercial.perMonth}`;
  if (period === "annual") return ` ${messages.commercial.perYear}`;
  if (period === "one-time") return messages.commercial.oneTimeSuffix;
  return "";
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
