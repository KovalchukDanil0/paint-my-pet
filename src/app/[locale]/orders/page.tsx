"use server";

import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { Prisma, Product } from "@prisma/client";
import { UserResponse } from "@supabase/supabase-js";
import axios from "axios";
import { redirect } from "next/navigation";
import OrdersPageClient from "./orders";

const supabaseImagesFolder = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/`;

async function getUserImage(userId: string) {
  const userImage = `${supabaseImagesFolder}${userId}/user.png`;

  const imageRequest = await axios
    .request({
      url: userImage,
    })
    .catch(() => null);

  return imageRequest?.status === 200
    ? userImage
    : `${supabaseImagesFolder}user.png`;
}

export type ProductKeyType = {
  [key: string]: {
    userImage: string;
    products: Product[];
  };
};

export default async function OrdersPageServer() {
  const supabase = createClient();
  const currentUser: UserResponse = await supabase.auth.getUser();

  if (currentUser.error || !currentUser.data.user) {
    throw new Error(currentUser.error?.message ?? "user is undefined");
  }

  const ifAdmin = await isAdmin(currentUser.data.user);
  if (!ifAdmin) {
    redirect("/auth");
  }

  const orders: Prisma.OrderUncheckedCreateInput[] =
    await prisma.order.findMany();

  const products: ProductKeyType = Object.fromEntries(
    await Promise.all(
      orders.map(async (order) => [
        order.id,
        {
          userImage: await getUserImage(order.userId),
          products: await Promise.all(
            (order.productIds as string[]).map((productId) =>
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
