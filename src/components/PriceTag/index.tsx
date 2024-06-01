"use client";

import { FormatPrice } from "@/lib/format";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { Badge, BadgeProps, Skeleton } from "react-daisyui";
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
  const [priceData, setPriceData] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setPriceData(await FormatPrice(price, locale));
    };

    fetchData();
  }, [price, locale]);

  return (
    <div>
      {priceData != null ? (
        <Badge
          {...props}
          className={twMerge("w-fit", className)}
          color="accent"
        >
          {priceData}
        </Badge>
      ) : (
        <Skeleton className="h-6 w-20" />
      )}
    </div>
  );
}
