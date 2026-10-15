import Link from "next/link";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company/company";
import { companyContact, productSalesEmails } from "@/data/company/contact";
import { getGeneralWhatsAppHref } from "@/data/company/sales-link";
import { companySocial } from "@/data/company/social";
import { legalNavigation, primaryNavigation } from "@/config/navigation";
import { messages } from "@/content/messages";
import { getProductTranslation, getProducts } from "@/data/products/registry";
import { BrandMark } from "@/components/ui/brand-mark";
import { Container } from "@/components/ui/container";

const products = getProducts();
const socialLinks = (["facebook", "youtube", "linkedin"] as const).flatMap((platform) => {
  const href = companySocial[platform];
  return href ? [{ platform, href }] : [];
});

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <BrandMark />
            <p>{company.description}</p>
          </div>
          <div className="site-footer__links">
            <div>
              <h2>Explore</h2>
              {primaryNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {messages.navigation[item.label]}
                </Link>
              ))}
            </div>
            <div>
              <h2>{messages.navigation.products}</h2>
              {products.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id}>
                  {getProductTranslation(product).productName}
                </Link>
              ))}
            </div>
            <div>
              <h2>{messages.navigation.pricing}</h2>
              {products.map((product) => (
                <Link
                  href={`/products/${product.slug}#pricing`}
                  key={`pricing-${product.id}`}
                >
                  {getProductTranslation(product).productName}
                </Link>
              ))}
            </div>
            <div>
              <h2>Information</h2>
              {legalNavigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {messages.navigation[item.label]}
                </Link>
              ))}
              <Link href="/contact">
                Get in touch <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="site-footer__contact">
            <p className="eyebrow">Have a question?</p>
            <Link href="/contact" className="site-footer__contact-link">
              Contact information <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <div className="site-footer__quick-contacts">
              <a href={`tel:${companyContact.phone}`}>
                <Phone size={15} aria-hidden="true" />
                {companyContact.phoneDisplay}
              </a>
              <a href={getGeneralWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15} aria-hidden="true" />
                WhatsApp
              </a>
              {products
                .filter((product) => productSalesEmails[product.slug])
                .map((product) => (
                  <a
                    href={`mailto:${productSalesEmails[product.slug]}`}
                    key={`email-${product.id}`}
                  >
                    {getProductTranslation(product).productName}
                  </a>
                ))}
            </div>
            {socialLinks.length > 0 && (
              <nav
                className="site-footer__social"
                aria-label="Follow EMMAPRO Tech"
              >
                {socialLinks.map(({ platform, href }) => (
                  <a
                    href={href}
                    key={platform}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon platform={platform} />
                    <span>
                      {platform === "youtube"
                        ? "YouTube channel"
                        : platform === "linkedin"
                          ? messages.commercial.linkedin
                          : messages.commercial.facebook}
                    </span>
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {company.copyrightName}. All rights
            reserved.
          </p>
          <p>Built with care for the work that matters.</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({
  platform,
}: {
  platform: "facebook" | "youtube" | "linkedin";
}) {
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 21v-7.1h2.4l.36-2.78H13.5V9.34c0-.8.22-1.35 1.38-1.35h1.48V5.5c-.26-.04-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.78v1.95H8.02v2.78h2.47V21h3z" />
      </svg>
    );
  }

  if (platform === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.54 3.56 12 3.56 12 3.56s-7.54 0-9.4.52A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.86.52 9.4.52 9.4.52s7.54 0 9.4-.52a3 3 0 0 0 2.1-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.55 15.6V8.4L15.8 12l-6.25 3.6Z" />
    </svg>
  );
}
