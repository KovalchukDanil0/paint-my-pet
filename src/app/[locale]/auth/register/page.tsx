"use server";

import { ExternalProviders } from "@supabase/supabase-js";
import axios from "axios";
import Link from "next/link";
import { Input } from "react-daisyui";
import { logInWithGoogle, signout, signup } from "../actions";

export default async function LoginPage() {
  const response: { data: { external: ExternalProviders } } = await axios.get(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  );
  const externalProviders: ExternalProviders = response.data.external;

  return (
    <div>
      <p>
        Already registered? <Link href="/auth/login">Log In</Link>
      </p>
      <form>
        <label htmlFor="name">Name</label>
        <Input id="name" name="name" type="text" />
        <label htmlFor="email">Email:</label>
        <Input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <Input id="password" name="password" type="password" required />
        <div className="flex gap-3">
          <button formAction={signup}>Sign up</button>
          <button formNoValidate formAction={signout}>
            Sign out
          </button>
        </div>
        {externalProviders.google && (
          <button formNoValidate formAction={logInWithGoogle}>
            Sign Up with Google
          </button>
        )}
      </form>
    </div>
  );
}
