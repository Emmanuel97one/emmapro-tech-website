import Image from "next/image";

interface ProductLogoProps {
  src: string;
  alt: string;
  className: string;
}

export function ProductLogo({ src, alt, className }: ProductLogoProps) {
  return (
    <span className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 780px) 72px, 140px"
      />
    </span>
  );
}
