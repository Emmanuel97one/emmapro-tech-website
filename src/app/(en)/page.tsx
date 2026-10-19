import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { getProductThemeStyle, getProductTranslation, getProducts } from "@/data/products/registry";
import { company } from "@/data/company/company";
import { createPageMetadata } from "@/lib/metadata";
import { CtaSection } from "@/components/content/cta-section";
import { ProductCard } from "@/components/cards/product-card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductLogo } from "@/components/ui/product-logo";
import { IconBadge } from "@/components/ui/icon-badge";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = createPageMetadata(
  "Software for the work that matters",
  company.description,
  "/",
);

const products = getProducts({ featuredOnly: true });

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <Container className="home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow">
              <span className="eyebrow__dot" /> Software development company
            </p>
            <h1>
              Software for
              <br />
              {" "}<span>the work</span> that matters.
            </h1>
            <p className="home-hero__lead">
              We build web applications, desktop applications, and software
              systems to meet client requirements. Explore our own software for
              pharmacy management, retail operations, and poultry farms too.
            </p>
            <div className="home-hero__actions">
              <Button href="/products">
                Explore our products <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <Link href="/about" className="text-link">
                Get to know us <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className="home-hero__note">
              <ArrowDownRight size={18} aria-hidden="true" />
              <span>Custom software services and three featured products.</span>
            </div>
          </div>
          <div className="portfolio-panel">
            <div className="portfolio-panel__top">
              <div>
                <span className="eyebrow">EMMAPRO Tech portfolio</span>
                <p>Our products</p>
              </div>
              <Image
                className="portfolio-panel__logo"
                src="/brand/emmapro-tech-logo.png"
                alt="EMMAPRO Tech"
                width={768}
                height={768}
                loading="eager"
              />
            </div>
            <div className="portfolio-panel__list">
              {products.map((product) => {
                const copy = getProductTranslation(product);
                return (
                  <Link
                    key={product.slug}
                    className="portfolio-row"
                    href={`/products/${product.slug}`}
                    style={getProductThemeStyle(product)}
                  >
                    {product.logoPath ? (
                      <ProductLogo
                        src={product.logoPath}
                        alt={`${copy.productName} logo`}
                        className="portfolio-row__logo"
                      />
                    ) : (
                      <IconBadge productIcon={product.icon} />
                    )}
                    <span className="portfolio-row__text">
                      <strong>{copy.productName}</strong>
                      <span>{copy.solutionCategory}</span>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
            <div className="portfolio-panel__bottom">
              <CheckCircle2 size={17} aria-hidden="true" />
              <span>Explore pharmacy, retail, and poultry software</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="content-section home-intro">
        <Container className="home-intro__grid">
          <SectionHeading
            eyebrow="EMMAPRO Tech"
            title="A software company with a specialized product portfolio."
          />
          <div className="home-intro__content">
            <p>
              {company.description} Our team can discuss a software project
              based on your requirements, as well as questions about our
              products.
            </p>
            <Link href="/about" className="text-link">
              More about EMMAPRO Tech <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="content-section">
        <Container className="split-section">
          <SectionHeading
            eyebrow="Custom software services"
            title="Web apps, desktop apps, and systems built to your requirements."
          />
          <div>
            <p className="prose-lead">
              Have a project in mind? EMMAPRO Tech builds custom web
              applications, desktop applications, and software systems based on
              your needs. Tell us what you want to build and our team can discuss
              the requirements with you.
            </p>
            <Link href="/contact" className="text-link">
              Discuss a custom software project <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="content-section content-section--soft">
        <Container>
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Our products"
              title="Software for distinct day-to-day operations."
              description="Explore the current portfolio. Features, editions, licensing, and pricing are presented separately for each product."
            />
            <Link className="text-link section-heading-row__link" href="/products">
              View all products <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.slug} />
            ))}
          </div>
        </Container>
      </section>

      <section className="content-section">
        <Container>
          <SectionHeading
            eyebrow="Explore EMMAPRO Tech"
            title="Start with the work you need to manage."
            description="Choose a product to see its published features, modules, editions, licensing information, requirements, and pricing."
          />
          <div className="site-principles-grid">
            <article><h3>Pharmacy management</h3><p>Explore EMMAPRO PHARMA for pharmacy operations and edition-specific details.</p></article>
            <article><h3>Point of sale and retail</h3><p>Explore EMMAPRO SHOP for point of sale and retail management information.</p></article>
            <article><h3>Poultry farm management</h3><p>Explore AVIDATA PRO for poultry management features and edition information.</p></article>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
