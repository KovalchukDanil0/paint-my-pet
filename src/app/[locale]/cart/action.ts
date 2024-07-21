"use server";

import { ShoppingCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteItemFromCart(productId: string) {
  const cart: ShoppingCart = await getCart();

  const articleInCart = cart.items.find((item) => item.productId === productId);
  if (!articleInCart) {
    throw new Error("item in cart wasn't found");
  }

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

export async function fillTheForm(formData: FormData) {
  const cart = await getCart();

  const supabase = createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) {
    throw new Error("User not logged in");
  }

  const data: Prisma.OrderUncheckedCreateInput = {
    nameFirst: formData.get("name-first") as string,
    nameLast: formData.get("name-last") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    addressCity: formData.get("address-city") as string,
    addressState: formData.get("address-state") as string,
    addressPostal: formData.get("address-postal") as string,
    addressCountry: formData.get("address-country") as string,
    productIds: cart.items.map((item) => item.productId),
    userId,
  };

  await prisma.order.create({
    data: { ...data },
  });
}

function refreshPage() {
  revalidatePath("/[locale]/cart", "page");
}
