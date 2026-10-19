import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import type { Product } from "@/data/products/types";
import { company } from "@/data/company/company";
import { companyContact, productSalesEmails } from "@/data/company/contact";
import { getGeneralWhatsAppHref } from "@/data/company/sales-link";
import { getProductThemeStyle, getProductTranslation, getProducts } from "@/data/products/registry";
import { createProductJsonLd } from "@/lib/metadata";
import { FeatureCard } from "@/components/cards/feature-card";
import { FaqList } from "@/components/content/faq-list";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductLogo } from "@/components/ui/product-logo";
import { SectionHeading } from "@/components/ui/section-heading";

const products = getProducts();

export function FrenchHomePage() {
  return (
    <>
      <section className="home-hero">
        <Container className="home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow"><span className="eyebrow__dot" /> Société de développement logiciel</p>
            <h1>Des logiciels pour<br /><span>les activités</span> qui comptent.</h1>
            <p className="home-hero__lead">
              Nous réalisons des applications web, des applications de bureau
              et des systèmes logiciels selon les besoins de nos clients.
              Découvrez également nos logiciels de pharmacie, de commerce et
              de gestion avicole.
            </p>
            <div className="home-hero__actions">
              <Button href="/fr/products">Découvrir nos produits <ArrowRight size={17} aria-hidden="true" /></Button>
              <Link href="/fr/about" className="text-link">À propos d’EMMAPRO Tech <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
            <div className="home-hero__note"><ArrowRight size={18} aria-hidden="true" /><span>Des logiciels sur mesure et trois produits dédiés.</span></div>
          </div>
          <div className="portfolio-panel">
            <div className="portfolio-panel__top"><div><span className="eyebrow">EMMAPRO Tech</span><p>Nos produits</p></div></div>
            <div className="portfolio-panel__list">
              {products.map((product) => {
                const copy = getProductTranslation(product, "fr");
                return (
                  <Link className="portfolio-row" href={`/fr/products/${product.slug}`} key={product.slug} style={getProductThemeStyle(product)}>
                    {product.logoPath && <ProductLogo src={product.logoPath} alt={`Logo ${copy.productName}`} className="portfolio-row__logo" />}
                    <span className="portfolio-row__text"><strong>{copy.productName}</strong><span>{copy.solutionCategory}</span></span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
            <div className="portfolio-panel__bottom"><span>Pharmacie · Commerce de détail · Aviculture</span></div>
          </div>
        </Container>
      </section>
      <section className="content-section home-intro">
        <Container className="home-intro__grid">
          <SectionHeading eyebrow="EMMAPRO Tech" title="Des logiciels conçus pour des opérations spécialisées." />
          <div className="home-intro__content">
            <p>{company.name} réalise des applications web, des applications de bureau et des systèmes logiciels adaptés aux besoins des clients, en plus de ses produits pour les pharmacies, les commerces et les élevages avicoles.</p>
            <Link href="/fr/about" className="text-link">En savoir plus sur EMMAPRO Tech <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>
      <section className="content-section">
        <Container className="split-section">
          <SectionHeading
            eyebrow="Développement logiciel sur mesure"
            title="Applications web, applications de bureau et systèmes conçus selon vos besoins."
          />
          <div>
            <p className="prose-lead">
              Vous avez un projet en tête ? EMMAPRO Tech réalise des
              applications web, des applications de bureau et des systèmes
              logiciels selon vos besoins. Présentez-nous votre idée et les
              fonctionnalités souhaitées pour en discuter avec notre équipe.
            </p>
            <Link href="/fr/contact" className="text-link">
              Parler de votre projet <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
      <FrenchProductsSection />
      <section className="content-section">
        <Container>
          <SectionHeading eyebrow="Nos domaines" title="Des outils adaptés à votre activité." description="Choisissez une solution et consultez ses fonctionnalités et limites d’édition." />
          <div className="site-principles-grid">
            <article><h3>Gestion de pharmacie</h3><p>Dispensation, approvisionnement et gestion du stock pharmaceutique.</p></article>
            <article><h3>Caisse et commerce</h3><p>Opérations de point de vente, visibilité sur les stocks et rapports d’activité.</p></article>
            <article><h3>Gestion avicole</h3><p>Suivi des bandes, de la production, de la santé et des performances d’élevage.</p></article>
          </div>
        </Container>
      </section>
      <FrenchCallToAction />
    </>
  );
}

export function FrenchProductsPage() {
  return (
    <>
      <section className="page-hero"><Container><p className="eyebrow">EMMAPRO Tech</p><h1>Des logiciels pour les métiers du quotidien.</h1><p className="page-hero__description">Découvrez les solutions EMMAPRO Tech pour la pharmacie, le commerce de détail et la gestion de ferme avicole. Chaque fiche détaille les fonctions publiées et les éditions disponibles.</p></Container></section>
      <FrenchProductsSection />
      <FrenchCallToAction />
    </>
  );
}

function FrenchProductsSection() {
  return (
    <section className="content-section content-section--soft">
      <Container>
        <SectionHeading eyebrow="Notre portefeuille" title="Choisissez la solution adaptée à votre activité." description="Consultez l’aperçu, les fonctions, les éditions et les informations commerciales de chaque produit." />
        <div className="product-grid">
          {products.map((product, index) => {
            const copy = getProductTranslation(product, "fr");
            return (
              <article className="product-card" key={product.slug} style={getProductThemeStyle(product)}>
                <div className="product-card__top">
                  {product.logoPath && <ProductLogo src={product.logoPath} alt={`Logo ${copy.productName}`} className="product-card__logo" />}
                  <span className="product-card__index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="product-card__category">{copy.solutionCategory}</p>
                <h3>{copy.productName}</h3>
                <p className="product-card__description">{copy.shortDescription}</p>
                <Link className="text-link" href={`/fr/products/${product.slug}`}>Découvrir le produit <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function FrenchAboutPage() {
  return (
    <FrenchContentPage eyebrow="À propos d’EMMAPRO Tech" title="Des logiciels sur mesure et des produits spécialisés." description="EMMAPRO Tech conçoit des applications web, des applications de bureau et des systèmes logiciels sur mesure, ainsi que des produits pour la pharmacie, le commerce et l’aviculture.">
      <article className="content-note">
        <h2>Développement de logiciels selon vos besoins</h2>
        <p>EMMAPRO Tech réalise des applications web, des applications de bureau et des systèmes logiciels selon les exigences de chaque projet. Contactez notre équipe pour présenter votre besoin et discuter des fonctionnalités souhaitées.</p>
        <p>Nous développons également EMMAPRO PHARMA, EMMAPRO SHOP et AVIDATA PRO. Les fonctionnalités et capacités publiées de ces produits sont détaillées sur leurs pages respectives.</p>
      </article>
      <article className="content-note">
        <h2>Votre projet logiciel</h2>
        <p>Que vous ayez besoin d’une application web, d’une application de bureau ou d’un système métier, décrivez-nous votre projet pour que nous puissions en discuter.</p>
        <Link href="/fr/contact" className="text-link">Parler de votre projet</Link>
      </article>
      <FrenchProductsSection />
    </FrenchContentPage>
  );
}

export function FrenchSupportPage() {
  return (
    <FrenchContentPage eyebrow="Assistance" title="Informations et assistance produit." description="Sélectionnez un produit pour consulter les informations disponibles ou contactez notre équipe pour une question sur le produit ou sa licence.">
      <div className="support-intro"><MessageCircle size={23} aria-hidden="true" /><p>Les canaux, le périmètre de service et les horaires d’assistance n’ont pas encore été publiés. Consultez la fiche du produit ou <Link href="/fr/contact">contactez notre équipe</Link>.</p></div>
      <div className="support-product-list">{products.map((product) => {
        const copy = getProductTranslation(product, "fr");
        return <Link href={`/fr/products/${product.slug}`} className="support-product" key={product.slug}><span><strong>{copy.productName}</strong><span>{copy.solutionCategory}</span></span><ArrowUpRight size={19} aria-hidden="true" /></Link>;
      })}</div>
    </FrenchContentPage>
  );
}

export function FrenchContactPage() {
  return (
    <FrenchContentPage eyebrow="Contact" title="Parlons de votre projet." description="Contactez-nous au sujet d’une application web, d’une application de bureau, d’un système sur mesure ou de l’un de nos produits.">
      <div className="contact-page">
        <section className="contact-info">
          <h2>Contacter l’équipe</h2>
          <p>Présentez-nous votre projet logiciel ou précisez le produit qui vous intéresse.</p>
          <div className="contact-info__methods">
            <a href={`tel:${companyContact.phone}`}><Phone size={17} aria-hidden="true" />{companyContact.phoneDisplay}</a>
            <a href={getGeneralWhatsAppHref()} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" />{companyContact.whatsappDisplay} · WhatsApp</a>
          </div>
          <h3>Équipe commerciale par produit</h3>
          <ul className="detail-list">
            {products.map((product: Product) => {
              const email = productSalesEmails[product.slug];
              return email ? <li key={product.slug}><a href={`mailto:${email}?subject=${encodeURIComponent(`Demande ${getProductTranslation(product, "fr").productName}`)}`}>{getProductTranslation(product, "fr").productName} — {email}</a></li> : <li key={product.slug}>{getProductTranslation(product, "fr").productName} — contactez-nous par téléphone ou WhatsApp</li>;
            })}
          </ul>
        </section>
        <section className="content-note">
          <h2>Nos produits logiciels</h2>
          <p>Consultez les fonctionnalités et les détails de licence de nos produits dédiés.</p>
          <div className="support-product-list">{products.map((product) => <Link className="support-product" href={`/fr/products/${product.slug}`} key={product.slug}><span><strong>{getProductTranslation(product, "fr").productName}</strong><span>{getProductTranslation(product, "fr").solutionCategory}</span></span><ArrowUpRight size={18} aria-hidden="true" /></Link>)}</div>
        </section>
      </div>
    </FrenchContentPage>
  );
}

export function FrenchLegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const privacy = kind === "privacy";
  const title = privacy ? "Politique de confidentialité" : "Conditions d’utilisation";
  return (
    <FrenchContentPage eyebrow="Informations légales" title={title} description={privacy ? "La politique de confidentialité du site EMMAPRO Tech est en cours de préparation." : "Les conditions d’utilisation du site EMMAPRO Tech sont en cours de préparation."}>
      <article className="content-note">
        <p className="legal-status">{privacy ? "Politique en préparation" : "Conditions en préparation"}</p>
        <h2>{privacy ? "Les informations de confidentialité sont en cours de finalisation." : "Les conditions du site sont en cours de finalisation."}</h2>
        <p>{privacy ? "Cette page ne constitue pas encore une politique de confidentialité approuvée. Une déclaration complète sur le traitement des informations du site sera publiée après examen par l’entreprise." : "Cette page ne constitue pas encore un ensemble de conditions approuvées. Les conditions applicables au site seront publiées après examen par l’entreprise."}</p>
        <p>Pour toute question, veuillez <Link href="/fr/contact">contacter EMMAPRO Tech</Link>.</p>
      </article>
    </FrenchContentPage>
  );
}

function FrenchContentPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <>
      <section className="page-hero"><Container><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-hero__description">{description}</p></Container></section>
      <section className="content-section"><Container className="content-page">{children}</Container></section>
    </>
  );
}

function FrenchCallToAction() {
  return <section className="cta-section"><Container><div className="cta-section__content"><p className="eyebrow">EMMAPRO Tech</p><h2>Besoin d’informations sur un produit ?</h2><p>Notre équipe peut vous renseigner sur les fonctionnalités et les éditions disponibles.</p><Button href="/fr/contact">Nous contacter <ArrowRight size={17} aria-hidden="true" /></Button></div></Container></section>;
}

export function FrenchProductDetail({ product }: { product: Product }) {
  const copy = getProductTranslation(product, "fr");
  const commercialCopy = getProductTranslation(product, "en");
  const structuredData = createProductJsonLd(product, "fr");
  const features = [...copy.features].sort((a, b) => a.displayOrder - b.displayOrder);
  const editions = [...copy.editions].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="product-page" style={getProductThemeStyle(product)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="product-hero">
        <Container>
          <div className="product-hero__content">
            <div>
              <div className="product-hero__identity"><p>{copy.solutionCategory}</p></div>
              <h1>{copy.productName}</h1>
              <p className="product-hero__lead">{copy.tagline}</p>
              <p className="product-hero__description">{copy.shortDescription}</p>
              <div className="product-hero__actions"><Button href="/fr/contact">{copy.ctas[0]?.label ?? "Nous contacter"} <ArrowRight size={17} aria-hidden="true" /></Button><a className="text-link" href="#editions">Voir les éditions</a></div>
            </div>
            <div className="product-hero__panel">
              {product.logoPath && <ProductLogo src={product.logoPath} alt={`Logo ${copy.productName}`} className="product-hero__logo" />}
              <p className="eyebrow">Un produit d’EMMAPRO Tech</p><p className="product-hero__panel-title">{copy.productName}</p><p>{copy.solutionCategory}</p><span className="product-hero__panel-rule" /><span className="product-hero__panel-foot">{copy.shortDescription}</span>
            </div>
          </div>
        </Container>
      </section>
      <section className="content-section" id="overview"><Container className="split-section"><SectionHeading eyebrow="Présentation" title={copy.productName} /><p className="prose-lead">{copy.overview}</p></Container></section>
      <section className="content-section content-section--soft"><Container><SectionHeading eyebrow="Pourquoi ce logiciel ?" title="Une gestion adaptée aux opérations métier." /><div className="product-info-grid"><InfoBlock title="Pour qui ?" items={copy.importance.targetOrganizations} /><InfoBlock title="Cas d’utilisation" items={copy.importance.useCases} /><InfoBlock title="Bénéfices opérationnels" items={copy.importance.operationalBenefits} /></div></Container></section>
      <section className="content-section"><Container><SectionHeading eyebrow="Fonctionnalités" title={`Fonctions de ${copy.productName}`} description="Les capacités dépendent parfois de l’édition sélectionnée." /><div className="feature-grid">{features.map((feature) => <FeatureCard feature={feature} key={feature.id} />)}</div></Container></section>
      <section className="content-section content-section--soft" id="editions"><Container><SectionHeading eyebrow="Éditions et tarifs" title="Choisissez l’édition adaptée à votre activité." description="Les tarifs, capacités et limites de licence varient selon l’édition." /><div className="edition-grid">{editions.map((edition) => {
        const commercialEdition = commercialCopy.editions.find((item) => item.id === edition.id);
        const pricingOptions = [...(commercialEdition?.pricingOptions ?? [])].sort((a, b) => a.displayOrder - b.displayOrder);
        return <article className="edition-card" key={edition.id}><div className="edition-card__heading"><p className="eyebrow">Édition</p>{edition.recommended && <span className="edition-card__badge">Recommandée</span>}</div><h3>{edition.name}</h3><p>{edition.description}</p>{edition.bestFor && <p><strong>Adaptée à :</strong> {edition.bestFor}</p>}{pricingOptions.length > 0 && <><h4>Tarifs indicatifs</h4><ul className="detail-list">{pricingOptions.map((option) => <li key={option.id}><strong>{billingPeriodLabel(option.billingPeriod)} : {option.amount ? formatPrice(option.amount) : "Sur demande"}</strong>{option.additionalUnitPrice && <span> · {formatPrice(option.additionalUnitPrice)} par poste supplémentaire</span>}{option.quantityDimensions?.map((dimension) => dimension.additionalUnitPrice && <span key={dimension.id}> · {formatPrice(dimension.additionalUnitPrice)} par site supplémentaire</span>)}</li>)}</ul></>}</article>;
      })}</div><div className="content-note"><h3>Conditions de licence</h3><p>Les tarifs sont indiqués en dollars américains (USD). Les modalités de renouvellement des abonnements mensuels et annuels sont confirmées avec l’équipe commerciale. Une licence à paiement unique permet l’utilisation continue de la version sous licence selon les conditions applicables; les services, mises à niveau ou prestations d’assistance futurs peuvent être facturés séparément.</p><p>Pour confirmer les capacités, les options de licence et les disponibilités applicables à votre organisation, contactez notre équipe.</p></div></Container></section>
      <section className="content-section"><Container><SectionHeading eyebrow="Questions fréquentes" title="Questions et réponses" /><FaqList items={copy.faqs} /></Container></section>
      <FrenchCallToAction />
    </div>
  );
}

function billingPeriodLabel(period: string | undefined): string {
  if (period === "monthly") return "Par mois";
  if (period === "annual") return "Par an";
  if (period === "quarterly") return "Par trimestre";
  if (period === "semiannual") return "Tous les six mois";
  if (period === "one-time") return "Paiement unique";
  return "Tarif personnalisé";
}

function formatPrice(price: { amount: number; currency: string }): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: price.currency,
  }).format(price.amount);
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return <article className="content-note"><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}
