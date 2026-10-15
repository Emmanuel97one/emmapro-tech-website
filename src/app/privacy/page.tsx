import { createPageMetadata } from "@/lib/metadata";
import { ContentPage } from "@/components/content/content-page";
import Link from "next/link";

export const metadata = createPageMetadata(
  "Privacy Policy",
  "The EMMAPRO Tech website privacy policy is being prepared for publication.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Legal information"
      title="Privacy Policy"
      description="The EMMAPRO Tech website privacy policy is being prepared for publication."
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "Privacy Policy" },
      ]}
    >
      <article className="content-note">
        <p className="legal-status">Privacy policy in preparation</p>
        <h2>Privacy information is being finalized.</h2>
        <p>
          This page is not yet an approved privacy policy. A complete statement
          about how information is handled on this website will be published
          after company review.
        </p>
        <p>
          For a privacy-related enquiry in the meantime, please{" "}
          <Link href="/contact">contact EMMAPRO Tech</Link>.
        </p>
      </article>
    </ContentPage>
  );
}
