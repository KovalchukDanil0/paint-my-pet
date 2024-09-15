"use client";

import { getIndexOfLocale, Locale } from "@/i18n/routing";
import { Product } from "@prisma/client";
import { useLocale } from "next-intl";
import { Badge, Button, Card, CardProps } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import PriceTag from "../PriceTag";

interface Props extends CardProps {
  product: Product;
}

export default function ProductCard({
  product: { name, createdAt, id, description, price, imageUrl },
  className,
  ...props
}: Readonly<Props>) {
  const locale = useLocale();

  const isNew =
    Date.now() - new Date(createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  const nameResolved = name[getIndexOfLocale(locale as Locale)];

  return (
    <Card {...props} className={twMerge("transition-shadow", className)}>
      <Card.Image
        src={imageUrl}
        width={1920}
        height={1080}
        alt={nameResolved}
        draggable="false"
        className="h-64 w-full object-cover md:h-96"
      />
      <Card.Body>
        <Card.Title tag="h2" className="uppercase">
          {nameResolved}
          {isNew && (
            <Badge color="warning" className="w-fit">
              NEW
            </Badge>
          )}
        </Card.Title>
        <p>{description[getIndexOfLocale(locale as Locale)]}</p>
        <PriceTag className="w-fit" price={price} />
        <Card.Actions className="justify-start md:justify-end">
          <Button color="primary" tag="a" href={"/products/" + id}>
            View Product
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}
