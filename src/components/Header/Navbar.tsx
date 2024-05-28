"use client";

import { ShoppingCart } from "@/lib/db/cart";
import { User } from "@supabase/supabase-js";
import { setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  Dropdown,
  Form,
  Indicator,
  Input,
  Menu,
  Navbar,
} from "react-daisyui";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { searchProducts } from "./SearchProducts";

type Props = {
  cart: ShoppingCart;
  price: string;
  user: User;
  userAvatar: string | undefined;
  userName: string | undefined;
  admin: boolean;
};

type NavLink = { disabled: boolean; title: string; href: string }[];

export default function NavbarComponent({
  cart,
  price,
  userAvatar,
  userName,
  user,
  admin,
}: Readonly<Props>) {
  const t = useTranslations("Header");
  const pathname: string = usePathname();
  const router = useRouter();

  function SignOut() {
    router.push("/auth/sign-out");
    router.refresh();
  }

  const itemsCount: number = cart?.items.length ?? 0;

  setCookie("localCartId", cart.id, { sameSite: "none", secure: true });

  // cache
  const navLink: NavLink = [
    { disabled: true, title: t("Home"), href: "/" },
    {
      disabled: true,
      title: t("Blogs"),
      href: "/blog",
    },
    {
      disabled: true,
      title: t("About"),
      href: "/about",
    },
  ];

  return (
    <Navbar className="sticky top-0">
      <Navbar.Center className="flex-1">
        <Button tag="a" href="/" className="text-xl normal-case" color="ghost">
          Paint My Pet
        </Button>
      </Navbar.Center>

      <Navbar.Center className="hidden lg:flex">
        <Menu horizontal className="px-1">
          {navLink.map((link, index) => {
            const regexCheckLink = new RegExp(
              `^\/\\w\\w${index === 0 ? "$" : link.href}`,
            );
            // TODO: add pagination with locale support
            if (!regexCheckLink.test(pathname)) {
              link.disabled = false;
            }

            return (
              <Menu.Item disabled={link.disabled} key={link.title}>
                <Link
                  className={
                    link.disabled ? "pointer-events-none cursor-default" : ""
                  }
                  href={link.href}
                >
                  {link.title}
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Navbar.Center>

      <Navbar.End>
        <Dropdown end>
          <Button tag="label" tabIndex={0} color="ghost" shape="circle">
            <Indicator>
              <Badge size="sm" className={Indicator.Item.className()}>
                {itemsCount}
              </Badge>
              <FaShoppingCart />
            </Indicator>
          </Button>
          <Dropdown.Menu className="card card-compact z-[1] mt-3 w-52 !p-0">
            <Card.Body>
              <span className="text-lg font-bold">{itemsCount} Items</span>
              <span className="text-info">Subtotal: {price}</span>
              <Card.Actions>
                <Button tag="a" href="/cart" color="primary" fullWidth>
                  View cart
                </Button>
              </Card.Actions>
            </Card.Body>
          </Dropdown.Menu>
        </Dropdown>
        <Form action={searchProducts} className="">
          <Input
            bordered
            name="searchQuery"
            type="text"
            placeholder="Search"
            className="w-24 md:w-auto"
          />
        </Form>
        <Dropdown end>
          <Button
            tag="label"
            tabIndex={0}
            color="ghost"
            className="avatar"
            shape="circle"
          >
            <FaRegUserCircle
              className={twMerge(
                admin ? "outline-dotted outline-yellow-300" : "",
                "size-8",
              )}
            />
          </Button>
          <Dropdown.Menu className="menu-sm z-[1] mt-3 w-52 p-2">
            {user != null && (
              <Dropdown.Item>
                <span className="block text-sm">{userName}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Item>
            )}
            <li>
              <Link href="" className="justify-between">
                Profile
                <Badge>New</Badge>
              </Link>
            </li>
            {user != null ? (
              <Dropdown.Item onClick={SignOut}>Sign out</Dropdown.Item>
            ) : (
              <Dropdown.Item onClick={() => router.push("/auth/login")}>
                Sign in
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.End>
    </Navbar>
  );
}
