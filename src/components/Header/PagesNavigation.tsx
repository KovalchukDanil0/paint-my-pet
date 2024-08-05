"use client";

import { useTranslations } from "next-intl";
import { Link, Menu } from "react-daisyui";
import { RealPathnameProps } from "./Navbar";

type NavLink = { disabled: boolean; title: string; href: string }[];

export default function PagesNavigation({
  realPathname,
}: Readonly<RealPathnameProps>) {
  const t = useTranslations("Header");

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
    <Menu horizontal className="px-1">
      {navLink.map((link, index) => {
        const condition = index === 0 ? "" : link.href;
        if (realPathname !== condition) {
          link.disabled = false;
        }

        return (
          <Menu.Item disabled={link.disabled} key={link.title}>
            <Link
              className={link.disabled ? "pointer-events-none" : ""}
              href={link.href}
            >
              {link.title}
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
