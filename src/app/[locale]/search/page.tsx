"use server";

import ProductCard from "@/components/ProductCard";
import { prisma } from "lib/db/prisma";

type Props = { searchParams: { query: string } };

export async function generateMetadata({
  searchParams: { query },
}: Readonly<Props>) {
  const title = `Search: ${query}`;
  const description = "This is a search page";

  return { title, description, openGraph: { title, description } };
}

export default async function SearchPage({
  searchParams: { query },
}: Readonly<Props>) {
  const hasSome = query.toLowerCase().split(" ");
  const products = await prisma.product.findMany({
    where: {
      OR: [{ name: { hasSome } }, { description: { hasSome } }],
    },
    orderBy: { id: "desc" },
  });
  // TODO: fix searching in array

  if (products.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
