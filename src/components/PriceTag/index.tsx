import { FormatPrice } from "@/lib/format";
import { Badge } from "flowbite-react";
import { useLocale } from "next-intl";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"span"> {
  price: number;
}

export default async function PriceTag({
  price,
  className,
  ...props
}: Readonly<Props>) {
  const locale = useLocale();

  return (
    <Badge {...props} className={twMerge("w-fit", className)}>
      {await FormatPrice(price, locale)}
    </Badge>
  );
}
