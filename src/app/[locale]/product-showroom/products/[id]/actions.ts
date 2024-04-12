"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { Dimensions } from "@/lib/shared";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(
  productId: string,
  dimension: Dimensions,
) {
  const cart = (await getCart()) ?? (await createCart());

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: {
        create: {
          productId,
          dimension: dimension.toString(),
          additionalPrice: 0,
        },
      },
    },
  });

  revalidatePath("/[locale]/product-showroom/products/[id]");
}
