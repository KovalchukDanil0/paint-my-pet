"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { User } from "@supabase/supabase-js";
import { setCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { Button, Navbar } from "react-daisyui";
import PagesNavigation from "./PagesNavigation";

import SearchField from "./SearchField";
import ShoppingCartComponent from "./ShoppingCart";
import UserMenu from "./UserMenu";

export type ShoppingCartProps = { cart: ShoppingCart; price: string };

export type UserMenuProps = {
  user: User | null;
  userAvatar?: string;
  userName?: string;
  admin: boolean;
};

type Props = UserMenuProps & ShoppingCartProps;

export default function NavbarComponent({
  cart,
  price,
  userName,
  user,
  admin,
}: Readonly<Props>) {
  const pathname: string = usePathname();

  setCookie("localCartId", cart.id, { sameSite: "none", secure: true });

  return (
    <Navbar className="sticky top-0 z-top bg-black">
      <Navbar.Center className="flex-1">
        <Button tag="a" href="/" className="text-xl normal-case" color="ghost">
          Paint My Pet
        </Button>
      </Navbar.Center>

      <Navbar.Center className="hidden lg:flex">
        <PagesNavigation pathname={pathname} />
      </Navbar.Center>

      <Navbar.End className="flex flex-row gap-3">
        <ShoppingCartComponent cart={cart} price={price} />

        <SearchField />

        <UserMenu admin={admin} user={user} userName={userName} />
      </Navbar.End>
    </Navbar>
  );
}
