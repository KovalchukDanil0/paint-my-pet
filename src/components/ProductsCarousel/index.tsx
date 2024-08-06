"use client";

import { Product } from "@prisma/client";
import { ComponentProps } from "react";
import { Button } from "react-daisyui";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ProductCard from "../ProductCard";
import "./index.scss";

interface Props extends ComponentProps<"div"> {
  products: Product[];
  showButton?: boolean;
}

export default function ProductsCarousel({
  products,
  showButton,
  ...props
}: Readonly<Props>) {
  if (products.length === 0) {
    return false;
  }

  const maxSlides = products.length < 3 ? products.length : 3;

  const settings: Settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: maxSlides,
    slidesToScroll: maxSlides,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div {...props}>
      <Slider {...settings}>
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
      {showButton && (
        <div className="flex h-24 items-center justify-center">
          <Button color="primary" tag="a" href="products">
            See all paintings
          </Button>
        </div>
      )}
    </div>
  );
}
