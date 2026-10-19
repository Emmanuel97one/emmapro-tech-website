import Link from "next/link";
import Image from "next/image";

export function BrandMark({
  href = "/",
  ariaLabel = "EMMAPRO Tech home",
}: {
  href?: string;
  ariaLabel?: string;
} = {}) {
  return (
    <Link
      className="brand-mark"
      href={href}
      aria-label={ariaLabel}
    >
      <Image
        className="brand-mark__image"
        src="/brand/emmapro-tech-logo.png"
        alt=""
        width={768}
        height={768}
        loading="eager"
      />
    </Link>
  );
}
