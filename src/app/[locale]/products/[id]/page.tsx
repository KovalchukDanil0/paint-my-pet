"use server";

import { getIndexOfLocale, Locale } from "@/i18n/routing";
import { Product } from "@prisma/client";
import { prisma } from "lib/db/prisma";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartSection from "./client";
import NoProductFound from "./NoProductFound";

interface Props {
  params: { id: string };
}

const getProduct = cache(
  (id: string): Promise<Product> =>
    prisma.product
      .findFirstOrThrow({
        where: { id },
      })
      .catch(() => notFound()),
);

export async function generateMetadata({ params: { id } }: Readonly<Props>) {
  const {
    name: nameArray,
    description: descriptionArray,
    imageUrl,
  } = await getProduct(id);
  const locale = await getLocale();

  const name = nameArray[getIndexOfLocale(locale as Locale)];
  const description = descriptionArray[getIndexOfLocale(locale as Locale)];

  return {
    title: name,
    openGraph: {
      title: name,
      images: [{ url: imageUrl }],
      description,
    },
    description,
  };
}

export default async function ProductPage({ params: { id } }: Readonly<Props>) {
  const product = await getProduct(id);
  if (!product) {
    return <NoProductFound />;
  }

  return <AddToCartSection product={product} />;
}
