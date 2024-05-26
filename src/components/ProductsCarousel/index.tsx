"use client";

import { Product } from "@prisma/client";
import { ComponentProps } from "react";
import { Button, Carousel } from "react-daisyui";
import { ResponsiveType } from "react-multi-carousel";

interface Props extends ComponentProps<"div"> {
  products: Product[];
}

export default function ProductsCarousel({
  products,
  ...props
}: Readonly<Props>) {
  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div {...props}>
      <Carousel draggable className="mx-5 my-5">
        {products.slice(0, 6).map((product) => (
          <Carousel.Item
            className="h-[450px] animate-fade-right md:h-[600px]"
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
