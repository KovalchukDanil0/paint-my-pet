import { Cart, CartItem, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { prisma } from "./prisma";

const cartId = "localCartId";

const include = { items: { include: { product: true } } };

export type CartWithProducts = Prisma.CartGetPayload<{
  include: typeof include;
}>;

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart> {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  let cart: CartWithProducts | null = null;

  if (data.user != null) {
    cart = await prisma.cart.findFirst({
      where: { userId: data.user.id },
      include,
    });
  } else {
    const localCartId = cookies().get(cartId)?.value;
    cart =
      localCartId != null
        ? await prisma.cart.findUnique({
            where: { id: localCartId },
            include,
          })
        : null;
  }

  if (cart == null) {
    return createCart();
  }

  return {
    ...cart,
    subtotal: cart.items.reduce((acc, item) => acc + item.product.price, 0),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const supabase = createClient();
  const user = (await supabase.auth.getUser()).data.user;

  let newCart: Cart;

  if (user != null) {
    newCart = await prisma.cart.create({ data: { userId: user.id } });
  } else {
    newCart = await prisma.cart.create({ data: {} });

    //! this part must be assigning from here, but nextjs not allowing
    //! cookies().set(cartId, newCart.id);
  }

  return { ...newCart, items: [], subtotal: 0 };
}

export async function mergeAnonymousCartIntoUserCart(userId: string) {
  const localCartId = cookies().get(cartId)?.value;
  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: true },
      })
    : null;

  if (!localCart) {
    return;
  }

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);

      await tx.cartItem.deleteMany({ where: { cartId: userCart.id } });

      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                productId: item.productId,
                dimension: item.dimension,
              })),
            },
          },
        },
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((item) => ({
                productId: item.productId,
                dimension: item.dimension,
              })),
            },
          },
        },
      });
    }

    await tx.cart.delete({ where: { id: localCart.id } });

    cookies().delete(cartId);
  });
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((item) => {
      const existingItem = acc.find((i) => i.productId === item.productId);
      if (existingItem) {
        existingItem.dimension = item.dimension;
      } else {
        acc.push(item);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
