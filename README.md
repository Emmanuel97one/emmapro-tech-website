# EMMAPRO Tech public website

This repository contains the public corporate and marketing website for
EMMAPRO Tech. It does not contain source code for commercial products.

## Local development and validation

```bash
npm install
npm run dev
npm run lint
npm run build
```

The production build exports static files to `out/`, suitable for static
hosting. There is no database, authentication, customer portal, or application
backend API. The contact form submits directly to Web3Forms using the public
client-side access key in `src/config/web3forms.ts`. Web3Forms handles message
delivery and its own data processing; WhatsApp remains available as an
alternative contact method.

## Project structure

- `src/app/` — App Router pages, dynamic product route, metadata, sitemap, and
  robots output.
- `src/components/layout/` — shared header, navigation, and footer.
- `src/components/ui/` — reusable design-system primitives.
- `src/components/cards/` — reusable product, feature, module, and commercial
  information cards.
- `src/components/content/` — product page sections and gallery.
- `src/data/products/types.ts` — typed product and localized content schema.
- `src/data/products/registry.ts` — central list, ordering, and lookup helpers.
- `src/data/products/<product-id>/product.ts` — product record, positioning,
  calls to action, ROI labels, and product SEO.
- `src/data/products/<product-id>/features.ts` and `modules.ts` — product
  capability and module content.
- `src/data/products/<product-id>/editions.ts` and `pricing.ts` — edition
  entitlements, capacity limits, and product-specific commercial pricing.
- `src/data/products/<product-id>/licensing.ts` and `faq.ts` — customer-facing
  license guidance and product-specific answers.
- `src/data/company/` — company identity, contact details, and social links.
- `src/content/messages/` — shared interface translations.
- `src/config/` — branding, theme, and navigation settings.
- `src/lib/metadata.ts` — metadata and software-product structured-data helpers.
- `src/lib/pricing/` — reusable price calculations shared by pricing and ROI UI.
- `public/` — brand and product asset directories.

## Adding a product

1. Create `src/data/products/<product-id>/product.ts`, following the existing
   product records and the `Product` type. Use a stable unique `id` and
   lowercase URL-safe `slug`; set a unique `displayOrder`, approved product
   theme colors, icon, status, and availability.
2. Add the record to `productRegistry` in
   `src/data/products/registry.ts`. This registry drives product lists,
   homepage cards, navigation, contact choices, sitemap entries, and the
   `/products/<slug>` static route.
3. Add product assets under `public/products/<slug>/`:
   - approved product marks, referenced by the record's `logoPath`.
   - `hero/` — approved product hero artwork.
   - `screenshots/` — approved application screenshots and thumbnails.
   Use descriptive filenames, accurate alt text, and paths beginning with
   `/products/<slug>/`. Do not add stock or fabricated product imagery.
4. Add only approved information. Set `featured` deliberately; use
   `status: "archived"` to remove a product from public listings and generated
   routes while keeping its record available for maintenance.
5. Run lint and the production build. Check the product list, navigation,
   contact choices, sitemap, and generated product route.

## Editing product content

Each product owns its translated content under `translations`, with commercial
data split into files in its product directory. Update only that product:

- `overview` and `importance` describe the product, context, business value,
  audiences, and use cases.
- `features` and `modules` have stable IDs and display order. Modules can
  reference feature IDs and edition IDs.
- `screenshots` list only real, approved images. Supply a useful `alt` string;
  optionally provide a smaller `thumbnailPath` so gallery cards never need to
  load the full-resolution image before a visitor opens its preview.
- `editions.ts` defines product-specific included/excluded features, modules,
  limits, availability, and edition descriptions. `pricing.ts` defines prices
  independently for each billing period and product. Quantity-based prices keep
  the selected edition's listed price for the first unit; the price of each
  additional seat or site uses a 47.5% volume discount. That shared marginal
  discount is derived by linear regression from the supplied reference totals
  of $500, $899, and $1,025 for one, two, and three units, then scaled to each
  edition's listed additional-unit price. SHOP seat and PHARMA/AVIDATA site
  calculations use the same rule; reusable calculations live in
  `src/lib/pricing/calculate-product-price.ts`.
- `licensing`, `requirements`, and `faqs` are product-specific. Edition
  licensing overrides are optional.
- `ctas` describe product actions and can supply an explicit `href`. Pricing,
  licensing, requirements, and commercial copy must not be inferred from
  another product.

Use empty arrays or objects for details not yet supplied. Do not create sample
prices, licensing terms, compatibility claims, modules, screenshots, customer
quotes, or availability promises. System requirements and real application
screenshots remain omitted until confirmed and supplied.

## Company, contact, and social configuration

Edit `src/data/company/company.ts`, `contact.ts`, and `social.ts` when official
company information is approved. Unknown contact channels remain `null`; do
not replace them with invented addresses. Set `NEXT_PUBLIC_SITE_URL` to the
real canonical site origin before publication. Canonical metadata and absolute
sitemap URLs remain unset without it.

The Web3Forms endpoint and public access key are centralized in
`src/config/web3forms.ts`. The access key is intentionally included in the
client-side website configuration, as Web3Forms public access keys are designed
for browser submissions.

## Languages and themes

English is the default supported locale. Product translations live alongside
each product in `translations`; shared interface strings live in
`src/content/messages/<locale>.ts`. To add a language, add its typed message
catalog, add complete product translations (English is the explicit fallback
for untranslated fields), then expose the locale through the language selector.
Do not use browser machine translation as the content source.

Theme tokens support light and dark presentation through the `data-theme`
attribute and system preference. The approved EMMAPRO Tech PNG logo is
encapsulated by the shared brand component, so the header and footer can be
updated without changing their layout.
