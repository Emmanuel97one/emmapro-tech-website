import type { Metadata } from "next";
import { FrenchLegalPage } from "@/components/content/french-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Conditions d’utilisation",
  "Les conditions d’utilisation du site EMMAPRO Tech sont en cours de préparation.",
  "/fr/terms",
  undefined,
  "fr",
);

export default function FrenchTerms() {
  return <FrenchLegalPage kind="terms" />;
}
