"use client";

import { FormatPrice } from "@/lib/format";
import { Badge } from "flowbite-react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  price: number;
}

export default function PriceTag({ price, ...props }: Readonly<Props>) {
  return <Badge {...props}>{FormatPrice(price)}</Badge>;
}
