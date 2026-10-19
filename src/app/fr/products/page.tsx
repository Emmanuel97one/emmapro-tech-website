import type { Metadata } from "next";
import { FrenchProductsPage } from "@/components/content/french-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Logiciels de pharmacie, commerce et aviculture",
  "Découvrez les logiciels EMMAPRO Tech de gestion de pharmacie, de point de vente et de ferme avicole.",
  "/fr/products",
  undefined,
  "fr",
);

export default function FrenchProducts() {
  return <FrenchProductsPage />;
}
