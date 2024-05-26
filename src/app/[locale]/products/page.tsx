"use server";

import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import ProductsPage from "./products";

export default async function ProductShowroom() {
  const supabase = createClient();

  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  const user = await supabase.auth.getUser();
  const admin = await isAdmin(user);

  return <ProductsPage products={products} admin={admin} />;
}
