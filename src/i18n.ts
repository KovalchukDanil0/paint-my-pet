import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { LocalePrefix, Pathnames } from "next-intl/routing";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["en", "cz"];

export const pathnames: Pathnames<typeof locales> = {
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
};

export const getIndexOfLocale = (locale: string) => locales.indexOf(locale);

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });

type MessageType = { default: {} };

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    notFound();
  }

  const { default: messages }: MessageType = await import(
    `root/messages/${locale}.json`
  );

  return {
    messages,
  };
});
