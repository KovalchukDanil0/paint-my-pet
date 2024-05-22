"use server";

import { ExternalProviders } from "@supabase/supabase-js";
import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { logInWithGoogle, login, signout, signup } from "./actions";

export default async function LoginPage() {
  const response: { data: { external: ExternalProviders } } = await axios.get(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  );
  const externalProviders: ExternalProviders = response.data.external;

  return (
    <div>
      <form>
        <Label htmlFor="email">Email:</Label>
        <TextInput id="email" name="email" type="email" required />
        <Label htmlFor="password">Password:</Label>
        <TextInput id="password" name="password" type="password" required />
        <div className="flex gap-3">
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>
          <button formNoValidate formAction={signout}>
            Sign out
          </button>
        </div>
        {externalProviders.google && (
          <button formNoValidate formAction={logInWithGoogle}>
            Log in with Google
          </button>
        )}
      </form>
    </div>
  );
}
