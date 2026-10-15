import type { Product } from "@/data/products/types";
import { emmaproShopFeatures } from "./features";
import { emmaproShopModules } from "./modules";
import { emmaproShopPricing } from "./pricing";
import { emmaproShopLicensing } from "./licensing";
import { emmaproShopFaqs } from "./faq";

const product: Product = {
  id: "emmapro-shop",
  slug: "emmapro-shop",
  status: "active",
  availability: "available",
  theme: { primary: "#3e7650", soft: "#e8f2e9", foreground: "#ffffff" },
  logoPath: "/products/emmapro-shop/emmapro-shop-logo.png",
  openGraphImagePath: "/products/emmapro-shop/emmapro-shop-logo.png",
  icon: "shopping-basket",
  displayOrder: 20,
  featured: true,
  translations: {
    en: {
      productName: "EMMAPRO SHOP",
      shortName: "SHOP",
      solutionCategory: "POS, Retail & Inventory Management System",
      tagline: "A clearer way to manage retail operations.",
      shortDescription:
        "A professional point-of-sale, retail and inventory management system for shops, retail stores, supermarkets and growing businesses.",
      overview:
        "EMMAPRO SHOP brings point-of-sale and retail management into a product designed for shops, retail stores, supermarkets and growing businesses. Its commercial information currently confirms sales operations, inventory visibility, retail administration, reporting and licensed user or workstation operation. Edition-specific feature differences should be confirmed with sales.",
      importance: {
        purpose:
          "Support retail teams as they coordinate sales activity, inventory visibility and day-to-day administration.",
        problems: [
          "Growing retail operations need a consistent view of sales and inventory activity.",
          "Retail administration and reporting become harder to coordinate across users and workstations.",
        ],
        businessValue:
          "Bring core retail operating needs into one product and scale licensed seats independently from the edition selection.",
        operationalBenefits: [
          "Support point-of-sale and sales operations.",
          "Keep inventory visibility within the retail workflow.",
          "Choose a seat-based license quantity for eligible users or workstations.",
          "Access email reporting where enabled by the applicable license.",
        ],
        targetIndustries: ["Retail", "Grocery and supermarket retail"],
        targetOrganizations: ["Retail stores", "Shops", "Supermarkets", "Growing retail businesses"],
        targetUsers: ["Retail owners", "Store managers", "Retail staff"],
        useCases: ["Point-of-sale operations", "Retail inventory visibility", "Multi-user or workstation operation where licensed"],
      },
      features: emmaproShopFeatures,
      modules: emmaproShopModules,
      editions: emmaproShopPricing,
      licensing: emmaproShopLicensing,
      faqs: emmaproShopFaqs,
      roi: {
        locationLabel: "Stores",
        operationalUnitLabel: "Operational units per store",
        staffLabel: "Employees per unit",
        workloadLabel: "Administrative hours per employee per week",
        exampleTimeReductionPercent: 10,
      },
      ctas: [
        { action: "contact-sales", label: "WhatsApp SHOP sales", channel: "whatsapp" },
        { action: "view-pricing", label: "Calculate seat pricing", href: "#pricing" },
      ],
      seo: {
        title: "EMMAPRO SHOP | POS and Retail Management Software",
        description:
          "Discover EMMAPRO SHOP POS and retail management software for sales operations, inventory visibility, shop administration and seat-based licensing.",
        keywords: ["POS software", "retail management software", "inventory management system", "shop management software", "supermarket POS software"],
      },
    },
  },
};

export default product;
