import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary" | "text";
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`button button--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}
