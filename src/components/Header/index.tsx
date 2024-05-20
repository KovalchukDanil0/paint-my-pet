"use server";

import SiteIcon from "@/app/favicon.ico";
import { getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { FormatPrice } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import PageEntry from "./PageEntry";
import { searchProducts } from "./SearchProducts";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuAvatar from "./UserMenuAvatar";

export type NavLinks = NavLink[];
export type NavLink = { active: boolean; title: string; href: string };

type Props = {
  locale: string;
};

export default async function Header({ locale }: Readonly<Props>) {
  const cart = await getCart();
  const t = await getTranslations("Header");
  const price = String(await FormatPrice(cart?.subtotal ?? 0, locale));
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  let userAvatar: string | undefined;
  if (user.data.user != null) {
    userAvatar = (
      await prisma.user.findFirst({
        where: { id: user.data.user?.id },
      })
    )?.image;
  }

  const navLink: NavLinks = [
    { active: false, title: t("Home"), href: "/" },
    {
      active: false,
      title: t("Blogs"),
      href: "/blog",
    },
    {
      active: false,
      title: t("About"),
      href: "/about",
    },
  ];

  return (
    <Navbar fluid className="sticky top-0 z-top">
      <NavbarBrand className="flex-1 md:flex-initial" as={Link} href="/">
        <Image
          width={40}
          height={40}
          src={SiteIcon}
          className="mr-3 h-9"
          alt="Flowbite React Logo"
        />
        <span className="hidden self-center whitespace-nowrap text-xl font-semibold md:inline-block dark:text-white">
          Paint My Pet
        </span>
      </NavbarBrand>
      <div className="flex flex-1 gap-3 md:order-2 md:flex-initial">
        <ShoppingCartButton cart={cart} price={price} />
        <form action={searchProducts} className="min-w-20 md:w-full">
          <TextInput name="searchQuery" placeholder="Search" />
        </form>
        <UserMenuAvatar
          user={user.data.user!}
          userAvatar={userAvatar}
          locale={locale}
        />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {navLink.map((link, index) => {
          return <PageEntry key={link.title} link={link} index={index} />;
        })}
      </NavbarCollapse>
    </Navbar>
  );
}
