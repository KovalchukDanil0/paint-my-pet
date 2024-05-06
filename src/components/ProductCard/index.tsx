"use client";

import { Product } from "@prisma/client";
import { Badge, Card } from "flowbite-react";
import Image from "next/image";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import PriceTag from "../PriceTag";

interface Props extends ComponentProps<"div"> {
  product: Product;
}

export default function ProductCard({
  product: { name, createdAt, id, description, price, imageUrl },
  className,
  ...props
}: Readonly<Props>) {
  const isNew =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Card
      {...props}
      draggable={false}
      className={twMerge(
        "w-full select-none bg-blue-100 transition-shadow hover:shadow-xl",
        className,
      )}
      href={"/products/" + id}
    >
      <h2>{name}</h2>
      {isNew && <Badge className="w-fit">NEW</Badge>}
      <p>{description}</p>
      <PriceTag className="w-fit" price={price} />
      <Image
        draggable={false}
        src={imageUrl}
        alt={name}
        width={800}
        height={400}
        className="h-56 object-cover md:h-96"
        loading="lazy"
      ></Image>
    </Card>
  );
}
