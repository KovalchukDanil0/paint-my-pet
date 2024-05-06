"use client";

import { ComponentProps, RefObject, useRef } from "react";
import { useInViewport } from "react-in-viewport";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"h2"> {
  text: string;
}

export default function SectionHeading({
  text,
  className,
  ...props
}: Readonly<Props>) {
  const refElm: RefObject<HTMLHeadingElement> = useRef(null);
  const { inViewport, enterCount } = useInViewport(
    refElm,
    {},
    { disconnectOnLeave: false },
  );

  return (
    <h2
      {...props}
      ref={refElm}
      className={twMerge(
        "my-10 text-center text-4xl",
        className,
        inViewport && enterCount === 1 ? "animate-rotate-y" : "",
      )}
    >
      {text}
    </h2>
  );
}
