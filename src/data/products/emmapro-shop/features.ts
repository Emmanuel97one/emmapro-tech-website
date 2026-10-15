import type { ProductFeature } from "@/data/products/types";

export const emmaproShopFeatures: ProductFeature[] = [
  { id: "sales-operations", name: "Sales operations", shortDescription: "Support point-of-sale and day-to-day retail sales activity.", category: "Retail operations", displayOrder: 1, featured: true },
  { id: "inventory-visibility", name: "Inventory visibility", shortDescription: "Keep inventory information visible as part of retail operations.", category: "Inventory", displayOrder: 2, featured: true },
  { id: "retail-administration", name: "Retail administration", shortDescription: "Support the administration needs of shops and retail businesses.", category: "Administration", displayOrder: 3, featured: true },
  { id: "business-reporting", name: "Reporting", shortDescription: "Review retail and business reporting.", category: "Reporting", displayOrder: 4, featured: true },
  { id: "scheduled-email-reports", name: "Scheduled email reports", shortDescription: "Schedule reports to be sent by email daily, weekly, or monthly.", icon: "mail", category: "Reporting", displayOrder: 5, featured: true },
  { id: "audit-trail", name: "Audit trail", shortDescription: "Review recorded audit activity.", icon: "shield-check", category: "Audit", displayOrder: 6, featured: true },
  { id: "transaction-audit", name: "Transaction audit", shortDescription: "Review audit records for transactions.", icon: "clipboard-check", category: "Audit", displayOrder: 7, featured: true },
  { id: "licensed-workstations", name: "Licensed users and workstations", shortDescription: "Support multi-user or workstation operations according to the purchased license.", category: "Licensing", displayOrder: 9, featured: true },
  { id: "email-reporting", name: "Email reporting where enabled", shortDescription: "Email reporting capability where enabled by the applicable license.", category: "Reporting", displayOrder: 8 },
];
