"use client";

import { Product } from "@prisma/client";
import { ComponentProps } from "react";
import { Button, Carousel } from "react-daisyui";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"div"> {
  products: Product[];
}

export default function ProductsCarousel({
  products,
  className,
  ...props
}: Readonly<Props>) {
  return (
    <div {...props} className={twMerge(className)}>
      <Carousel display="sequential" draggable="false">
        {products.slice(0, 6).map((product) => (
          <Carousel.Item
            className="h-[450px] animate-fade-right md:h-[700px]"
            key={product.id}
            src={product.imageUrl}
          />
        ))}
      </Carousel>
      <div className="flex h-24 items-center justify-center">
        <Button tag="a" href="products">
          See all paintings
        </Button>
      </div>
    </div>
  );
}
