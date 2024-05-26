"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ComponentProps, type ReactElement } from "react";
import { Button } from "react-daisyui";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"img"> {
  href?: string;
  btnText?: string;
  offsetX?: number;
  offsetY?: number;
}

export default function Billboard({
  offsetX = 0,
  offsetY = 0,
  src,
  alt,
  href,
  children,
  btnText,
  className,
  ...props
}: Readonly<Props>): React.ReactElement {
  const image: ReactElement = (
    <Image
      className="object-cover"
      style={{
        objectPosition: `${offsetX}% ${offsetY}%`,
        height: "inherit",
      }}
      src={src!}
      width={2160}
      height={750}
      alt={alt!}
      title={alt}
    />
  );

  return (
    <div
      className={twMerge("relative h-[500px] md:h-[750px]", className)}
      style={{
        width: "fit-content",
      }}
      {...props}
    >
      {href == null ? image : <Link href={href}>{image}</Link>}
      {children ? (
        <div
          className={twMerge(
            "absolute bottom-20 left-1/2 m-0 inline-block w-fit -translate-x-1/2 translate-y-1/3 justify-center text-center",
            "[&>h1]:text-4xl [&>h1]:uppercase md:[&>h1]:text-6xl",
            "[&>p]:text-xl md:[&>p]:text-3xl",
          )}
        >
          {children}
          {href == null ? (
            <></>
          ) : (
            <Button tag="a" href={href} className="m-auto mt-9 w-1/3">
              {btnText}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
