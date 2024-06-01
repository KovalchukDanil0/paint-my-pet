"use client";

import { ExternalProviders } from "@supabase/supabase-js";
import Link from "next/link";
import { Button, Input } from "react-daisyui";
import { logInWithGoogle, signout, signup } from "../actions";

type Props = {
  externalProviders: ExternalProviders;
};

export default function RegisterPageClient({
  externalProviders,
}: Readonly<Props>) {
  return (
    <div className="m-5">
      <p>
        Already registered?
        <Link className="ml-1" href="/auth/login">
          Log In
        </Link>
      </p>
      <form>
        <div className="flex flex-row gap-5">
          <div className="flex w-fit flex-col">
            <label htmlFor="name">Name</label>
            <Input id="name" name="name" type="text" />
          </div>

          <div className="flex w-fit flex-col">
            <label htmlFor="email">Email:</label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="flex w-fit flex-col">
            <label htmlFor="password">Password:</label>
            <Input id="password" name="password" type="password" required />
          </div>
        </div>

        <div className="my-8 flex gap-3">
          <Button color="primary" formAction={signup}>
            Sign up
          </Button>
          {externalProviders.google && (
            <Button color="warning" formNoValidate formAction={logInWithGoogle}>
              Sign Up with Google
            </Button>
          )}
          <Button color="error" formNoValidate formAction={signout}>
            Sign out
          </Button>
        </div>
      </form>
    </div>
  );
}
