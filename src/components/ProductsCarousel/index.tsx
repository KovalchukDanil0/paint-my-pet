"use client";

import { Product } from "@prisma/client";
import { ComponentProps } from "react";
import { Button } from "react-daisyui";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { twMerge } from "tailwind-merge";
import ProductCard from "../ProductCard";

const responsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

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
      <Carousel responsive={responsive} itemClass="px-5">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>
      <div className="flex h-24 items-center justify-center">
        <Button color="primary" tag="a" href="products">
          See all paintings
        </Button>
      </div>
    </div>
  );
}
