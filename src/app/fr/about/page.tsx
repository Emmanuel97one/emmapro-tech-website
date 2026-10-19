import type { Metadata } from "next";
import { FrenchAboutPage } from "@/components/content/french-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "À propos",
  "Découvrez EMMAPRO Tech et ses solutions logicielles pour la pharmacie, le commerce de détail et l’aviculture.",
  "/fr/about",
  undefined,
  "fr",
);

export default function FrenchAbout() {
  return <FrenchAboutPage />;
}
