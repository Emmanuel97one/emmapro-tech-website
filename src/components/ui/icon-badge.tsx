import type { LucideIcon } from "lucide-react";
import type { ProductIconId } from "@/data/products/types";
import { ProductIcon } from "@/components/ui/product-icon";

export function IconBadge({
  icon: Icon,
  productIcon,
  className = "",
}: {
  icon?: LucideIcon;
  productIcon?: ProductIconId;
  className?: string;
}) {
  return (
    <span className={`icon-badge ${className}`.trim()} aria-hidden="true">
      {productIcon ? <ProductIcon id={productIcon} /> : Icon && <Icon size={22} strokeWidth={1.8} />}
    </span>
  );
}
