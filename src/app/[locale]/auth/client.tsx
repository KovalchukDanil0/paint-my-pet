"use client";

import { usePathname, useRouter } from "@/i18n";
import { ExternalProviders } from "@supabase/supabase-js";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { Alert, Button, Input, Loading } from "react-daisyui";
import { FaRegTimesCircle } from "react-icons/fa";
import {
  deleteAccount,
  logIn,
  logInWithGoogle,
  signOut,
  signUp,
} from "./actions";

function createQueryString(
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string,
) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
}

type Props = {
  externalProviders: ExternalProviders;
};

export default function AuthComponent({
  externalProviders: { google },
}: Readonly<Props>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isRegistererSearchParam = searchParams.get("method") === "register";

  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLogIn, setIsLogIn] = useState(!isRegistererSearchParam);
  const [isPending, startTransition] = useTransition();

  const changeLoginMethodFunc = useCallback(() => {
    router.push(
      `${pathname}?${createQueryString(searchParams, "method", isLogIn ? "register" : "login")}`,
    );
    setIsLogIn(!isLogIn);
  }, [isLogIn, pathname, router, searchParams]);

  function loginMethod(func: Function, data: FormData) {
    startTransition(async () => {
      try {
        await func(data);
      } catch (err) {
        setErrorMsg((err as Error).message);
      }
    });
  }

  const signInFunc = useCallback(
    (data: FormData) => loginMethod(isLogIn ? logIn : signUp, data),
    [isLogIn],
  );

  const logInGoogleFunc = useCallback(
    (data: FormData) => loginMethod(logInWithGoogle, data),
    [],
  );

  const signOutFunc = useCallback(
    (data: FormData) => loginMethod(isLogIn ? signOut : deleteAccount, data),
    [isLogIn],
  );

  return (
    <form className="my-12 flex flex-col items-center justify-center gap-5">
      <p>
        Already {isLogIn ? "logged in" : "registered"}?
        <Button
          onClick={changeLoginMethodFunc}
          className="p-0 pl-1"
          color="primary"
          variant="link"
          tag="a"
        >
          {isLogIn ? "Register" : "Log in"}
        </Button>
      </p>

      <div className="flex flex-col gap-1 md:flex-row md:gap-5">
        {!isLogIn && (
          <div className="flex w-fit flex-col">
            <label htmlFor="name">Name:</label>
            <Input id="name" name="name" type="text" />
          </div>
        )}

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
        <Alert
          status="error"
          icon={<FaRegTimesCircle />}
          className="w-fit min-w-96 text-center md:min-w-[40rem]"
        >
          {errorMsg}
        </Alert>
      )}

      <div className="mt-5 flex flex-row flex-wrap items-center justify-center gap-3 md:mt-0">
        <Button color="primary" formAction={signInFunc}>
          {isLogIn ? "Log in" : "Sign up"}
        </Button>
        {google && (
          <Button color="warning" formNoValidate formAction={logInGoogleFunc}>
            {isLogIn ? "Log in with Google" : "Sign Up with Google"}
          </Button>
        )}
        <Button color="error" formNoValidate formAction={signOutFunc}>
          {isLogIn ? "Sign out" : "Delete Account"}
        </Button>
        {isPending && <Loading />}
      </div>
    </form>
  );
}
