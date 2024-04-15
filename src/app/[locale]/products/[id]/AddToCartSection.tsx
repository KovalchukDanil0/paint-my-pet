"use client";

import DimensionsSelect from "@/components/DimensionsSelect";
import PriceTag from "@/components/PriceTag";
import { Dimensions } from "@/lib/shared";
import { Product } from "@prisma/client";
import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import { ChangeEvent, useState, useTransition } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { incrementProductQuantity } from "./actions";

type Props = {
  product: Product;
};

export default function AddToCartSection({ product }: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [dimension, setDimension] = useState("16x20" as unknown as Dimensions);

  function selectChange(e: ChangeEvent<HTMLSelectElement>) {
    setDimension(e.currentTarget.value as unknown as Dimensions);
  }

  function buttonClick() {
    setSuccess(false);
    startTransition(async () => {
      await incrementProductQuantity(product.id, dimension);
      setSuccess(true);
    });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        style={{ aspectRatio: dimension.toString().replace("x", "/") }}
        className="rounded-lg object-cover"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <div className="flex items-center gap-2">
          <DimensionsSelect onChange={selectChange} />
          <Button onClick={buttonClick}>
            Add to cart <FaShoppingCart />
          </Button>
          {isPending && <Spinner />}
          {!isPending && success && (
            <span className="text-green-500">Added to cart</span>
          )}
        </div>
      </div>
    </div>
  );
}
