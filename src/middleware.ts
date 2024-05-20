import { CookieOptions, createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { locales } from "./i18n";

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
  const response = handleI18nRouting(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  response.headers.set("x-request-url", request.url);

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
