import { Product } from "@prisma/client";
import { Badge, Card } from "flowbite-react";
import Image from "next/image";
import PriceTag from "../PriceTag";

interface Props {
  product: Product;
}

export default function ProductCard({
  product: { name, createdAt, id, description, price, imageUrl },
}: Readonly<Props>) {
  const isNew =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Card
      draggable={false}
      className="w-full select-none bg-blue-100 transition-shadow hover:shadow-xl"
      href={"/product-showroom/products/" + id}
    >
      <h2>{name}</h2>
      {isNew && <Badge>NEW</Badge>}
      <p>{description}</p>
      <PriceTag price={price} />
      <Image
        draggable={false}
        src={imageUrl}
        alt={name}
        width={800}
        height={400}
        className="h-56 object-cover md:h-96"
      ></Image>
    </Card>
  );
}
