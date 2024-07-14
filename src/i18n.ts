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
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames,
    localePrefix,
  });

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
