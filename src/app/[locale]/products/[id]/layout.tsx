"use client";

import { ReactNode } from "react";
import { Button } from "react-daisyui";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <>
      <Button color="primary" className="mb-5 w-fit" tag="a" href="/products">
        Back to products
      </Button>
      {children}
    </>
  );
}
