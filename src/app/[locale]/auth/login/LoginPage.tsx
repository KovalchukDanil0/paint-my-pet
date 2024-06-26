"use client";

import { ExternalProviders } from "@supabase/supabase-js";
import Link from "next/link";
import { useTransition } from "react";
import { Button, Input, Loading } from "react-daisyui";
import { logInWithGoogle, login } from "../actions";

type Props = {
  externalProviders: ExternalProviders;
};

export default function LoginPageClient({
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
        Don&apos;t have an account?
        <Link className="ml-1" href="/auth/register">
          Sign Up
        </Link>
      </p>
      <form>
        <div className="flex flex-row gap-5">
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
          <Button color="primary" formAction={Login}>
            Log in {isPending && <Loading />}
          </Button>
          {externalProviders.google && (
            <Button color="warning" formNoValidate formAction={logInWithGoogle}>
              Log in with Google
            </Button>
          )}
          <Button color="error">Sign out</Button>
        </div>
      </form>
    </div>
  );
}
