"use client";

import Image from "next/image";
import { ComponentProps, type ReactElement } from "react";
import { Button, Link } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import "./index.scss";

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
}: Readonly<Props>): ReactElement {
  const image: ReactElement = (
    <Image
      className="object-cover"
      style={{
        objectPosition: `${offsetX}% ${offsetY}%`,
        height: "inherit",
      }}
      src={src ?? ""}
      width={2160}
      height={750}
      alt={alt ?? "billboard image"}
      title={alt}
    />
  );

  return (
    <div
      className={twMerge("relative h-[500px] md:h-[750px]", className)}
      {...props}
    >
      {href ? <Link href={href}>{image}</Link> : image}
      {children && (
        <div
          id="billboard-text"
          className={twMerge(
            "absolute bottom-20 left-1/2 w-10/12 -translate-x-1/2 translate-y-1/3 text-center",
          )}
        >
          {children}
          {href && (
            <Button tag="a" href={href} className="m-auto mt-9 w-1/3">
              {btnText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
