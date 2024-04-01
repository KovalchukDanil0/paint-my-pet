import { FormatPrice } from "@/lib/format";
import { Badge } from "flowbite-react";

type Props = { price: number; className?: string };

export default function PriceTag({ price, className }: Readonly<Props>) {
  return <Badge className={className}>{FormatPrice(price)}</Badge>;
}
