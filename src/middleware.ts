import { CookieOptions, createServerClient } from "@supabase/ssr";
import { getSupabaseProps } from "lib/supabase/client";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createIntlMiddleware({
  defaultLocale: "en",
  locales: routing.locales,
  pathnames: routing.pathnames,
  localePrefix: routing.localePrefix,
});

export default async function middleware(request: NextRequest) {
  const response: NextResponse = handleI18nRouting(request);

  const originalFullUrl = response.headers.get("x-middleware-rewrite");
  if (originalFullUrl) {
    const originalUrlPathname = new URL(originalFullUrl).pathname;
    response.headers.set("x-original-url", originalUrlPathname);
  }

  const { supabaseAnonKey, supabaseUrl } = getSupabaseProps();

  const { auth } = createServerClient(supabaseUrl, supabaseAnonKey, {
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
  });

  await auth.getUser();

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
