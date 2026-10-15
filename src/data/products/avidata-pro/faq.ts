import type { ProductFaq } from "@/data/products/types";

export const avidataFaqs: ProductFaq[] = [
  { id: "avidata-limits", question: "What are the edition capacity limits?", answer: "Lite supports up to 3 batches, 1 user, 1 site and 200 MB storage. Pro supports up to 10 batches, 10 users, 1 site and 2,000 MB storage. Pro Plus provides unlimited batches, users and sites with enterprise storage.", category: "Editions", displayOrder: 1 },
  { id: "avidata-cumulative", question: "Are the AVIDATA PRO editions cumulative?", answer: "Yes. Pro includes Lite capabilities and adds advanced functions. Pro Plus includes Lite and Pro capabilities and adds enterprise and multi-farm management features.", category: "Editions", displayOrder: 2 },
  { id: "avidata-seat-pricing", question: "How is multi-site pricing calculated?", answer: "The listed price for an edition covers one farm site. Each additional site is charged at the same selected-edition price for the chosen billing term. User, batch and storage capacity remain edition entitlements.", category: "Pricing", displayOrder: 3 },
  { id: "avidata-one-time", question: "What does one-time licensing include?", answer: "One-time licensing provides continued use of the licensed software version subject to its license terms. Optional future services, upgrades or support may be priced separately.", category: "Licensing", displayOrder: 4 },
];
