"use server";

import { isAdmin } from "lib/admin";
import { prisma } from "lib/db/prisma";
import { createClient } from "lib/supabase/server";
import ProductsPage from "./client";

export default async function ProductShowroom() {
  const { auth } = createClient();

  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });
  const {
    data: { user },
  } = await auth.getUser();
  const admin = await isAdmin(user);

  return <ProductsPage products={products} admin={admin} />;
}
