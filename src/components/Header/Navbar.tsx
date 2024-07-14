"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { User } from "@supabase/supabase-js";
import { setCookie } from "cookies-next";
import { Button, Navbar } from "react-daisyui";
import LocaleSwitcher from "../LocaleSwitcher";
import SearchProduct from "../SearchProduct";
import PagesNavigation from "./PagesNavigation";
import ShoppingCartComponent from "./ShoppingCart";
import UserMenu from "./UserMenu";

export type RealPathnameProps = {
  realPathname: string;
};

export type ShoppingCartProps = { cart: ShoppingCart; price: string };

export type UserMenuProps = {
  user: User | null;
  userAvatar?: string;
  userName?: string;
  admin: boolean;
};

type Props = UserMenuProps & ShoppingCartProps & RealPathnameProps;

export default function NavbarComponent({
  cart,
  price,
  userName,
  user,
  admin,
  realPathname,
}: Readonly<Props>) {
  setCookie("localCartId", cart.id, { sameSite: "none", secure: true });

  return (
    <Navbar className="fixed top-0 z-top bg-slate-400 dark:bg-black">
      <Navbar.Center className="flex-1">
        <Button tag="a" href="/" className="text-xl normal-case" color="ghost">
          Paint My Pet
        </Button>
      </Navbar.Center>

      <Navbar.Center className="hidden lg:flex">
        <PagesNavigation realPathname={realPathname} />
      </Navbar.Center>

      <Navbar.End className="flex flex-row gap-3">
        <SearchProduct className="w-auto" inNavigation />
        <ShoppingCartComponent cart={cart} price={price} />
        <LocaleSwitcher />
        <UserMenu admin={admin} user={user} userName={userName} />
      </Navbar.End>
    </Navbar>
  );
}
