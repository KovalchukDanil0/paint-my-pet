"use client";

import { Product } from "@prisma/client";
import { Button } from "flowbite-react";
import { ComponentProps } from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import ProductCard from "../ProductCard";

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
      <Carousel
        arrows
        keyBoardControl
        draggable
        pauseOnHover
        shouldResetAutoplay
        swipeable
        responsive={responsive}
        centerMode={false}
        focusOnSelect={false}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        showDots={false}
        className="mx-5 my-5"
        itemClass="px-5"
        minimumTouchDrag={80}
        slidesToSlide={1}
        additionalTransfrom={0}
        autoPlaySpeed={3000}
      >
        {products.slice(0, 6).map((product) => (
          <ProductCard
            className="h-[450px] animate-fade-right md:h-[600px]"
            key={product.id}
            product={product}
          />
        ))}
      </Carousel>
      <div className="flex h-24 items-center justify-center">
        <Button href="products">See all paintings</Button>
      </div>
    </div>
  );
}
