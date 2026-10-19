import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { metadataBase } from "@/lib/metadata";
import "../globals.css";

const title = "EMMAPRO Tech | Applications et logiciels sur mesure";
const description =
  "EMMAPRO Tech conçoit des applications web, des applications de bureau et des systèmes logiciels sur mesure, ainsi que des logiciels de pharmacie, d’aviculture et de commerce.";

export const metadata: Metadata = {
  ...(metadataBase && { metadataBase }),
  title: {
    default: title,
    template: `%s | ${brand.name}`,
  },
  description,
  applicationName: brand.name,
  alternates: {
    canonical: "/fr",
    languages: {
      en: "/",
      fr: "/fr",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: brand.name,
    title,
    description,
    ...(brand.siteUrl && { url: new URL("/fr", brand.siteUrl).toString() }),
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FrenchRootLayout({
  children,
}: LayoutProps<"/fr">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    ...(brand.siteUrl && { url: brand.siteUrl }),
    description:
      "EMMAPRO Tech conçoit des applications web, des applications de bureau et des systèmes logiciels sur mesure, ainsi que des logiciels de pharmacie, d’aviculture et de commerce.",
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    ...(brand.siteUrl && { url: brand.siteUrl }),
    description,
    inLanguage: "fr",
  };

  return (
    <html lang="fr" data-theme="system">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <Container className="site-disclaimer">
          <p>
            EMMAPRO Tech conçoit des applications web, des applications de
            bureau et des systèmes logiciels sur mesure, ainsi que des logiciels
            de pharmacie, d’aviculture et de commerce.
          </p>
        </Container>
      </body>
    </html>
  );
}
