import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "../auth";
import { Dimensions } from "../shared";
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
  dimension: string;
  subtotal: number;
};

export async function getCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null = null;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include,
    });
  } else {
    const localCartId = cookies().get(cartId)?.value;
    cart = localCartId
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
    dimension: cart.items[0]?.dimension ?? Dimensions["16x20"],
    subtotal: cart.items.reduce((acc, item) => acc + item.product.price, 0),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({ data: { userId: session.user.id } });
  } else {
    newCart = await prisma.cart.create({ data: {} });

    // setCookie(cartId, newCart.id, { path: "/", cookies });
    //! this part must be assigning from here, but nextjs not allowing
  }

  return { ...newCart, items: [], dimension: "16x9", subtotal: 0 };
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
                additionalPrice: item.additionalPrice,
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
                additionalPrice: item.additionalPrice,
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
