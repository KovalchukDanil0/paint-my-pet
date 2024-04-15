"use server";

import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartSection from "./AddToCartSection";

interface Props {
  params: { id: string };
}

const getProduct = cache(async (id: string) =>
  prisma.product.findUnique({ where: { id } }).catch(() => notFound()),
);

export async function generateMetadata({
  params: { id },
}: Readonly<Props>): Promise<Metadata> {
  const product = (await getProduct(id))!;

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
