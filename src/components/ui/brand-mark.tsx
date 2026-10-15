import Link from "next/link";
import Image from "next/image";

export function BrandMark() {
  return (
    <Link
      className="brand-mark"
      href="/"
      aria-label="EMMAPRO Tech home"
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
