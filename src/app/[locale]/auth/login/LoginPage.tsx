"use client";

import { ExternalProviders } from "@supabase/supabase-js";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Alert, Button, Input, Loading } from "react-daisyui";
import { FaRegTimesCircle } from "react-icons/fa";
import { logInWithGoogle } from "../actions";

type Props = {
  externalProviders: ExternalProviders;
};

export default function LoginPageClient({
  externalProviders,
}: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string>();

  function login(data: FormData) {
    startTransition(async () => {
      try {
        await login(data);
      } catch (err) {
        setErrorMsg((err as Error).message);
      }
    });
  }

  return (
    <form className="m-5 flex flex-col gap-5">
      <p>
        Don&apos;t have an account? <Link href="/auth/register">Sign Up</Link>
      </p>

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

      {errorMsg && (
        <Alert status="error" icon={<FaRegTimesCircle />}>
          {errorMsg}
        </Alert>
      )}

      <div className="flex gap-3">
        <Button color="primary" formAction={login}>
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
  );
}
