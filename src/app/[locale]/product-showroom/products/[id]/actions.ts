"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(
  productId: string,
  dimension: string,
) {
  const cart = (await getCart()) ?? (await createCart());

  /*   const articleInCart = cart.items.find(
    (item) => item.productId === productId && item.size === size,
  ); */

  await prisma.cart.update({
    where: { id: cart.id },
    data: { items: { create: { productId, dimension } } },
  });

  revalidatePath("/[locale]/product-showroom/products/[id]");
}
