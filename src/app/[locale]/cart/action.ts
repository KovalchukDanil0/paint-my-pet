"use server";

import { Prisma } from "@prisma/client";
import { ShoppingCart, getCart } from "lib/db/cart";
import { prisma } from "lib/db/prisma";
import { createClient } from "lib/supabase/server";
import { revalidatePath } from "next/cache";
import { join } from "path";

export async function deleteItemFromCart(productId: string) {
  const { items, id } = await getCart();

  const articleInCart = items.find((item) => item.productId === productId);
  if (!articleInCart) {
    throw new Error("item in cart wasn't found");
  }

  await prisma.cart.update({
    where: { id },
    data: { items: { delete: { id: articleInCart.id } } },
  });

  refreshPage();
}

export async function setProductDimension(
  productId: string,
  dimension: string,
) {
  const { items, id }: ShoppingCart = await getCart();

  const articleInCart = items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cart.update({
      where: { id },
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
      where: { id },
      data: {
        items: { create: { productId, dimension } },
      },
    });
  }

  refreshPage();
}

export async function fillTheForm(formData: FormData) {
  const { items } = await getCart();

  const { auth, storage } = createClient();
  const {
    data: { user },
  } = await auth.getUser();
  if (!user?.id) {
    throw new Error("User not logged in");
  }

  //#region Handle Image Upload

  const fileInput = formData.get("file-input") as File;

  const path = join(user.id, fileInput.name);

  const { data: storageUpload, error } = await storage
    .from("images")
    .upload(path, fileInput, { upsert: true });
  if (error || !storageUpload) {
    throw new Error(error.message);
  }

  const imagePath = storageUpload.fullPath;

  //#endregion

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
    productIds: items.map((item) => item.productId),
    userId: user.id,
    imagePath,
  };

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      throw new Error(`Form field ${key} wasn't specified`);
    }
  }

  await prisma.order.create({
    data: { ...data },
  });
}

function refreshPage() {
  revalidatePath("/[locale]/cart", "page");
}
