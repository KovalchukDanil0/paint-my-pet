"use client";

import { useTranslations } from "next-intl";
import { Link, Menu } from "react-daisyui";
import { RealPathnameProps } from "./client";

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
      {navLink.map(({ disabled, href, title }, index) => {
        const condition = index === 0 ? "" : href;
        if (realPathname !== condition) {
          disabled = false;
        }

        return (
          <Menu.Item disabled={disabled} key={title}>
            <Link className={disabled ? "pointer-events-none" : ""} href={href}>
              {title}
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
}
