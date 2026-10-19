import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productRegistry, getProductBySlug } from "@/data/products/registry";
import { createProductMetadata } from "@/lib/metadata";
import { ProductDetail } from "@/components/content/product-detail";

export const dynamicParams = false;

export function generateStaticParams() {
  return productRegistry
    .filter((product) => product.status !== "archived")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.status === "archived") notFound();

  return createProductMetadata(product);
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || product.status === "archived") notFound();

  return <ProductDetail product={product} />;
}
