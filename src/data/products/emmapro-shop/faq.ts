import type { ProductFaq } from "@/data/products/types";

export const emmaproShopFaqs: ProductFaq[] = [
  { id: "shop-editions", question: "Which EMMAPRO SHOP editions are available?", answer: "The available editions are Pro and Pro-Plus. Seat quantity is selected separately and does not create a different edition.", category: "Editions", displayOrder: 1 },
  { id: "shop-seat-pricing", question: "How is the SHOP seat price calculated?", answer: "The total is the one-seat base price plus the additional-seat price multiplied by the number of seats above one. The calculator updates the estimate when you change the edition, billing term or seat quantity.", category: "Pricing", displayOrder: 2 },
  { id: "shop-trial", question: "Can I try EMMAPRO SHOP before purchasing?", answer: "Trial availability, if offered, is confirmed by the sales team. Contact EMMAPRO Tech for current information.", category: "Licensing", displayOrder: 3 },
  { id: "shop-email", question: "How can I ask about EMMAPRO SHOP?", answer: "Use the WhatsApp sales link or phone number shown on this page. A dedicated SHOP email address has not been supplied.", category: "Contact", displayOrder: 4 },
];
