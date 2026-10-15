import { createPageMetadata } from "@/lib/metadata";
import { ContentPage } from "@/components/content/content-page";
import Link from "next/link";

export const metadata = createPageMetadata(
  "Terms & Conditions",
  "Website terms for EMMAPRO Tech are being prepared for publication.",
  "/terms",
);

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Legal information"
      title="Terms & Conditions"
      description="Website terms for EMMAPRO Tech are being prepared for publication."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Terms & Conditions" },
      ]}
    >
      <article className="content-note">
        <p className="legal-status">Terms in preparation</p>
        <h2>Website terms are being finalized.</h2>
        <p>
          This page is not yet an approved set of terms. The applicable website
          terms will be published after company review.
        </p>
        <p>
          For a question about the website in the meantime, please{" "}
          <Link href="/contact">contact EMMAPRO Tech</Link>.
        </p>
      </article>
    </ContentPage>
  );
}
