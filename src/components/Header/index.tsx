"use server";

import { isAdmin } from "@/lib/admin";
import { getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { formatPrice } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import NavbarComponent from "./Navbar";

export type NavLinks = NavLink[];
export type NavLink = { active: boolean; title: string; href: string };

type Props = {
  locale: string;
};

export default async function Header({ locale }: Readonly<Props>) {
  const cart = await getCart();
  const price = String(await formatPrice(cart?.subtotal ?? 0, locale));
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const admin = await isAdmin(user);

  let userAvatar: string | undefined;
  let userName: string | undefined;

  if (user.data.user) {
    userAvatar = (
      await prisma.user.findFirst({
        where: { id: user.data.user?.id },
      })
    )?.image;

    userName = (
      await prisma.user.findFirst({
        where: { id: user.data.user?.id },
      })
    )?.name;
  }

  return (
    <NavbarComponent
      user={user.data.user}
      userAvatar={userAvatar}
      userName={userName}
      cart={cart}
      price={price}
      admin={admin}
    />
  );
}
