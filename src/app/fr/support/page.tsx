import type { Metadata } from "next";
import { FrenchSupportPage } from "@/components/content/french-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Assistance produit",
  "Consultez les informations sur les produits EMMAPRO Tech ou contactez notre équipe.",
  "/fr/support",
  undefined,
  "fr",
);

export default function FrenchSupport() {
  return <FrenchSupportPage />;
}
