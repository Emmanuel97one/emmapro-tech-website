import type { Metadata } from "next";
import { FrenchLegalPage } from "@/components/content/french-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Politique de confidentialité",
  "La politique de confidentialité du site EMMAPRO Tech est en cours de préparation.",
  "/fr/privacy",
  undefined,
  "fr",
);

export default function FrenchPrivacy() {
  return <FrenchLegalPage kind="privacy" />;
}
