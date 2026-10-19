import type { Product } from "@/data/products/types";
import { avidataFeatures } from "./features";
import { avidataModules } from "./modules";
import { avidataPricing } from "./pricing";
import { avidataLicensing } from "./licensing";
import { avidataFaqs } from "./faq";
import { frenchProductTranslations } from "@/content/products/fr";

const product: Product = {
  id: "avidata-pro",
  slug: "avidata-pro",
  status: "active",
  availability: "available",
  theme: { primary: "#9b6c28", soft: "#f7f0df", foreground: "#ffffff" },
  logoPath: "/products/avidata-pro/avidata-pro-logo.png",
  openGraphImagePath: "/products/avidata-pro/avidata-pro-logo.png",
  icon: "bird",
  displayOrder: 30,
  featured: true,
  translations: {
    fr: frenchProductTranslations["avidata-pro"],
    en: {
      productName: "AVIDATA PRO",
      shortName: "AVIDATA",
      solutionCategory: "Poultry Farm Management System",
      tagline: "Farm operations and performance, organized.",
      shortDescription:
        "A poultry farm management platform for batch operations, production tracking, inventory, finance and multi-farm oversight.",
      overview:
        "AVIDATA PRO helps poultry businesses organize batch management, production and egg tracking, weight and mortality records, health and vaccination information, feed and inventory, finance, analytics and reporting. Pro adds advanced operational capabilities; Pro Plus brings enterprise and multi-farm management tools.",
      importance: {
        purpose:
          "Give poultry farms and growing enterprises a structured place to record operations and review business information.",
        problems: [
          "Batch, production, health, inventory and financial records can be difficult to review together.",
          "Growing multi-farm operations need a way to compare and consolidate information across locations.",
        ],
        businessValue:
          "Choose an edition for a single farm or extend into enterprise-scale multi-farm management as the organization grows.",
        operationalBenefits: [
          "Organize batch, production, egg, weight and mortality records.",
          "Bring feed, medicine inventory, farm finance, analytics and reporting together.",
          "Extend into workforce, CRM, maintenance and cloud features with Pro.",
          "Coordinate cross-farm information and enterprise reporting with Pro Plus.",
        ],
        targetIndustries: ["Poultry farming", "Agriculture"],
        targetOrganizations: ["Poultry farms", "Growing poultry businesses", "Multi-farm enterprises"],
        targetUsers: ["Farm owners", "Farm managers", "Farm operations teams"],
        useCases: ["Batch management", "Production and egg tracking", "Farm inventory and financial records", "Multi-farm reporting"],
      },
      features: avidataFeatures,
      modules: avidataModules,
      editions: avidataPricing,
      licensing: avidataLicensing,
      faqs: avidataFaqs,
      roi: {
        locationLabel: "Farms or sites",
        operationalUnitLabel: "Active batches per farm",
        staffLabel: "Staff per batch",
        workloadLabel: "Administrative hours per staff member per week",
        exampleTimeReductionPercent: 10,
      },
      ctas: [
        { action: "contact-sales", label: "Email AVIDATA PRO sales", channel: "email" },
        { action: "contact-sales", label: "WhatsApp sales", channel: "whatsapp" },
      ],
      seo: {
          title: "Poultry Farm Management Software | AVIDATA PRO",
          description:
             "AVIDATA PRO is poultry farm management software for batch and flock management, broiler and layer production, eggs, feed, mortality, vaccination, inventory, finance, reporting and multi-farm operations.",
          keywords: [
             // Core poultry management
            "poultry farm management software",
            "poultry management software",
            "poultry management system",
            "poultry farm software",
            "poultry farming software",
            "poultry farm management system",
            "chicken farm management software",
            "chicken farm management system",
            "chicken farming software",
            "farm management software",
            "farm management system",

             // Flock and batch management
            "poultry flock management software",
            "flock management software",
            "flock management system",
            "poultry batch management software",
            "poultry batch management system",
            "chicken flock management software",

            // Broiler and layer management
            "broiler management software",
            "broiler farm management software",
            "broiler management system",
            "layer farm management software",
            "layer management software",
            "layer management system",

             // Production and eggs
            "poultry production management software",
            "poultry production tracking",
            "poultry production software",
            "egg production management software",
            "egg production tracking software",
            "egg farm management software",
            "poultry egg management software",

             // Feed
            "poultry feed management software",
            "poultry feed tracking software",
            "feed inventory management software",
            "poultry feed inventory software",

             // Health and mortality
            "poultry mortality tracking software",
            "poultry mortality management",
            "chicken mortality tracking",
            "poultry vaccination management software",
            "poultry vaccination tracking",
            "poultry medicine management software",
            "poultry health management software",

            // Inventory
            "poultry inventory management software",
            "poultry inventory software",
            "farm inventory management software",
            "farm stock management software",

    // Finance and business
            "poultry farm accounting software",
            "poultry farm financial management software",
            "poultry farm business management software",
            "poultry farm expense tracking",
            "poultry farm profit tracking",

            // Reporting and analytics
            "poultry farm reporting software",
            "poultry farm analytics software",
            "poultry performance tracking software",
            "poultry farm record keeping software",
            "digital poultry farm records",

             // Enterprise / multi-farm
            "multi farm management software",
            "multi farm poultry management software",
            "multi site poultry management software",
            "poultry enterprise management software",
          ],
        },
    },
  },
};

export default product;
