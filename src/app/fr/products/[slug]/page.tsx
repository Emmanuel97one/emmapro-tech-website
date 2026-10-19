import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FrenchProductDetail } from "@/components/content/french-pages";
import { getProductBySlug, productRegistry } from "@/data/products/registry";
import { createFrenchProductMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return productRegistry
    .filter((product) => product.status !== "archived")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/fr/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.status === "archived") notFound();

  return createFrenchProductMetadata(product);
}

export default async function FrenchProductPage({
  params,
}: PageProps<"/fr/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.status === "archived") notFound();

  return <FrenchProductDetail product={product} />;
}
