"use client";

import { FormatPrice } from "@/lib/format";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Badge, BadgeProps } from "react-daisyui";
import { twMerge } from "tailwind-merge";

interface Props extends BadgeProps {
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
      color="accent"
    >
      {gg ?? "xxx.xx"}
    </Badge>
  );
}
