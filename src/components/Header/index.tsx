"use server";

import { isAdmin } from "lib/admin";
import { getCart } from "lib/db/cart";
import { prisma } from "lib/db/prisma";
import { formatPrice } from "lib/format";
import getRealPathname from "lib/getRealPathname";
import { createClient } from "lib/supabase/server";
import NavbarComponent from "./client";

export type NavLinks = NavLink[];
export type NavLink = { active: boolean; title: string; href: string };

type LocaleProps = {
  locale: string;
};

export default async function Header({ locale }: Readonly<LocaleProps>) {
  const cart = await getCart();
  const price = await formatPrice(cart.subtotal ?? 0, locale);
  const { auth } = createClient();

  const {
    data: { user },
  } = await auth.getUser();

  const admin = await isAdmin(user);
  const realPathname = getRealPathname();

  let userAvatar: string | undefined;
  let userName: string | undefined;

  if (user) {
    userAvatar = (
      await prisma.user.findFirst({
        where: { id: user?.id },
      })
    )?.image;

    userName = (
      await prisma.user.findFirst({
        where: { id: user?.id },
      })
    )?.name;
  }

  return (
    <NavbarComponent
      realPathname={realPathname}
      user={user}
      userAvatar={userAvatar}
      userName={userName}
      cart={cart}
      price={price}
      admin={admin}
    />
  );
}
