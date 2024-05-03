"use server";

import { prisma } from "@/lib/db/prisma";
import { isEmpty } from "@/lib/shared";
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
  const product: Product = (await getProduct(id))!;

  if (!isEmpty(product)) {
    product.name = "Not Found";
    product.description = "Not Found";
    product.imageUrl = "/not-found.png";
    console.log(product);
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
  const product = (await getProduct(id))!;

  return <AddToCartSection product={product} />;
}
