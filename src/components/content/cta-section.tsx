import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaSection({
  title = "Let’s start a conversation.",
  description = "Contact details and enquiry options will be added when the official company channels are confirmed.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="cta-section">
      <Container className="cta-section__inner">
        <div>
          <p className="eyebrow">A good place to begin</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <Button href="/contact" variant="secondary">
          View contact page <ArrowUpRight size={17} aria-hidden="true" />
        </Button>
        <MoveUpRight className="cta-section__decoration" aria-hidden="true" />
      </Container>
    </section>
  );
}
