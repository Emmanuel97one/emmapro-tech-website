import type { Metadata } from "next";
import { FrenchContactPage } from "@/components/content/french-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Contacter EMMAPRO Tech",
  "Contactez EMMAPRO Tech au sujet de ses logiciels de pharmacie, de commerce et de gestion avicole.",
  "/fr/contact",
  undefined,
  "fr",
);

export default function FrenchContact() {
  return <FrenchContactPage />;
}
