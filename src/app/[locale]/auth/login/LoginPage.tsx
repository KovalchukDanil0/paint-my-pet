"use client";

import { ExternalProviders } from "@supabase/supabase-js";
import Link from "next/link";
import { useTransition } from "react";
import { Button, Input, Loading } from "react-daisyui";
import { logInWithGoogle, login } from "../actions";

type Props = {
  externalProviders: ExternalProviders;
};

export default function ClientLoginPage({
  externalProviders,
}: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();

  function Login(data: FormData) {
    startTransition(async () => {
      await login(data);
    });
  }

  return (
    <div className="m-5">
      <p>
        Don&apos;t have an account? <Link href="/auth/register">Sign Up</Link>
      </p>
      <form>
        <label htmlFor="email">Email:</label>
        <Input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <Input id="password" name="password" type="password" required />
        <div className="my-3 flex gap-3">
          <Button color="primary" formAction={Login}>
            Log in {isPending && <Loading />}
          </Button>
          <Button>Sign out</Button>
        </div>
        {externalProviders.google && (
          <Button formNoValidate formAction={logInWithGoogle}>
            Log in with Google
          </Button>
        )}
      </form>
    </div>
  );
}
