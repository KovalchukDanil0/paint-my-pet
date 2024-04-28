"use client";

import { FormatPrice } from "@/lib/format";
import { Badge } from "flowbite-react";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  price: number;
}

export default function PriceTag({
  price,
  className,
  ...props
}: Readonly<Props>) {
  return (
    <Badge {...props} className={twMerge("w-fit", className)}>
      {FormatPrice(price)}
    </Badge>
  );
}
