import { Sparkles, type LucideIcon } from "lucide-react";
import type { ProductFeature } from "@/data/products/types";
import { IconBadge } from "@/components/ui/icon-badge";

export function FeatureCard({
  feature,
  icon,
}: {
  feature: ProductFeature;
  icon?: LucideIcon;
}) {
  return (
    <article className="feature-card">
      <IconBadge
        icon={feature.icon ? undefined : (icon ?? Sparkles)}
        productIcon={feature.icon}
      />
      <h3>{feature.name}</h3>
      <p>{feature.description ?? feature.shortDescription}</p>
    </article>
  );
}
