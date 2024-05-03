"use client";

import PriceTag from "@/components/PriceTag";
import SelectFromEnum from "@/components/SelectFromEnum";
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
          style={{ aspectRatio: dimension.toString().replace("x", "/") }}
          className="rounded-lg object-cover"
          priority
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <PriceTag price={product.price} />
          <p>{product.description}</p>
          <div className="flex w-fit items-center gap-2">
            <SelectFromEnum onChange={selectChange} enumObj={Dimensions} />
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
    </div>
  );
}
