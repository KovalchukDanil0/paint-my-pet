"use client";

import { FormatPrice } from "@/lib/format";
import { Badge } from "flowbite-react";
import { useLocale } from "next-intl";
import { ComponentProps, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
  price: number;
}

export default function PriceTag({
  price,
  className,
  ...props
}: Readonly<Props>) {
  const locale = useLocale();

  const [gg, setGg] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setGg(await FormatPrice(price, locale));
    };

    fetchData();
  }, [price, locale]);

  return (
    <Badge
      {...props}
      className={twMerge("w-fit", className, gg == null ? "animate-pulse" : "")}
    >
      {gg ?? "xxx.xx"}
    </Badge>
  );
}
