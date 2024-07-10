"use client";

import { ExternalProviders } from "@supabase/supabase-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

type Props = {
  externalProviders: ExternalProviders;
};

export default function AuthComponent({ externalProviders }: Readonly<Props>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isRegistererSearchParam = searchParams.get("method") === "register";

  const [errorMsg, setErrorMsg] = useState<string>();
  const [isLogIn, setIsLogIn] = useState(!isRegistererSearchParam);
  const [isPending, startTransition] = useTransition();

  function loginMethod(func: Function, data: FormData) {
    startTransition(async () => {
      try {
        await func(data);
      } catch (err) {
        setErrorMsg((err as Error).message);
      }
    });
  }

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function changeLoginMethod() {
    router.push(
      `${pathname}?${createQueryString("method", isLogIn ? "register" : "login")}`,
    );
    setIsLogIn(!isLogIn);
  }

  return (
    <form className="my-12 flex flex-col items-center justify-center gap-5">
      <p>
        Already {isLogIn ? "logged in" : "registered"}?
        <Button
          onClick={changeLoginMethod}
          className="p-0 pl-1"
          color="primary"
          variant="link"
          tag="a"
        >
          {isLogIn ? "Register" : "Log in"}
        </Button>
      </p>

      <div className="flex flex-row gap-5">
        {!isLogIn && (
          <div className="flex w-fit flex-col">
            <label htmlFor="name">Name</label>
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
          className="w-fit min-w-[40rem] text-center"
        >
          {errorMsg}
        </Alert>
      )}

      <div className="flex gap-3">
        <Button
          color="primary"
          formAction={(data: FormData) =>
            isLogIn ? loginMethod(logIn, data) : loginMethod(signUp, data)
          }
        >
          {isLogIn ? "Log in" : "Sign up"}
        </Button>
        {externalProviders.google && (
          <Button
            color="warning"
            formNoValidate
            formAction={(data: FormData) => loginMethod(logInWithGoogle, data)}
          >
            {isLogIn ? "Log in with Google" : "Sign Up with Google"}
          </Button>
        )}
        <Button
          color="error"
          formNoValidate
          formAction={(data: FormData) =>
            isLogIn
              ? loginMethod(signOut, data)
              : loginMethod(deleteAccount, data)
          }
        >
          {isLogIn ? "Sign out" : "Delete Account"}
        </Button>
        {isPending && <Loading />}
      </div>
    </form>
  );
}
