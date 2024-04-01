import SiteIcon from "@/app/favicon.ico";
import { authOptions } from "@/lib/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
  TextInput,
} from "flowbite-react";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import PageEntry from "./PageEntry";
import { searchProducts } from "./SearchProducts";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuAvatar from "./UserMenuAvatar";

// test

type Props = { locale: string };
export type NavLinks = NavLink[];
export type NavLink = { active: boolean; title: string; href: string };

export default async function Header({ locale }: Readonly<Props>) {
  const session = await getServerSession(authOptions);

  const t: Function = await getTranslations("Header");

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
    <Navbar fluid className="sticky top-0 z-50">
      <NavbarBrand as={Link} href="/">
        <Image
          width={40}
          height={512}
          src={SiteIcon}
          className="mr-3 h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Paint My Pet
        </span>
      </NavbarBrand>
      <div className="flex gap-3 md:order-2">
        <ShoppingCartButton />
        <form action={searchProducts}>
          <TextInput
            name="searchQuery"
            placeholder="Search"
            className="w-full min-w-24"
          />
        </form>
        <UserMenuAvatar locale={locale} session={session} />

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
