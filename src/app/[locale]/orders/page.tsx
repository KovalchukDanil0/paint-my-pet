"use server";

import { redirect } from "@/i18n/routing";
import { Prisma, Product } from "@prisma/client";
import { UserResponse } from "@supabase/supabase-js";
import axios from "axios";
import { isAdmin } from "lib/admin";
import { prisma } from "lib/db/prisma";
import { createClient } from "lib/supabase/server";
import { join } from "path";
import OrdersPageClient from "./client";

const supabaseImagesFolder = join(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  "storage",
  "v1",
  "object",
  "public",
  "images",
);

async function getUserImage(userId: string) {
  const userImage = join(supabaseImagesFolder, userId, "user.png");

  const { status } = await axios
    .request({
      url: userImage,
    })
    .catch((error) => {
      console.error(userImage, error);
      return { status: null };
    });

  return status === 200 ? userImage : join(supabaseImagesFolder, "user.png");
}

export type ProductKeyType = {
  [key: string]: {
    userImage: string;
    products: Product[];
  };
};

export default async function OrdersPageServer() {
  const { auth } = createClient();
  const {
    data: { user },
    error,
  }: UserResponse = await auth.getUser();

  if (error || !user) {
    throw new Error(error?.message ?? "user is undefined");
  }

  const ifAdmin = await isAdmin(user);
  if (!ifAdmin) {
    redirect("/auth");
  }

  const orders: Prisma.OrderUncheckedCreateInput[] =
    await prisma.order.findMany();

  const products: ProductKeyType = Object.fromEntries(
    await Promise.all(
      orders.map(async ({ id, userId, productIds }) => [
        id,
        {
          userImage: await getUserImage(userId),
          products: await Promise.all(
            (productIds as string[]).map((productId) =>
              prisma.product.findUnique({
                where: { id: productId },
              }),
            ),
          ),
        },
      ]),
    ),
  );

  return <OrdersPageClient orders={orders} products={products} />;
}
