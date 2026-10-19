import type { Metadata } from "next";
import { FrenchHomePage } from "@/components/content/french-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Logiciels de gestion métier",
  "EMMAPRO Tech développe des logiciels professionnels pour les pharmacies, le commerce de détail et les élevages avicoles.",
  "/fr",
  undefined,
  "fr",
);

export default function FrenchHome() {
  return <FrenchHomePage />;
}
