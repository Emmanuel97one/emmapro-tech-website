import type { Product } from "@/data/products/types";
import { emmaproPharmaFeatures } from "./features";
import { emmaproPharmaModules } from "./modules";
import { emmaproPharmaPricing } from "./pricing";
import { emmaproPharmaLicensing } from "./licensing";
import { emmaproPharmaFaqs } from "./faq";

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
        title: "EMMAPRO PHARMA | Pharmacy Management Software",
        description:
          "Explore EMMAPRO PHARMA pharmacy management software for dispensing, procurement, stock control and pharmacy operations, with edition-based reporting and multi-site capabilities.",
        keywords: ["pharmacy management software", "pharmacy inventory software", "pharmacy management system", "pharmacy stock management"],
      },
    },
  },
};

export default product;
