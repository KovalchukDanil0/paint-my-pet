"use server";

import { getCart } from "lib/db/cart";
import { prisma } from "lib/db/prisma";
import { Dimensions } from "lib/shared";
import { revalidatePath } from "next/cache";

export default async function setDimension(
  productId: string,
  dimension: Dimensions,
) {
  const { id } = await getCart();

  await prisma.cart.update({
    where: { id },
    data: {
      items: {
        create: {
          productId,
          dimension: dimension.toString(),
        },
      },
    },
  });

  revalidatePath("/[locale]/product-showroom/products/[id]");
}
