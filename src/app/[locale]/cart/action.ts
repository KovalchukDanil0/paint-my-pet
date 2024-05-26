"use server";

import { ShoppingCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function deleteItemFromCart(productId: string) {
  const cart: ShoppingCart = await getCart();

  const articleInCart = cart.items.find(
    (item) => item.productId === productId,
  )!;

  await prisma.cart.update({
    where: { id: cart.id },
    data: { items: { delete: { id: articleInCart.id } } },
  });

  refreshPage();
}

export async function setProductDimension(
  productId: string,
  dimension: string,
) {
  const cart: ShoppingCart = await getCart();

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: { dimension },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: { create: { productId, dimension } },
      },
    });
  }

  refreshPage();
}

function refreshPage() {
  revalidatePath("/[locale]/cart", "page");
}
