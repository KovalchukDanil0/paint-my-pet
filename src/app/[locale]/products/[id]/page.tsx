"use server";

import { prisma } from "@/lib/db/prisma";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartSection from "./AddToCartSection";
import NoProductFound from "./NoProductFound";

interface Props {
  params: { id: string };
}

const getProduct = cache(
  async (id: string): Promise<Product | null> =>
    prisma.product.findUnique({ where: { id } }).catch(() => notFound()),
);

export async function generateMetadata({ params: { id } }: Readonly<Props>) {
  const product: Omit<
    Product,
    "createdAt" | "id" | "price" | "tag" | "updatedAt"
  > = (await getProduct(id)) ?? {
    name: "No product found",
    description: "We are sorry, no product found",
    imageUrl: "",
  };

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
    return <NoProductFound />;
  }

  return <AddToCartSection product={product} />;
}
