export type NavigationLabel =
  | "home"
  | "products"
  | "about"
  | "support"
  | "contact";

export const primaryNavigation = [
  { label: "home", href: "/" },
  { label: "products", href: "/products" },
  { label: "about", href: "/about" },
  { label: "support", href: "/support" },
  { label: "contact", href: "/contact" },
] as const satisfies { label: NavigationLabel; href: string }[];

export const legalNavigation = [
  { label: "privacy", href: "/privacy" },
  { label: "terms", href: "/terms" },
] as const;
