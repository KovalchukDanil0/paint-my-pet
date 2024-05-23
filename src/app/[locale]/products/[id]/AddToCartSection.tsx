"use client";

import PriceTag from "@/components/PriceTag";
import SelectFromObject from "@/components/SelectFromEnum";
import { Dimensions } from "@/lib/shared";
import { Product } from "@prisma/client";
import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import { AnimationEvent, ChangeEvent, useState, useTransition } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { setDimension } from "./actions";

type Props = {
  product: Product;
};

let dimension = Dimensions["16x20"];

function setInvisible(event: AnimationEvent<HTMLSpanElement>) {
  const element = event.currentTarget;
  element.classList.remove("block");
  element.classList.add("hidden");
}

export default function AddToCartSection({ product }: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  function selectChange(e: ChangeEvent<HTMLSelectElement>) {
    dimension = e.currentTarget.value as unknown as Dimensions;
  }

  function buttonClick() {
    startTransition(async () => {
      await setDimension(product.id, dimension);
      setSuccess(true);
    });
  }

  return (
    <div>
      <Button className="mb-5 w-fit" href="/products">
        Back to products
      </Button>
      <div className="flex w-fit flex-col gap-4 lg:flex-row lg:items-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg object-cover"
          style={{ aspectRatio: "3/4" }}
          priority
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <PriceTag price={product.price} />
          <p>{product.description}</p>
          <div className="flex w-fit items-center gap-2">
            <SelectFromObject onChange={selectChange} obj={Dimensions} />
            <Button onClick={buttonClick}>
              Add to cart <FaShoppingCart />
            </Button>
            {isPending && <Spinner />}
            {!isPending && success && (
              <span
                onAnimationEnd={setInvisible}
                className="animate-fade text-green-500 animate-reverse"
              >
                Added to cart
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
