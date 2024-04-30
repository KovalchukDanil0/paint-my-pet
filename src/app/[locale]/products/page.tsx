"use server";

import ProductCard from "@/components/ProductCard";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { isAdmin } from "@/lib/shared";
import { Button } from "flowbite-react";
import { getServerSession } from "next-auth";

export default async function ProductShowroom() {
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  const session = await getServerSession(authOptions);

  return (
    <div>
      {isAdmin(session!) && (
        <div className="flex h-24 items-center justify-center">
          <Button href="products/add-product">Add product page</Button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <ProductCard className="col-span-3" product={products[0]}></ProductCard>
        {products.slice(1).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
