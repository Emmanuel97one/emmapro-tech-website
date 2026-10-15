"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { LoaderCircle, MessageCircle, Send } from "lucide-react";
import type {
  BillingPeriod,
  PricingQuantityDimension,
  PricingUnit,
} from "@/data/products/types";
import { messages } from "@/content/messages";
import { productSalesEmails } from "@/data/company/contact";
import { getGeneralWhatsAppHref, getProductSalesHref } from "@/data/company/sales-link";
import { getProducts } from "@/data/products/registry";
import { web3Forms } from "@/config/web3forms";

interface ContactProduct {
  slug: string;
  name: string;
  editions: {
    id: string;
    name: string;
    pricingOptions: {
      billingPeriod?: BillingPeriod;
      unit?: PricingUnit;
      includedQuantity?: number;
      maximumQuantity?: number | null;
      quantitySelectorMax?: number;
      additionalUnitPrice?: { amount: number; currency: string };
      quantityDimensions?: PricingQuantityDimension[];
    }[];
  }[];
}

interface ContactFormProps {
  products: ContactProduct[];
}

type FormStatus = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<
  Record<
    "name" | "email" | "product" | "quantity" | "quantityDimensions" | "message",
    string
  >
>;

interface ContactPrefill {
  productSlug: string;
  editionId: string;
  billing: BillingPeriod | "";
  quantity: string;
  quantityDimensions: Record<string, string>;
}

const registeredProducts = getProducts();
const submittedEnquiryStorageKey = "emmapro-contact-enquiry-sent";

export function ContactForm({ products }: ContactFormProps) {
  const searchParams = useSearchParams();
  const initialValues = getContactPrefill(products, searchParams);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [country, setCountry] = useState("");
  const [productSlug, setProductSlug] = useState(initialValues.productSlug);
  const [editionId, setEditionId] = useState(initialValues.editionId);
  const [billing, setBilling] = useState<BillingPeriod | "">(initialValues.billing);
  const [quantity, setQuantity] = useState(initialValues.quantity);
  const [dimensionQuantities, setDimensionQuantities] = useState(
    initialValues.quantityDimensions,
  );
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const submissionInProgress = useRef(false);
  const formNoticeRef = useRef<HTMLParagraphElement>(null);

  const product = products.find((item) => item.slug === productSlug);
  const edition = product?.editions.find((item) => item.id === editionId);
  const quantityOption = edition?.pricingOptions.find(
    (option) => option.additionalUnitPrice,
  );
  const selectedPricingOption =
    edition?.pricingOptions.find((option) => option.billingPeriod === billing) ??
    edition?.pricingOptions[0];
  const quantityDimensions = selectedPricingOption?.quantityDimensions ?? [];
  const billingOptions = Array.from(
    new Set(
      (edition?.pricingOptions ?? []).flatMap((option) =>
        option.billingPeriod ? [option.billingPeriod] : [],
      ),
    ),
  );
  const minimumQuantity = Math.max(1, quantityOption?.includedQuantity ?? 1);
  const maximumQuantity =
    quantityOption?.quantitySelectorMax ??
    quantityOption?.maximumQuantity ??
    undefined;
  const quantityWord = quantityLabel(quantityOption?.unit);
  const registeredProduct = registeredProducts.find(
    (item) => item.slug === product?.slug,
  );
  const whatsappHref = product && registeredProduct
    ? getProductSalesHref(
        registeredProduct,
        {
          editionId: edition?.id,
          editionName: edition?.name,
          quantity: quantityOption && quantity.trim()
            ? parseQuantity(quantity, minimumQuantity, maximumQuantity)
            : undefined,
          quantityDimensions: getSafeDimensionQuantities(
            quantityDimensions,
            dimensionQuantities,
          ),
          billingPeriod: billing || undefined,
          channel: "whatsapp",
        },
      )
    : getGeneralWhatsAppHref();
  const emailFallbackHref =
    product && productSalesEmails[product.slug]
      ? createEmailFallbackHref(productSalesEmails[product.slug], {
          name,
          email,
          phone,
          organization,
          country,
          product: product.name,
          edition: edition?.name,
          billing,
          quantity: quantityOption && quantity.trim() ? quantity : undefined,
          quantityDimensions: quantityDimensions.map((dimension) => ({
            label: dimension.label,
            quantity:
              getSafeDimensionQuantities(
                quantityDimensions,
                dimensionQuantities,
              )[dimension.id] ?? dimension.includedQuantity ?? 1,
          })),
          subject,
          message,
        })
      : undefined;
  const formNotice =
    status === "success"
      ? messages.contactPage.formSuccess
      : status === "error"
        ? messages.contactPage.formError
        : messages.contactPage.formIdle;

  useEffect(() => {
    let restoreConfirmationTimer: number | undefined;
    try {
      if (
        window.matchMedia("(max-width: 780px), (pointer: coarse)").matches &&
        window.sessionStorage.getItem(submittedEnquiryStorageKey) === "true"
      ) {
        restoreConfirmationTimer = window.setTimeout(
          () => setStatus("success"),
          0,
        );
      }
    } catch (error) {
      console.error("Unable to restore the contact form confirmation.", error);
    }
    return () => {
      if (restoreConfirmationTimer !== undefined) {
        window.clearTimeout(restoreConfirmationTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (
      status === "success" &&
      window.matchMedia("(max-width: 780px), (pointer: coarse)").matches
    ) {
      formNoticeRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status]);

  function changeProduct(value: string) {
    setProductSlug(value);
    const nextProduct = products.find((item) => item.slug === value);
    const nextEdition = nextProduct?.editions[0];
    setEditionId(nextEdition?.id ?? "");
    setBilling(nextEdition?.pricingOptions[0]?.billingPeriod ?? "");
    setQuantity("");
    setDimensionQuantities(
      getDimensionQuantityStrings(nextEdition?.pricingOptions[0]?.quantityDimensions),
    );
    setFieldErrors((current) => ({ ...current, product: undefined }));
  }

  function changeEdition(value: string) {
    setEditionId(value);
    const nextEdition = product?.editions.find((item) => item.id === value);
    setBilling(nextEdition?.pricingOptions[0]?.billingPeriod ?? "");
    setQuantity("");
    setDimensionQuantities(
      getDimensionQuantityStrings(nextEdition?.pricingOptions[0]?.quantityDimensions),
    );
  }

  async function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const errors: FieldErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) errors.name = messages.contactPage.required;
    else if (trimmedName.length > 100) errors.name = messages.contactPage.nameMaxLength;
    if (!trimmedEmail) errors.email = messages.contactPage.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = messages.contactPage.invalidEmail;
    }
    if (!productSlug) errors.product = messages.contactPage.required;
    if (!trimmedMessage) errors.message = messages.contactPage.required;
    else if (trimmedMessage.length > 5000) {
      errors.message = messages.contactPage.messageMaxLength;
    }
    if (quantityOption && quantity.trim()) {
      const parsed = Number(quantity);
      if (
        !Number.isInteger(parsed) ||
        parsed < minimumQuantity ||
        (maximumQuantity !== undefined && parsed > maximumQuantity)
      ) {
        errors.quantity = messages.contactPage.invalidQuantity;
      }
    }
    if (
      quantityDimensions.some((dimension) => {
        const rawValue =
          dimensionQuantities[dimension.id] ??
          String(Math.max(1, dimension.includedQuantity ?? 1));
        const parsed = Number(rawValue);
        const minimum = Math.max(1, dimension.includedQuantity ?? 1);
        const maximum =
          dimension.quantitySelectorMax ??
          dimension.maximumQuantity ??
          undefined;
        return (
          !Number.isInteger(parsed) ||
          parsed < minimum ||
          (maximum !== undefined && parsed > maximum)
        );
      })
    ) {
      errors.quantityDimensions = messages.contactPage.invalidQuantity;
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      return;
    }
    if (honeypot.trim()) return;

    submissionInProgress.current = true;
    setStatus("submitting");
    const payload = {
      access_key: web3Forms.accessKey,
      name: trimmedName,
      email: trimmedEmail,
      phone: phone.trim(),
      organization: organization.trim(),
      country: country.trim(),
      product: product?.name ?? messages.contactPage.generalEnquiry,
      edition: edition?.name ?? "",
      billing,
      quantity: quantityOption && quantity.trim() ? Number(quantity) : undefined,
      quantityDimensions: getSafeDimensionQuantities(
        quantityDimensions,
        dimensionQuantities,
      ),
      subject: subject.trim(),
      message: trimmedMessage,
      botcheck: honeypot,
    };

    try {
      const response = await fetch(web3Forms.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: unknown = await response.json();
      const succeeded =
        typeof result === "object" &&
        result !== null &&
        "success" in result &&
        result.success === true;
      if (!response.ok || !succeeded) {
        setStatus("error");
        return;
      }
      if (window.matchMedia("(max-width: 780px), (pointer: coarse)").matches) {
        try {
          window.sessionStorage.setItem(submittedEnquiryStorageKey, "true");
        } catch (error) {
          console.error("Unable to save the contact form confirmation.", error);
        }
      }
      setStatus("success");
      setFieldErrors({});
    } catch {
      setStatus("error");
    } finally {
      submissionInProgress.current = false;
    }
  }

  return (
    <section className="contact-form-wrap" id="product">
      <h2>{messages.contactPage.formTitle}</h2>
      <form
        className={`contact-form${status === "success" ? " contact-form--success" : ""}`}
        onSubmit={submitEnquiry}
        noValidate
      >
        <div className="contact-form__fields">
          <Field label={messages.contactPage.fullName} required error={fieldErrors.name}>
            <input name="name" autoComplete="name" maxLength={100} required value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? fieldErrorId(messages.contactPage.fullName) : undefined} />
          </Field>
          <Field label={messages.contactPage.email} required error={fieldErrors.email}>
            <input name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} required value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? fieldErrorId(messages.contactPage.email) : undefined} />
          </Field>
          <Field label={messages.contactPage.phone}>
            <input name="phone" type="tel" autoComplete="tel" maxLength={40} value={phone} onChange={(event) => setPhone(event.target.value)} />
          </Field>
          <Field label={messages.contactPage.organization}>
            <input name="organization" autoComplete="organization" maxLength={150} value={organization} onChange={(event) => setOrganization(event.target.value)} />
          </Field>
          <Field label={messages.contactPage.country}>
            <input name="country" autoComplete="country-name" maxLength={100} value={country} onChange={(event) => setCountry(event.target.value)} />
          </Field>
          <Field label={messages.contactPage.product} required error={fieldErrors.product}>
            <select name="product" required value={productSlug} onChange={(event) => changeProduct(event.target.value)} aria-invalid={Boolean(fieldErrors.product)} aria-describedby={fieldErrors.product ? fieldErrorId(messages.contactPage.product) : undefined}>
              <option value="">{messages.contactPage.selectProduct}</option>
              <option value="general">{messages.contactPage.generalEnquiry}</option>
              {products.map((item) => <option value={item.slug} key={item.slug}>{item.name}</option>)}
            </select>
          </Field>
          {product && (
            <>
              <Field label={messages.contactPage.edition}>
                <select name="edition" value={editionId} onChange={(event) => changeEdition(event.target.value)}>
                  <option value="">{messages.contactPage.selectEdition}</option>
                  {product.editions.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
              </Field>
              {billingOptions.length > 0 && (
                <Field label={messages.contactPage.billing}>
                  <select name="billing" value={billing} onChange={(event) => setBilling(billingOptions.find((period) => period === event.target.value) ?? "")}>
                    <option value="">{messages.contactPage.selectBilling}</option>
                    {billingOptions.map((period) => <option value={period} key={period}>{billingPeriodName(period)}</option>)}
                  </select>
                </Field>
              )}
              {quantityOption && (
                <Field label={`${messages.contactPage.quantity} (${quantityWord})`} error={fieldErrors.quantity}>
                  <input name="quantity" type="number" min={minimumQuantity} max={maximumQuantity} step={1} value={quantity} onChange={(event) => setQuantity(event.target.value)} aria-invalid={Boolean(fieldErrors.quantity)} aria-describedby={fieldErrors.quantity ? fieldErrorId(`${messages.contactPage.quantity} (${quantityWord})`) : undefined} />
                </Field>
              )}
              {quantityDimensions.map((dimension) => {
                const minimum = Math.max(1, dimension.includedQuantity ?? 1);
                const maximum =
                  dimension.quantitySelectorMax ??
                  dimension.maximumQuantity ??
                  undefined;
                const label = `${messages.contactPage.quantity} (${dimension.label})`;
                return (
                  <Field
                    key={dimension.id}
                    label={label}
                    error={fieldErrors.quantityDimensions}
                  >
                    <input
                      name={dimension.id}
                      type="number"
                      min={minimum}
                      max={maximum}
                      step={1}
                      disabled={maximum !== undefined && maximum <= minimum}
                      value={
                        dimensionQuantities[dimension.id] ?? String(minimum)
                      }
                      onChange={(event) =>
                        setDimensionQuantities((current) => ({
                          ...current,
                          [dimension.id]: event.target.value,
                        }))
                      }
                      aria-invalid={Boolean(fieldErrors.quantityDimensions)}
                      aria-describedby={
                        fieldErrors.quantityDimensions
                          ? fieldErrorId(label)
                          : undefined
                      }
                    />
                  </Field>
                );
              })}
            </>
          )}
          <Field label={messages.contactPage.subject}>
            <input name="subject" maxLength={200} value={subject} onChange={(event) => setSubject(event.target.value)} />
          </Field>
          <Field label={messages.contactPage.message} required error={fieldErrors.message} fullWidth>
            <textarea name="message" rows={5} maxLength={5000} required value={message} onChange={(event) => setMessage(event.target.value)} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? fieldErrorId(messages.contactPage.message) : undefined} />
          </Field>
        </div>
        <label className="contact-form__honeypot" aria-hidden="true">
          {messages.contactPage.honeypot}
          <input name="botcheck" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
        </label>
        <button type="submit" className="button button--primary" disabled={status === "submitting"}>
          {status === "submitting" ? <LoaderCircle size={17} className="contact-form__spinner" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
          {status === "submitting" ? messages.contactPage.submitting : messages.contactPage.send}
        </button>
        <p className="contact-form__privacy">
          {messages.contactPage.privacyNote}{" "}
          <a href="/privacy">{messages.contactPage.privacyLink}</a>
        </p>
        <p
          className="form-notice"
          ref={formNoticeRef}
          role="status"
          aria-live="polite"
        >
          {formNotice}
        </p>
        {status === "success" && (
          <button
            type="button"
            className="button button--secondary contact-form__new-enquiry"
            onClick={() => {
              try {
                window.sessionStorage.removeItem(submittedEnquiryStorageKey);
              } catch (error) {
                console.error("Unable to clear the contact form confirmation.", error);
              }
              setStatus("idle");
            }}
          >
            {messages.contactPage.sendAnotherEnquiry}
          </button>
        )}
        <div className="contact-form__fallback">
          <a className="button button--secondary contact-form__whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} aria-hidden="true" />
            {messages.contactPage.continueWhatsapp}
          </a>
          {emailFallbackHref && (
            <a className="text-link" href={emailFallbackHref}>
              {messages.contactPage.openEmailDraft}
            </a>
          )}
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  required = false,
  error,
  fullWidth = false,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  fullWidth?: boolean;
  children: ReactNode;
}) {
  const errorId = error ? fieldErrorId(label) : undefined;
  return (
    <label className={fullWidth ? "contact-form__field contact-form__field--full" : "contact-form__field"}>
      {label}{required ? " *" : ""}
      {children}
      {error && <span className="contact-form__error" id={errorId}>{error}</span>}
    </label>
  );
}

function createEmailFallbackHref(
  recipient: string,
  enquiry: {
    name: string;
    email: string;
    phone: string;
    organization: string;
    country: string;
    product: string;
    edition?: string;
    billing: BillingPeriod | "";
    quantity?: string;
    quantityDimensions?: { label: string; quantity: number }[];
    subject: string;
    message: string;
  },
): string {
  const subject = enquiry.subject.trim() || `${enquiry.product} enquiry`;
  const details = [
    `Name: ${enquiry.name.trim()}`,
    `Email: ${enquiry.email.trim()}`,
    enquiry.phone.trim() && `Phone / WhatsApp: ${enquiry.phone.trim()}`,
    enquiry.organization.trim() && `Organization: ${enquiry.organization.trim()}`,
    enquiry.country.trim() && `Country: ${enquiry.country.trim()}`,
    `Product: ${enquiry.product}`,
    enquiry.edition && `Edition: ${enquiry.edition}`,
    enquiry.billing && `Billing preference: ${billingPeriodName(enquiry.billing)}`,
    enquiry.quantity && `Quantity: ${enquiry.quantity}`,
    ...(enquiry.quantityDimensions ?? []).map(
      (dimension) => `${dimension.label}: ${dimension.quantity}`,
    ),
    "",
    enquiry.message.trim(),
  ].filter((line): line is string => Boolean(line));
  const query = new URLSearchParams({
    subject,
    body: details.join("\n"),
  });
  return `mailto:${recipient}?${query.toString()}`;
}

function getContactPrefill(
  products: ContactProduct[],
  searchParams: Pick<URLSearchParams, "get">,
): ContactPrefill {
  const requestedProduct = products.find(
    (item) => item.slug === searchParams.get("product"),
  );
  const selectedEdition =
    requestedProduct?.editions.find(
      (item) => item.id === searchParams.get("edition"),
    ) ?? requestedProduct?.editions[0];
  if (!requestedProduct || !selectedEdition) {
    return {
      productSlug: "",
      editionId: "",
      billing: "",
      quantity: "",
      quantityDimensions: {},
    };
  }

  const requestedBilling = searchParams.get("billing");
  const billing =
    selectedEdition.pricingOptions.find(
      (option) => option.billingPeriod === requestedBilling,
    )?.billingPeriod ??
    selectedEdition.pricingOptions.find((option) => option.billingPeriod)
      ?.billingPeriod ??
    "";
  const selectedPricingOption =
    selectedEdition.pricingOptions.find(
      (option) => option.billingPeriod === billing,
    ) ?? selectedEdition.pricingOptions[0];
  const quantityOption = selectedEdition.pricingOptions.find(
    (option) => option.additionalUnitPrice,
  );
  const requestedQuantity =
    searchParams.get("quantity") ?? searchParams.get("seats");
  const quantity =
    quantityOption && requestedQuantity
      ? String(
          parseQuantity(
            requestedQuantity,
            Math.max(1, quantityOption.includedQuantity ?? 1),
            quantityOption.quantitySelectorMax ??
              quantityOption.maximumQuantity ??
              undefined,
          ),
        )
      : "";
  const quantityDimensions = Object.fromEntries(
    (selectedPricingOption?.quantityDimensions ?? []).map((dimension) => {
      const minimum = Math.max(1, dimension.includedQuantity ?? 1);
      const maximum =
        dimension.quantitySelectorMax ??
        dimension.maximumQuantity ??
        undefined;
      const requested = searchParams.get(dimension.id) ?? String(minimum);
      return [
        dimension.id,
        String(parseQuantity(requested, minimum, maximum)),
      ];
    }),
  );

  return {
    productSlug: requestedProduct.slug,
    editionId: selectedEdition.id,
    billing,
    quantity,
    quantityDimensions,
  };
}

function getDimensionQuantityStrings(
  dimensions: PricingQuantityDimension[] | undefined,
): Record<string, string> {
  return Object.fromEntries(
    (dimensions ?? []).map((dimension) => [
      dimension.id,
      String(Math.max(1, dimension.includedQuantity ?? 1)),
    ]),
  );
}

function getSafeDimensionQuantities(
  dimensions: PricingQuantityDimension[],
  requested: Record<string, string>,
): Record<string, number> {
  return Object.fromEntries(
    dimensions.map((dimension) => {
      const minimum = Math.max(1, dimension.includedQuantity ?? 1);
      const maximum =
        dimension.quantitySelectorMax ??
        dimension.maximumQuantity ??
        undefined;
      const value = requested[dimension.id] ?? String(minimum);
      return [dimension.id, parseQuantity(value, minimum, maximum)];
    }),
  );
}

function fieldErrorId(label: string): string {
  return `${label.replace(/\W+/g, "-").toLowerCase()}-error`;
}

function quantityLabel(unit?: PricingUnit): string {
  if (unit === "user") return messages.commercial.seats.toLowerCase();
  if (unit === "workstation") return "workstations";
  if (unit === "device") return "devices";
  if (unit === "branch") return "branches";
  if (unit === "site") return "sites";
  if (unit === "server") return "servers";
  if (unit === "custom") return "units";
  return "licenses";
}

function parseQuantity(value: string, minimum: number, maximum?: number): number {
  const number = Number(value);
  if (!Number.isInteger(number)) return minimum;
  return Math.max(minimum, maximum === undefined ? number : Math.min(number, maximum));
}

function billingPeriodName(period: BillingPeriod): string {
  return messages.productPage.billingPeriods[period];
}
