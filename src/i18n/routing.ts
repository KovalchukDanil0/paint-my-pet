import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "cz"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/auth": "/auth",
    "/auth/sign-out": "/auth/sign-out",
    "/about": {
      en: "/about",
      cz: "/o-nas",
    },
    "/cart": {
      en: "/cart",
      cz: "/vozík",
    },
    "/search": {
      en: "/search",
      cz: "/vyhledávání",
    },
    "/products": {
      en: "/products",
      cz: "/produkty",
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);

export const getIndexOfLocale = (locale: Locale) =>
  routing.locales.indexOf(locale);
