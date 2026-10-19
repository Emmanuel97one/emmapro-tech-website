"use client";

import { useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  Phone,
  Play,
  Share2,
} from "lucide-react";
import { companyContact } from "@/data/company/contact";
import { companySocial } from "@/data/company/social";
import { getMessages } from "@/content/messages";
import { getGeneralWhatsAppHref } from "@/data/company/sales-link";
import { getLocaleFromPath } from "@/lib/locale";

interface ContactProductLink {
  id: string;
  name: string;
  email?: string;
  whatsappHref: string;
}

export function ContactInformation({
  products,
}: {
  products: ContactProductLink[];
}) {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPath(pathname);
  const messages = getMessages(locale);
  return (
    <section className="contact-information" aria-labelledby="contact-methods-title">
      <h2 id="contact-methods-title">{messages.contactPage.contactMethods}</h2>
      <div className="contact-information__grid">
        <ContactCard icon={<MessageCircle size={20} aria-hidden="true" />} title={messages.contactPage.whatsappCard}>
          <p className="contact-information__value">{companyContact.whatsappDisplay}</p>
          <div className="contact-information__actions">
            <a href={getGeneralWhatsAppHref()} target="_blank" rel="noopener noreferrer">{messages.contactPage.continueWhatsapp}</a>
            <CopyButton text={companyContact.whatsapp} messages={messages} />
          </div>
        </ContactCard>
        <ContactCard
          icon={<Mail size={20} aria-hidden="true" />}
          title={messages.contactPage.customSoftware}
        >
          <p>{messages.contactPage.customSoftwareDescription}</p>
          <div className="contact-information__actions">
            <a href={getGeneralWhatsAppHref()} target="_blank" rel="noopener noreferrer">
              {messages.contactPage.continueWhatsapp}
            </a>
            <CopyButton text={companyContact.whatsapp} messages={messages} />
          </div>
        </ContactCard>
        <ContactCard icon={<Phone size={20} aria-hidden="true" />} title={messages.contactPage.phoneCard}>
          <p className="contact-information__value">{companyContact.whatsappDisplay}</p>
          <div className="contact-information__actions">
            <a href={`tel:${companyContact.phone}`}>{messages.contactPage.phoneCard}</a>
            <CopyButton text={companyContact.phone} messages={messages} />
          </div>
        </ContactCard>
        {products.map((product) => (
          <ContactCard
            icon={<Mail size={20} aria-hidden="true" />}
            title={messages.contactPage.productContact.replace("{product}", product.name)}
            key={product.id}
          >
            <p className="contact-information__value">
              {product.email ?? companyContact.whatsappDisplay}
            </p>
            <div className="contact-information__actions">
              {product.email && (
                <a href={`mailto:${product.email}`}>
                  {messages.contactPage.sendEmail}
                </a>
              )}
              <a href={product.whatsappHref} target="_blank" rel="noopener noreferrer">
                {messages.contactPage.continueWhatsapp}
              </a>
              <CopyButton
                text={product.email ?? companyContact.whatsapp}
                messages={messages}
              />
            </div>
          </ContactCard>
        ))}
        <ContactCard icon={<Share2 size={20} aria-hidden="true" />} title={messages.contactPage.social}>
          <div className="contact-information__social">
            {companySocial.facebook && (
              <a href={companySocial.facebook} target="_blank" rel="noopener noreferrer">
                <Share2 size={17} aria-hidden="true" /> {messages.commercial.facebook}
              </a>
            )}
            {companySocial.youtube && (
              <a href={companySocial.youtube} target="_blank" rel="noopener noreferrer">
                <Play size={18} aria-hidden="true" /> {messages.commercial.youtube}
              </a>
            )}
            {companySocial.linkedin && (
              <a href={companySocial.linkedin} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                  <path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
                {messages.commercial.linkedin}
              </a>
            )}
          </div>
        </ContactCard>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="contact-information__card">
      <span className="contact-information__icon">{icon}</span>
      <div className="contact-information__content">
        <h3>{title}</h3>
        {children}
      </div>
    </article>
  );
}

function CopyButton({
  text,
  messages,
}: {
  text: string;
  messages: ReturnType<typeof getMessages>;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }

  return (
    <button className="contact-information__copy" type="button" onClick={copyText}>
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      {copied ? messages.commercial.copied : messages.commercial.copy}
      <span className="visually-hidden" aria-live="polite">
        {copied
          ? messages.commercial.copied
          : copyError
            ? messages.contactPage.copyFailed
            : ""}
      </span>
    </button>
  );
}
