import type { ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";

export function ContentPage({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb: BreadcrumbItem[];
  children: ReactNode;
}) {
  return (
    <>
      <section className="page-hero">
        <Container>
          <Breadcrumb items={breadcrumb} />
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero__description">{description}</p>
        </Container>
      </section>
      <section className="content-section">
        <Container className="content-page">{children}</Container>
      </section>
    </>
  );
}
