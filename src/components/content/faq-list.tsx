import { ChevronDown } from "lucide-react";
import type { ProductFaq } from "@/data/products/types";

export function FaqList({ items }: { items: ProductFaq[] }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details className="faq-item" key={item.id}>
          <summary>
            <span>{item.question}</span>
            <ChevronDown size={19} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
