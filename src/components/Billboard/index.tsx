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
      height={500}
      alt={alt ?? "billboard image"}
      title={alt}
    />
  );

  return (
    <div
      className={twMerge("relative h-[325px] md:h-[650px]", className)}
      {...props}
    >
      {href ? <Link href={href}>{image}</Link> : image}
      {children && (
        <div
          id="billboard-text"
          className="absolute bottom-10 left-0 right-0 mx-auto flex flex-col gap-1 text-center md:bottom-20 md:gap-5"
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
