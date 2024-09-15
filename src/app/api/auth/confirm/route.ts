import { redirect } from "@/i18n";
import { type EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "lib/supabase/server";
import { type NextRequest } from "next/server";

export async function GET({ nextUrl, url }: NextRequest) {
  const { searchParams } = new URL(url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  const redirectTo = nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");

  if (tokenHash && type) {
    const { auth } = createClient();

    const { error } = await auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) {
      redirectTo.searchParams.delete("next");
      return redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return redirect(redirectTo);
}
