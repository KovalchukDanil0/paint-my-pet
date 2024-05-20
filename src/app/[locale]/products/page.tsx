"use server";

import { prisma } from "@/lib/db/prisma";
import { isAdmin } from "@/lib/shared";
import { createClient } from "@/lib/supabase/server";
import { Button } from "flowbite-react";
import ProductsPage from "./products";

export default async function ProductShowroom() {
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  return (
    <div>
      {isAdmin(user) && (
        <div className="flex h-24 items-center justify-center">
          <Button href="products/add-product">Add product page</Button>
        </div>
      )}
      <ProductsPage products={products} />
    </div>
  );
}
