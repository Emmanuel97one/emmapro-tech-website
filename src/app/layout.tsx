import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { company } from "@/data/company/company";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { metadataBase } from "@/lib/metadata";
import "./globals.css";

const siteTitle =
  `${brand.name} | Pharmacy, Poultry Farm, POS & Retail Management Software`;

const siteDescription =
  "EMMAPRO Tech provides professional business management software for pharmacies, poultry farms, retail shops, stores, and supermarkets. Explore pharmacy management, poultry farm management, POS, inventory, stock, sales, and business management solutions.";

export const metadata: Metadata = {
  ...(metadataBase && { metadataBase }),

  title: {
    default: siteTitle,
    template: `%s | ${brand.name}`,
  },

  description: siteDescription,

  applicationName: brand.name,

  authors: [
    {
      name: brand.name,
    },
  ],

  creator: brand.name,
  publisher: brand.name,

  category: "Business Software",

  keywords: [
    // Brand
    "EMMAPRO Tech",
    "EMMAPRO software",
    "business management software",

    // Pharmacy
    "pharmacy management software",
    "pharmacy management system",
    "pharmacy software",
    "pharmacy inventory software",
    "pharmacy inventory management system",
    "pharmacy stock management software",
    "pharmacy POS software",
    "pharmacy billing software",
    "pharmacy sales software",
    "pharmacy dispensing software",
    "medicine inventory software",
    "drug inventory management software",
    "pharmacy procurement software",

    // Poultry / Farm
    "poultry farm management software",
    "poultry management software",
    "poultry management system",
    "poultry farm software",
    "chicken farm management software",
    "farm management software",
    "poultry production management software",
    "poultry flock management software",
    "flock management system",
    "broiler management software",
    "layer farm management software",
    "egg production management software",
    "poultry feed management software",
    "poultry inventory software",

    // POS / Retail
    "POS software",
    "point of sale software",
    "POS system",
    "retail POS software",
    "shop POS software",
    "store POS system",
    "supermarket POS software",
    "grocery store POS software",
    "cashier software",
    "sales management software",

    // Inventory / Shop / Supermarket
    "inventory management software",
    "inventory management system",
    "stock management software",
    "stock control software",
    "retail management software",
    "retail management system",
    "shop management software",
    "store management software",
    "supermarket management software",
    "supermarket inventory software",
    "retail inventory software",
    "sales and inventory software",
    "barcode inventory software",
    "supplier management software",
  ],

  ...(brand.siteUrl && {
    alternates: {
      canonical: "/",
    },
  }),

  openGraph: {
    type: "website",
    siteName: brand.name,
    title: siteTitle,
    description: siteDescription,
    ...(brand.siteUrl && {
      url: brand.siteUrl,
    }),
  },

  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    ...(brand.siteUrl && {
      url: brand.siteUrl,
    }),
    description: siteDescription,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    ...(brand.siteUrl && {
      url: brand.siteUrl,
    }),
    description: siteDescription,
  };

  return (
    <html lang="en" data-theme="system">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(
              /</g,
              "\\u003c",
            ),
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
          <p>{company.description}</p>
        </Container>
      </body>
    </html>
  );
}