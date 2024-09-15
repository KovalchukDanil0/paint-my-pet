"use client";

import { PropsWithChildren } from "react";
import { Button } from "react-daisyui";
import "../styles.scss";

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div id="blog" className="mx-10 md:mx-72 md:my-16">
      <Button tag="a" href="/blog" color="primary" className="mb-5">
        Back to blogs
      </Button>
      {children}
    </div>
  );
}
