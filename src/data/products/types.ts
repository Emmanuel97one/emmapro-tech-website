export interface ProductTheme {
  primary: string;
  secondary?: string;
  soft?: string;
  foreground?: string;
  gradient?: string;
}

export type ProductIconId = string;

export type ProductStatus = "active" | "coming-soon" | "archived" | "unconfirmed";
export type ProductAvailability = "available" | "limited" | "unavailable" | "unknown";
export type Locale = string;

export interface ProductFeature {
  id: string;
  name: string;
  shortDescription: string;
  description?: string;
  icon?: ProductIconId;
  category?: string;
  featured?: boolean;
  displayOrder: number;
  active?: boolean;
}

export interface ProductModule {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  icon?: ProductIconId;
  category?: string;
  capabilities?: string[];
  featureIds?: string[];
  availableInEditionIds?: string[];
  displayOrder: number;
  active?: boolean;
}

export interface ProductScreenshot {
  path: string;
  thumbnailPath?: string;
  title: string;
  description?: string;
  alt: string;
  category?: string;
  moduleId?: string;
  displayOrder: number;
  featured: boolean;
  width?: number;
  height?: number;
}

export type BillingPeriod =
  | "one-time"
  | "monthly"
  | "quarterly"
  | "semiannual"
  | "annual"
  | "custom";

export type PricingModel =
  | "fixed"
  | "contact-sales"
  | "starting-from"
  | "custom-quote";

export type PricingUnit =
  | "license"
  | "workstation"
  | "device"
  | "branch"
  | "site"
  | "user"
  | "server"
  | "custom";

export interface PriceAmount {
  amount: number;
  currency: string;
}

export interface PricingQuantityDimension {
  id: string;
  label: string;
  unit: PricingUnit;
  includedQuantity?: number;
  additionalUnitPrice?: PriceAmount;
  maximumQuantity?: number | null;
  quantitySelectorMax?: number;
}

export interface PricingOption {
  id: string;
  pricingModel: PricingModel;
  amount?: PriceAmount;
  originalPrice?: PriceAmount;
  billingPeriod?: BillingPeriod;
  unit?: PricingUnit;
  seatCount?: number | null;
  includedQuantity?: number;
  additionalUnitPrice?: PriceAmount;
  quantityDimensions?: PricingQuantityDimension[];
  maximumQuantity?: number | null;
  quantitySelectorMax?: number;
  workstationCount?: number | null;
  deviceCount?: number | null;
  serverCount?: number | null;
  userCount?: number | null;
  branchCount?: number | null;
  siteCount?: number | null;
  label?: string;
  description?: string;
  promotion?: string;
  active?: boolean;
  displayOrder: number;
  notes?: string[];
}

export type LicenseModel = "perpetual" | "subscription" | "custom" | "unknown";
export type LicenseType =
  | "single-user"
  | "multi-user"
  | "site"
  | "enterprise"
  | "custom"
  | "unknown";

export interface ProductLicensing {
  model?: LicenseModel;
  type?: LicenseType;
  duration?: string;
  activationMethod?: string;
  activationRequirements?: string[];
  workstationLimit?: number | null;
  seatLimit?: number | null;
  deviceLimit?: number | null;
  userLimit?: number | null;
  branchLimit?: number | null;
  siteLimit?: number | null;
  transferRules?: string;
  reinstallationRules?: string;
  hardwareChangePolicy?: string;
  renewalRules?: string;
  upgradeRules?: string;
  updateEntitlement?: string;
  supportEntitlement?: string;
  trialAvailable?: boolean;
  trialDuration?: string;
  gracePeriod?: string;
  activationConnectivity?: "online" | "offline" | "both" | "unknown";
  notes?: string[];
  customerSummary?: string;
  capacitySummary?: string;
  activationSummary?: string;
  renewalSummary?: string;
  trialSummary?: string;
  statusSummary?: string;
  upgradeSummary?: string;
  oneTimeLicenseExplanation?: string;
}

export interface RequirementProfile {
  operatingSystems?: string[];
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  network?: string;
  database?: string;
  server?: string;
  clientWorkstation?: string;
  browser?: string;
  printerPeripherals?: string[];
  additionalHardware?: string[];
  configuration?: "minimum" | "recommended";
}

export interface ProductRequirements {
  minimum?: RequirementProfile;
  recommended?: RequirementProfile;
  additionalNotes?: string[];
}

export interface ProductFaq {
  id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder: number;
}

export interface ProductImportance {
  purpose?: string;
  problems?: string[];
  businessValue?: string;
  operationalBenefits?: string[];
  targetIndustries?: string[];
  targetOrganizations?: string[];
  targetUsers?: string[];
  useCases?: string[];
}

export interface ProductSeo {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface ProductRoiConfiguration {
  locationLabel: string;
  operationalUnitLabel: string;
  staffLabel: string;
  workloadLabel: string;
  exampleTimeReductionPercent: number;
}

export type ProductAction =
  | "request-demo"
  | "contact-sales"
  | "ask-for-quote"
  | "view-pricing"
  | "licensing-enquiry"
  | "support";

export interface ProductCTA {
  action: ProductAction;
  label: string;
  href?: string;
  channel?: "email" | "whatsapp";
}

export interface ProductEdition {
  id: string;
  name: string;
  shortName?: string;
  description?: string;
  bestFor?: string;
  badge?: string;
  recommended: boolean;
  displayOrder: number;
  availability: ProductAvailability;
  pricingOptions?: PricingOption[];
  pricingUnavailableAction?: "contact-sales" | "ask-for-quote";
  includedFeatureIds?: string[];
  excludedFeatureIds?: string[];
  includedModuleIds?: string[];
  excludedModuleIds?: string[];
  limits?: Record<string, string | number | boolean | null>;
  ctas?: ProductCTA[];
  licensingReference?: string;
  licensingOverride?: Partial<ProductLicensing>;
}

export interface ResolvedProductEdition
  extends Omit<
    ProductEdition,
    | "pricingOptions"
    | "includedFeatureIds"
    | "excludedFeatureIds"
    | "includedModuleIds"
    | "excludedModuleIds"
    | "ctas"
  > {
  pricingOptions: PricingOption[];
  includedFeatureIds: string[];
  excludedFeatureIds: string[];
  includedModuleIds: string[];
  excludedModuleIds: string[];
  ctas: ProductCTA[];
}

export interface ProductTranslation {
  productName: string;
  solutionCategory: string;
  shortName?: string;
  tagline?: string;
  shortDescription?: string;
  overview?: string;
  importance?: ProductImportance;
  features?: ProductFeature[];
  modules?: ProductModule[];
  editions?: ProductEdition[];
  screenshots?: ProductScreenshot[];
  licensing?: ProductLicensing;
  requirements?: ProductRequirements;
  roi?: ProductRoiConfiguration;
  faqs?: ProductFaq[];
  ctas?: ProductCTA[];
  seo?: ProductSeo;
}

export interface ResolvedProductTranslation
  extends Omit<
    ProductTranslation,
    | "overview"
    | "importance"
    | "features"
    | "modules"
    | "editions"
    | "screenshots"
    | "licensing"
    | "requirements"
    | "roi"
    | "faqs"
    | "ctas"
    | "seo"
  > {
  tagline: string;
  shortDescription: string;
  overview: string;
  productName: string;
  solutionCategory: string;
  importance: Required<
    Pick<
      ProductImportance,
      | "problems"
      | "operationalBenefits"
      | "targetIndustries"
      | "targetOrganizations"
      | "targetUsers"
      | "useCases"
    >
  > &
    Omit<
      ProductImportance,
      | "problems"
      | "operationalBenefits"
      | "targetIndustries"
      | "targetOrganizations"
      | "targetUsers"
      | "useCases"
    >;
  features: ProductFeature[];
  modules: ProductModule[];
  editions: ResolvedProductEdition[];
  screenshots: ProductScreenshot[];
  licensing: ProductLicensing;
  requirements: ProductRequirements;
  roi?: ProductRoiConfiguration;
  faqs: ProductFaq[];
  ctas: ProductCTA[];
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
}

export interface Product {
  id: string;
  slug: string;
  status: ProductStatus;
  availability: ProductAvailability;
  version?: string;
  theme: ProductTheme;
  icon: ProductIconId;
  logoPath?: string;
  heroImagePath?: string;
  openGraphImagePath?: string;
  displayOrder: number;
  featured: boolean;
  translations: Record<string, ProductTranslation> & {
    en: ProductTranslation;
  };
}
