"use client";

import { Product } from "@prisma/client";
import { Badge, Button, Card, CardProps } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import PriceTag from "../PriceTag";

interface Props extends CardProps {
  product: Product;
  imageHeight?: string;
}

export default function ProductCard({
  product: { name, createdAt, id, description, price, imageUrl },
  imageHeight = "h-96",
  className,
  ...props
}: Readonly<Props>) {
  const isNew =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Card {...props} className={twMerge("transition-shadow", className)}>
      <Card.Image
        src={imageUrl}
        width={1920}
        height={1080}
        alt={name}
        draggable="false"
        className={twMerge("w-full object-cover", imageHeight)}
      />
      <Card.Body>
        <Card.Title tag="h2">
          {name}
          {isNew && (
            <Badge color="warning" className="w-fit">
              NEW
            </Badge>
          )}
        </Card.Title>
        <p>{description}</p>
        <PriceTag className="w-fit" price={price} />
        <Card.Actions className="justify-end">
          <Button color="primary" tag="a" href={"/products/" + id}>
            View Product
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}
