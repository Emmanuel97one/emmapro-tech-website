import type { ProductFaq } from "@/data/products/types";

export const emmaproPharmaFaqs: ProductFaq[] = [
  { id: "client-pc-capacity", question: "How many client PCs are included?", answer: "Pro includes 1 client PC, Pro-Plus allows up to 2, Pro Max allows up to 5, and Ultra allows unlimited client PCs. The Server/Main Pharmacy PC is included and is not counted as a client PC.", category: "Licensing", displayOrder: 1 },
  { id: "edition-features", question: "How do the PHARMA editions differ?", answer: "Pro includes dispensing, procurement and stock control. Pro-Plus adds global dashboard, multi-site synchronization, saved reports, email configuration and data migration. Pro Max adds credit recovery. Ultra adds inventory declaration and insurance capabilities.", category: "Editions", displayOrder: 2 },
  { id: "subscription-options", question: "Which payment terms are available?", answer: "Each edition lists monthly, annual and one-time license pricing. One-time licensing covers continued use of the licensed software version under its terms; optional future services, upgrades or support may be priced separately.", category: "Pricing", displayOrder: 3 },
  { id: "multi-site-pricing", question: "How is multi-site pricing calculated?", answer: "The listed edition price covers one pharmacy site. Each additional site is charged at the same selected-edition price for the chosen billing term. The site calculator supports up to 50 sites; client-PC capacity remains governed by the selected edition.", category: "Pricing", displayOrder: 4 },
];
