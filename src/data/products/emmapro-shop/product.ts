import type { Product } from "@/data/products/types";
import { emmaproShopFeatures } from "./features";
import { emmaproShopModules } from "./modules";
import { emmaproShopPricing } from "./pricing";
import { emmaproShopLicensing } from "./licensing";
import { emmaproShopFaqs } from "./faq";
import { frenchProductTranslations } from "@/content/products/fr";

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
    fr: frenchProductTranslations["emmapro-shop"],
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
          title: "POS, Retail & Inventory Management Software | EMMAPRO SHOP",
          description:
            "EMMAPRO SHOP is POS, retail and inventory management software for shops, stores and supermarkets, with sales, stock control, barcode, cashier, purchasing and business reporting tools.",
          keywords: [
             // Core POS
            "POS software",
            "POS system",
            "point of sale software",
            "point of sale system",
            "business POS software",
            "sales POS software",
            "POS management system",
            "POS billing software",

            // Retail
            "retail management software",
            "retail management system",
            "retail software",
            "retail POS software",
            "retail POS system",
            "retail business software",
            "retail store management software",
            "retail sales management software",
            "retail inventory software",
            "retail inventory management system",

            // Inventory
            "inventory management software",
            "inventory management system",
            "inventory software",
            "inventory tracking software",
            "inventory control software",
            "business inventory software",
            "product inventory software",
            "inventory and sales software",
            "sales and inventory software",
            "sales and inventory management system",

            // Stock
            "stock management software",
            "stock management system",
            "stock control software",
            "stock control system",
            "stock tracking software",
            "product stock management software",
            "store stock management software",
            "retail stock management software",
            "low stock tracking software",

          // Shop
            "shop management software",
            "shop management system",
            "shop software",
            "shop POS software",
            "shop POS system",
            "shop inventory software",
            "shop inventory management system",
            "shop billing software",
            "shop sales software",
            "shop stock management software",

            // Store
            "store management software",
            "store management system",
            "store POS software",
            "store POS system",
            "store inventory software",
            "store inventory management system",
            "store stock management software",
            "store sales management software",

             // Supermarket
            "supermarket management software",
            "supermarket management system",
            "supermarket POS software",
            "supermarket POS system",
            "supermarket inventory software",
            "supermarket inventory management system",
            "supermarket stock management software",
            "supermarket billing software",
            "supermarket sales software",
            "supermarket software",

           // Grocery
           "grocery store POS software",
           "grocery store POS system",
           "grocery store management software",
           "grocery inventory software",
           "grocery store inventory management system",

            // Cashier and checkout
            "cashier software",
            "cashier POS system",
            "checkout software",
            "retail checkout software",
            "store cashier software",
            "supermarket cashier software",

            // Barcode
            "barcode POS software",
            "barcode inventory software",
            "barcode inventory management system",
            "barcode stock management software",
            "barcode sales software",
            "barcode retail software",

           // Sales and billing
            "sales management software",
            "sales management system",
            "billing software",
            "retail billing software",
            "store billing software",
            "sales tracking software",
            "daily sales tracking software",

           // Purchasing and suppliers
            "purchase management software",
            "purchasing software",
            "supplier management software",
            "purchase and inventory software",
            "supplier and inventory management system",

           // Business reporting
            "retail reporting software",
            "POS reporting software",
            "sales reporting software",
            "inventory reporting software",
            "retail analytics software",

            // Multi-user / multi-store
            "multi user POS software",
            "multi terminal POS software",
            "multi store management software",
            "multi store POS software",
            "multi store inventory management software",
          ],
        },
    },
  },
};

export default product;
