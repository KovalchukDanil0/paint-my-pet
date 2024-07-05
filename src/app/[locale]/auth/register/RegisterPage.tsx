"use client";

import { ExternalProviders } from "@supabase/supabase-js";
import Link from "next/link";
import { Alert, Button, Input } from "react-daisyui";
import { deleteAccount, logInWithGoogle, signup } from "../actions";

type Props = {
  externalProviders: ExternalProviders;
};

export default function RegisterPageClient({
  externalProviders,
}: Readonly<Props>) {
  return (
    <form className="m-5 flex flex-col gap-5">
      <p>
        Already registered? <Link href="/auth/login">Log In</Link>
      </p>

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

      <Alert>Text</Alert>

      <div className="flex gap-3">
        <Button color="primary" formAction={signup}>
          Sign up
        </Button>
        {externalProviders.google && (
          <Button color="warning" formNoValidate formAction={logInWithGoogle}>
            Sign Up with Google
          </Button>
        )}
        <Button color="error" formNoValidate formAction={deleteAccount}>
          Delete Account
        </Button>
      </div>
    </form>
  );
}
