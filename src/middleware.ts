import { CookieOptions, createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales } from "./i18n";
import { getSupabaseProps } from "./lib/shared";

const handleI18nRouting = createIntlMiddleware({
  locales,
  defaultLocale: "en",
  pathnames: {
    "/about": {
      en: "/about",
      cz: "/o-nas",
    },
  },
});

export default async function middleware(request: NextRequest) {
  const response: NextResponse = handleI18nRouting(request);

  const originalFullUrl = response.headers.get("x-middleware-rewrite");
  if (originalFullUrl) {
    const originalUrlPathname = new URL(originalFullUrl).pathname;
    response.headers.set("x-original-url", originalUrlPathname);
  }

  const supabaseProps = getSupabaseProps();

  const supabase = createServerClient(
    supabaseProps.supabaseUrl,
    supabaseProps.supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // However, match all pathnames within `/users`, optionally with a locale prefix
    "/([\\w-]+)?/users/(.+)",
  ],
};
