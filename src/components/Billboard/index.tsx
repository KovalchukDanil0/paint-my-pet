"use client";

import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { type ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  src: string;
  hl?: string;
  alt?: string;
  href?: string;
  sl?: string;
  marginLeft?: number;
  marginTop?: number;
  children?: ReactElement[];
  btnText?: string;
  offsetX?: number;
  offsetY?: number;
}

export default function Billboard({
  offsetX = 50,
  offsetY = 50,
  href,
  src,
  alt,
  children,
  btnText,
}: Readonly<Props>): React.ReactElement {
  const image: ReactElement = (
    <Image
      className="object-cover"
      style={{
        objectPosition: `${offsetX}% ${offsetY}%`,
        height: "inherit",
      }}
      src={src}
      width={2160}
      height={750}
      alt={alt!}
      title={alt}
    />
  );

  return (
    <div
      className="relative h-[500px] md:h-[750px]"
      style={{
        width: "fit-content",
      }}
    >
      {href == null ? image : <Link href={href}>{image}</Link>}
      {children?.length !== 0 ? (
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
            <Button href={href} className="m-auto mt-9 w-1/3">
              {btnText}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
