import type { Product } from "@/data/products/types";
import { emmaproPharmaFeatures } from "./features";
import { emmaproPharmaModules } from "./modules";
import { emmaproPharmaPricing } from "./pricing";
import { emmaproPharmaLicensing } from "./licensing";
import { emmaproPharmaFaqs } from "./faq";
import { frenchProductTranslations } from "@/content/products/fr";

const product: Product = {
  id: "emmapro-pharma",
  slug: "emmapro-pharma",
  status: "active",
  availability: "available",
  theme: { primary: "#0f6470", soft: "#e1f1f0", foreground: "#ffffff" },
  logoPath: "/products/emmapro-pharma/emmapro-pharma-logo.png",
  openGraphImagePath: "/products/emmapro-pharma/emmapro-pharma-logo.png",
  icon: "pill",
  displayOrder: 10,
  featured: true,
  translations: {
    fr: frenchProductTranslations["emmapro-pharma"],
    en: {
      productName: "EMMAPRO PHARMA",
      shortName: "PHARMA",
      solutionCategory: "Pharmacy Management System",
      tagline: "Professional pharmacy operations, in one place.",
      shortDescription:
        "A professional pharmacy operations and management platform for dispensing, procurement, stock control and operational visibility.",
      overview:
        "EMMAPRO PHARMA brings pharmacy dispensing, procurement and stock control into a focused management system. Higher editions add reporting, multi-site capabilities, credit recovery, inventory declaration and insurance features according to the selected license.",
      importance: {
        purpose:
          "Help pharmacy teams coordinate routine operations and maintain a clearer view of their work.",
        problems: [
          "Pharmacy workflows can be spread across separate records and processes.",
          "Maintaining a timely view of stock and operational activity can require substantial manual coordination.",
        ],
        businessValue:
          "Bring key pharmacy operations together while selecting the edition that matches the pharmacy's workflow and licensed client-PC capacity.",
        operationalBenefits: [
          "Coordinate dispensing, procurement and stock control in one pharmacy-focused platform.",
          "Select higher-tier reporting and multi-site capabilities when they fit the operating model.",
          "Choose eligible credit recovery, inventory declaration and insurance capabilities by edition.",
        ],
        targetIndustries: ["Community and retail pharmacy"],
        targetOrganizations: ["Pharmacies", "Pharmacy groups with eligible multi-site needs"],
        targetUsers: ["Pharmacy owners", "Pharmacy managers", "Pharmacy operations staff"],
        useCases: ["Dispensing operations", "Procurement coordination", "Stock and inventory control", "Multi-site visibility in eligible editions"],
      },
      features: emmaproPharmaFeatures,
      modules: emmaproPharmaModules,
      editions: emmaproPharmaPricing,
      licensing: emmaproPharmaLicensing,
      faqs: emmaproPharmaFaqs,
      roi: {
        locationLabel: "Pharmacies or branches",
        operationalUnitLabel: "Operational units per location",
        staffLabel: "Staff per unit",
        workloadLabel: "Administrative hours per staff member per week",
        exampleTimeReductionPercent: 10,
      },
      ctas: [
        { action: "request-demo", label: "Request a PHARMA demo", href: "/contact#product" },
        { action: "contact-sales", label: "WhatsApp PHARMA sales", channel: "whatsapp" },
      ],
      seo: {
          title: "Pharmacy Management Software & Inventory System | EMMAPRO PHARMA",
          description:
            "EMMAPRO PHARMA is pharmacy management software for dispensing, medicine inventory, stock control, sales, procurement, reporting and multi-site pharmacy operations.",
          keywords: [
            // Core pharmacy software
            "pharmacy management software",
            "pharmacy management system",
            "pharmacy software",
            "pharmacy management solution",
            "pharmacy business management software",
            "pharmacy operations software",

            // Pharmacy inventory and stock
            "pharmacy inventory software",
            "pharmacy inventory management software",
            "pharmacy inventory management system",
            "pharmacy stock management software",
            "pharmacy stock management system",
            "pharmacy stock control software",
            "medicine inventory software",
            "medicine inventory management system",
            "medicine stock management software",
            "drug inventory management software",
            "drug inventory management system",
            "pharmaceutical inventory software",

            // Dispensing
            "pharmacy dispensing software",
            "medicine dispensing software",
            "drug dispensing software",
            "pharmacy prescription management software",

            // POS, sales and billing
            "pharmacy POS software",
            "pharmacy point of sale software",
            "pharmacy sales software",
            "pharmacy billing software",
            "pharmacy cashier software",
            "pharmacy sales management system",

            // Purchasing and procurement
            "pharmacy procurement software",
            "pharmacy purchase management software",
            "pharmacy supplier management software",
            "medicine procurement software",
            "medicine purchase management software",

            // Expiry and medicine control
            "medicine expiry tracking software",
            "pharmacy expiry management software",
            "drug expiry tracking software",
            "pharmacy batch tracking software",

            // Reports and business management
            "pharmacy reporting software",
            "pharmacy analytics software",
            "pharmacy financial management software",
            "pharmacy accounting software",
            "pharmacy profit tracking software",
            "pharmacy business software",

            // Multi-site / enterprise
            "multi branch pharmacy software",
            "multi branch pharmacy management system",
            "multi site pharmacy software",
            "pharmacy chain management software",
            "pharmacy ERP software",

            // General related searches
            "digital pharmacy management system",
            "pharmacy record management software",
            "pharmacy automation software",
            "pharmacy database software",
          ],
        },
    },
  },
};

export default product;
