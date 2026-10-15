import { ArrowUpRight, MonitorCheck } from "lucide-react";
import Link from "next/link";
import type {
  Product,
  RequirementProfile,
  ResolvedProductEdition,
} from "@/data/products/types";
import { getProductTranslation } from "@/data/products/registry";
import { messages } from "@/content/messages";
import { getProductSalesHref } from "@/data/company/sales-link";
import { FeatureCard } from "@/components/cards/feature-card";
import { FaqList } from "@/components/content/faq-list";
import { ProductGallery } from "@/components/content/product-gallery";
import { ModuleFilterGrid } from "@/components/content/module-filter-grid";
import { ValueEstimator } from "@/components/content/value-estimator";
import {
  EditionComparisonTable,
  EditionFeatureMatrix,
  EditionModuleMatrix,
} from "@/components/content/edition-comparison";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProductOverview({ product }: { product: Product }) {
  const copy = getProductTranslation(product);

  return (
    <section className="content-section" id="overview">
      <Container className="split-section">
        <SectionHeading eyebrow={messages.productPage.overview} title={copy.productName} />
        <p className="prose-lead">{copy.overview}</p>
      </Container>
    </section>
  );
}

export function ProductImportance({ product }: { product: Product }) {
  const { importance } = getProductTranslation(product);
  const problems = importance.problems;
  const hasImportance = Boolean(
    importance.purpose ||
      problems.length ||
      importance.businessValue ||
      importance.targetIndustries.length ||
      importance.targetOrganizations.length ||
      importance.targetUsers.length ||
      importance.useCases.length,
  );
  if (!hasImportance) return null;

  return (
    <section className="content-section content-section--soft">
      <Container>
        <SectionHeading
          eyebrow={messages.productPage.whyItMatters}
          title={messages.productPage.businessValueTitle}
        />
        <div className="product-info-grid">
          {importance.purpose && <InfoBlock title={messages.productPage.purpose} items={[importance.purpose]} />}
          {problems.length > 0 && <InfoBlock title={messages.productPage.problemsSolved} items={problems} />}
          {importance.businessValue && <InfoBlock title={messages.productPage.businessValue} items={[importance.businessValue]} />}
          {importance.targetIndustries.length > 0 && <InfoBlock title={messages.productPage.targetIndustries} items={importance.targetIndustries} />}
          {importance.targetOrganizations.length > 0 && <InfoBlock title={messages.productPage.targetOrganizations} items={importance.targetOrganizations} />}
          {importance.targetUsers.length > 0 && <InfoBlock title={messages.productPage.targetUsers} items={importance.targetUsers} />}
          {importance.useCases.length > 0 && <InfoBlock title={messages.productPage.useCases} items={importance.useCases} />}
        </div>
      </Container>
    </section>
  );
}

export function ProductFeatureGrid({ product }: { product: Product }) {
  const allFeatures = getProductTranslation(product).features
    .filter((feature) => feature.active !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder);
  const featuredFeatures = allFeatures.filter((feature) => feature.featured);
  const features = featuredFeatures.length ? featuredFeatures : allFeatures;
  if (!features.length) return null;

  return (
    <section className="content-section">
      <Container>
        <SectionHeading eyebrow={messages.productPage.features} title={messages.productPage.featuresTitle} />
        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard feature={feature} key={feature.id} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ProductModuleGrid({ product }: { product: Product }) {
  const modules = getProductTranslation(product).modules
    .filter((module) => module.active !== false)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (!modules.length) return null;
  return (
    <section className="content-section content-section--soft">
      <Container>
        <SectionHeading eyebrow={messages.productPage.modules} title={messages.productPage.modulesTitle} />
        <ModuleFilterGrid modules={modules} />
      </Container>
    </section>
  );
}

export function ProductBenefits({ product }: { product: Product }) {
  const benefits = getProductTranslation(product).importance.operationalBenefits;
  if (!benefits.length) return null;
  return (
    <section className="content-section">
      <Container>
        <SectionHeading eyebrow={messages.productPage.benefits} title={messages.productPage.benefitsTitle} />
        <ul className="detail-list">
          {benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
        </ul>
      </Container>
    </section>
  );
}

export function ProductScreenshotGallery({ product }: { product: Product }) {
  const screenshots = getProductTranslation(product).screenshots;
  if (!screenshots.length) return null;
  return (
    <section className="content-section content-section--soft">
      <Container>
        <SectionHeading eyebrow={messages.productPage.gallery} title={messages.productPage.galleryTitle} />
        <ProductGallery screenshots={screenshots} />
      </Container>
    </section>
  );
}

export function ProductEditionSection({ product }: { product: Product }) {
  const copy = getProductTranslation(product);
  const editions = [...copy.editions].sort((a, b) => a.displayOrder - b.displayOrder);
  if (!editions.length) return null;

  return (
    <section className="content-section">
      <Container>
        <SectionHeading eyebrow={messages.productPage.editions} title={messages.productPage.editionsTitle} />
        <div className="edition-grid">
          {editions.map((edition) => (
            <EditionCard key={edition.id} product={product} edition={edition} />
          ))}
        </div>
        <div className="edition-matrices">
          <EditionFeatureMatrix product={product} />
          <EditionModuleMatrix product={product} />
        </div>
      </Container>
    </section>
  );
}

export function ProductPricingSection({ product }: { product: Product }) {
  const editions = getProductTranslation(product).editions;
  if (!editions.length) return null;

  return (
    <section className="content-section content-section--soft" id="pricing">
      <Container>
        <SectionHeading eyebrow={messages.productPage.pricing} title={messages.productPage.pricingTitle} />
        <EditionComparisonTable product={product} />
      </Container>
    </section>
  );
}

export function ProductLicensingSection({ product }: { product: Product }) {
  const copy = getProductTranslation(product);
  const licensing = copy.licensing;
  const details = [
    licensing.customerSummary,
    licensing.capacitySummary,
    licensing.activationSummary,
    licensing.renewalSummary,
    licensing.trialSummary,
    licensing.statusSummary,
    licensing.upgradeSummary,
    licensing.oneTimeLicenseExplanation,
  ].filter((detail): detail is string => Boolean(detail));
  if (!details.length) return null;

  return (
    <section className="content-section content-section--soft">
      <Container>
        <SectionHeading eyebrow={messages.productPage.licensing} title={messages.productPage.licensingTitle} />
        <div className="licensing-customer-grid">
          {licensing.customerSummary && <LicensingCard title={messages.commercial.chooseEdition} description={licensing.customerSummary} />}
          {licensing.capacitySummary && <LicensingCard title={messages.commercial.licensedCapacity} description={licensing.capacitySummary} />}
          {licensing.activationSummary && <LicensingCard title={messages.commercial.activation} description={licensing.activationSummary} />}
          {licensing.renewalSummary && <LicensingCard title={messages.commercial.subscriptionsAndRenewal} description={licensing.renewalSummary} />}
          {licensing.trialSummary && <LicensingCard title={messages.commercial.trialAvailability} description={licensing.trialSummary} />}
          {licensing.statusSummary && <LicensingCard title={messages.commercial.licenseStatus} description={licensing.statusSummary} />}
          {licensing.upgradeSummary && <LicensingCard title={messages.commercial.changingEditions} description={licensing.upgradeSummary} />}
          {licensing.oneTimeLicenseExplanation && <LicensingCard title={messages.commercial.oneTimeLicense} description={licensing.oneTimeLicenseExplanation} />}
        </div>
      </Container>
    </section>
  );
}

export function ProductValueEstimator({ product }: { product: Product }) {
  return <ValueEstimator product={product} />;
}

export function ProductRequirements({ product }: { product: Product }) {
  const requirements = getProductTranslation(product).requirements;
  const minimum = hasRequirementProfile(requirements.minimum)
    ? requirements.minimum
    : undefined;
  const recommended = hasRequirementProfile(requirements.recommended)
    ? requirements.recommended
    : undefined;
  const hasDetails =
    minimum || recommended || Boolean(requirements.additionalNotes?.length);
  if (!hasDetails) return null;

  return (
    <section className="content-section">
      <Container>
        <SectionHeading eyebrow={messages.productPage.requirements} title={messages.productPage.requirementsTitle} />
        <div className="spec-grid">
          {minimum && (
            <RequirementCard
              title={messages.productPage.minimumRequirements}
              profile={minimum}
            />
          )}
          {recommended && (
            <RequirementCard
              title={messages.productPage.recommendedRequirements}
              profile={recommended}
            />
          )}
          {requirements.additionalNotes?.map((note) => (
            <p className="form-notice" key={note}>{note}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ProductFAQ({ product }: { product: Product }) {
  const faqs = [...getProductTranslation(product).faqs]
    .sort((a, b) => a.displayOrder - b.displayOrder);
  if (!faqs.length) return null;

  return (
    <section className="content-section">
      <Container className="faq-section">
        <SectionHeading eyebrow={messages.productPage.faq} title={messages.productPage.faqTitle} />
        <FaqList items={faqs} />
      </Container>
    </section>
  );
}

export function ProductCTASection({ product }: { product: Product }) {
  const copy = getProductTranslation(product);
  const ctas = copy.ctas;
  if (!ctas.length) return null;

  return (
    <section className="cta-section">
      <Container className="cta-section__inner">
        <div>
          <p className="eyebrow">{copy.productName}</p>
          <h2>{messages.productPage.ctaTitle.replace("{product}", copy.productName)}</h2>
          <p>{copy.shortDescription}</p>
        </div>
        <div className="product-cta-actions">
          {ctas.map((cta) => (
            <a
              className="button button--secondary"
              href={cta.action === "contact-sales" ? getProductSalesHref(product, { channel: cta.channel }) : cta.href ?? "/contact#product"}
              key={`${cta.action}-${cta.label}`}
            >
              {cta.label} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="info-block">
      <h3>{title}</h3>
      {items.length === 1 ? (
        <p>{items[0]}</p>
      ) : (
        <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
      )}
    </article>
  );
}

function EditionCard({
  product,
  edition,
}: {
  product: Product;
  edition: ResolvedProductEdition;
}) {
  const copy = getProductTranslation(product);
  const previousEdition = copy.editions
    .filter((candidate) => candidate.displayOrder < edition.displayOrder)
    .sort((a, b) => b.displayOrder - a.displayOrder)[0];
  const previousFeatureIds = new Set(previousEdition?.includedFeatureIds ?? []);
  const featureNames = new Map(copy.features.map((feature) => [feature.id, feature.name]));
  const highlights = edition.includedFeatureIds
    .filter((id) => !previousFeatureIds.has(id))
    .map((id) => featureNames.get(id))
    .filter((name): name is string => Boolean(name))
    .slice(0, 3);

  return (
    <article className="edition-card">
      <div className="edition-card__heading">
        <p className="eyebrow">{copy.productName}</p>
        {edition.recommended && <span className="edition-card__badge">{messages.productPage.recommended}</span>}
      </div>
      <h3>{edition.name}</h3>
      {edition.badge && <p className="edition-card__label">{edition.badge}</p>}
      {edition.description && <p>{edition.description}</p>}
      {edition.limits && Object.keys(edition.limits).length > 0 && (
        <dl className="edition-limits">
          {Object.entries(edition.limits).map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{formatValue(value)}</dd></div>
          ))}
        </dl>
      )}
      {highlights.length > 0 && (
        <ul className="edition-highlights">
          {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      )}
      {edition.ctas.map((cta) => (
        <Link className="text-link edition-card__cta" href={cta.href ?? "/contact#product"} key={cta.label}>
          {cta.label} <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      ))}
    </article>
  );
}

function LicensingCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="licensing-customer-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function RequirementCard({
  title,
  profile,
}: {
  title: string;
  profile: RequirementProfile;
}) {
  const values: [string, string | string[] | undefined][] = [
    [messages.productPage.operatingSystems, profile.operatingSystems],
    [messages.productPage.processor, profile.processor],
    [messages.productPage.ram, profile.ram],
    [messages.productPage.storage, profile.storage],
    [messages.productPage.display, profile.display],
    [messages.productPage.network, profile.network],
    [messages.productPage.database, profile.database],
    [messages.productPage.server, profile.server],
    [messages.productPage.clientWorkstation, profile.clientWorkstation],
    [messages.productPage.browser, profile.browser],
    [messages.productPage.printerPeripherals, profile.printerPeripherals],
    [messages.productPage.additionalHardware, profile.additionalHardware],
  ];

  return (
    <article className="spec-card">
      <span className="spec-card__icon"><MonitorCheck size={20} aria-hidden="true" /></span>
      <p className="eyebrow">{messages.productPage.requirements}</p>
      <h3>{title}</h3>
      <dl className="definition-list">
        {values.filter(([, value]) => value !== undefined).map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{formatValue(value)}</dd></div>
        ))}
      </dl>
    </article>
  );
}

function hasRequirementProfile(
  profile: RequirementProfile | undefined,
): profile is RequirementProfile {
  return Boolean(
    profile &&
      Object.values(profile).some((value) =>
        Array.isArray(value)
          ? value.length > 0
          : value !== undefined && value !== null && value !== "",
      ),
  );
}

function formatValue(value: string | number | boolean | string[] | null | undefined) {
  if (value === null) return messages.productPage.unlimited;
  if (typeof value === "boolean") {
    return value ? messages.common.yes : messages.common.no;
  }
  return Array.isArray(value) ? value.join(", ") : value;
}
