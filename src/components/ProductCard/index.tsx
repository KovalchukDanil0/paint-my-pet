import { Product } from "@prisma/client";
import { Badge, Card } from "flowbite-react";
import Image from "next/image";
import PriceTag from "../PriceTag";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Readonly<Props>) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Card
      className="w-full bg-blue-100 transition-shadow hover:shadow-xl"
      href={"/product-showroom/products/" + product.id}
    >
      <h2>{product.name}</h2>
      {isNew && <Badge>NEW</Badge>}
      <p>{product.description}</p>
      <PriceTag price={product.price} />
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={800}
        height={400}
        className="h-48 object-cover"
      ></Image>
    </Card>
  );
}
