"use client";

import { useEffect } from "react";
import { Button } from "react-daisyui";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Readonly<Props>) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="mx-10 my-12 flex flex-col items-center justify-center gap-3">
      <h2>Something went wrong!</h2>
      <p>Details: {error.message}</p>
      <div className="flex flex-row gap-2">
        <Button onClick={reset}>Try again</Button>
        <Button tag="a" href="/">
          Return to home
        </Button>
      </div>
    </div>
  );
}
