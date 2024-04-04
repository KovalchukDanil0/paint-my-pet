import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartSection from "./AddToCartSection";
import { incrementProductQuantity } from "./actions";

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

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartSection
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
