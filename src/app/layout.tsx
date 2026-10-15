import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { company } from "@/data/company/company";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/ui/container";
import { metadataBase } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  ...(metadataBase && { metadataBase }),
  title: {
    default: `${brand.name} | Software for the work that matters`,
    template: `%s | ${brand.name}`,
  },
  description:
    company.description,
  applicationName: brand.name,
  ...(brand.siteUrl && { alternates: { canonical: "/" } }),
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: `${brand.name} | Software for the work that matters`,
    description:
      company.description,
    ...(brand.siteUrl && { url: brand.siteUrl }),
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} | Software for the work that matters`,
    description:
      company.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    ...(brand.siteUrl && { url: brand.siteUrl }),
    description: company.description,
  };

  return (
    <html lang="en" data-theme="system">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
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
