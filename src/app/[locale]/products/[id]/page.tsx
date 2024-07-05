"use server";

import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartSection from "./AddToCartSection";

interface Props {
  params: { id: string };
}

const getProduct = cache(
  async (id: string): Promise<Product | null> =>
    prisma.product.findUnique({ where: { id } }).catch(() => notFound()),
);

export async function generateMetadata({
  params: { id },
}: Readonly<Props>): Promise<Metadata> {
  const product: Product | null = await getProduct(id);
  if (!product) {
    throw new Error("No products found");
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({ params: { id } }: Readonly<Props>) {
  const product: Product | null = await getProduct(id);
  if (!product) {
    throw new Error("No products found");
  }

  return <AddToCartSection product={product} />;
}
