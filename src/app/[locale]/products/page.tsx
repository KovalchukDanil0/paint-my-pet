"use server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { isAdmin } from "@/lib/shared";
import { Button } from "flowbite-react";
import { getServerSession } from "next-auth";
import ProductsPage from "./products";

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
      <ProductsPage products={products} />
    </div>
  );
}
