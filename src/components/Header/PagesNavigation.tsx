"use client";

import { useTranslations } from "next-intl";
import { Link, Menu } from "react-daisyui";

type NavLink = { disabled: boolean; title: string; href: string }[];

type Props = { pathname: string };

export default function PagesNavigation({ pathname }: Readonly<Props>) {
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
  );
}
