"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export default function SectionHeading({
  text,
  className,
  ...props
}: Readonly<Props>) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const current = ref.current!;

    const scrollObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        scrollObserver.unobserve(entry.target);
      }
    });

    scrollObserver.observe(current);

    return () => {
      if (current) {
        scrollObserver.unobserve(current);
      }
    };
  }, []);

  const classes = isVisible ? "animate-rotate-y" : "";

  return (
    <h2
      {...props}
      ref={ref}
      className={twMerge("my-10 text-center text-4xl", classes, className)}
    >
      {text}
    </h2>
  );
}
