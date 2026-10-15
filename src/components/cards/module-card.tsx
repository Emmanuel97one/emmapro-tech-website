import { Layers3 } from "lucide-react";
import type { ProductModule } from "@/data/products/types";
import { ProductIcon } from "@/components/ui/product-icon";

export function ModuleCard({ module }: { module: ProductModule }) {
  return (
    <article className="module-card">
      {module.icon ? (
        <ProductIcon id={module.icon} />
      ) : (
        <Layers3 size={19} strokeWidth={1.8} aria-hidden="true" />
      )}
      <div>
        <h3>{module.name}</h3>
        <p>{module.description}</p>
        {module.capabilities?.length ? (
          <ul className="module-card__capabilities">
            {module.capabilities.map((capability) => (
              <li key={capability}>{capability}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
