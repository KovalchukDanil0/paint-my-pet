"use client";

import { NavbarLink } from "flowbite-react";
import { usePathname } from "next/navigation";
import { NavLink } from ".";

type Props = { link: NavLink; index: number };

export default function PageEntry({ link, index }: Readonly<Props>) {
  const pathname: string = usePathname();

  const regexCheckLink = new RegExp(
    `^\/\\w\\w${index === 0 ? "$" : link.href}`,
  );
  // TODO: add pagination with locale support
  if (regexCheckLink.test(pathname)) {
    link.active = true;
  }

  return <NavbarLink {...link}>{link.title}</NavbarLink>;
}
