"use client";

import { Product } from "@prisma/client";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import ProductCard from "../ProductCard";

type Props = { products: Product[] };

export default function ProductsCarousel({ products }: Readonly<Props>) {
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
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Carousel>
  );
}
