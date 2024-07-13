"use client";

import SelectFromObject from "@/components/SelectFromObject";
import { CartItemWithProduct } from "@/lib/db/cart";
import { Dimensions } from "@/lib/shared";
import Image from "next/image";
import { ChangeEvent, useTransition } from "react";
import { Button, Link, Loading } from "react-daisyui";
import { deleteItemFromCart, setProductDimension } from "./action";

interface Props {
  cartItem: CartItemWithProduct;
  price: string;
}

export default function CartEntry({
  cartItem: {
    product: { id, imageUrl, name },
    dimension,
  },
  price,
}: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();

  function updateDimension(e: ChangeEvent<HTMLSelectElement>) {
    const newDimension = e.currentTarget.value;

    startTransition(async () => {
      await setProductDimension(id, newDimension);
    });
  }

  function deleteButtonClick(_e: React.MouseEvent<HTMLButtonElement>) {
    startTransition(async () => {
      await deleteItemFromCart(id);
    });
  }

  return (
    <div className="flex w-fit flex-col gap-3">
      <h2>{name}</h2>
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="h-52 rounded-lg object-cover"
      />
      <Link
        href={"/products/" + id}
        className="link link-primary w-fit font-bold"
      >
        View product
      </Link>
      <div>Price: {price}</div>
      <div className="my-1 flex items-center gap-2">
        <SelectFromObject
          defaultValue={dimension}
          onChange={updateDimension}
          obj={Dimensions}
        />
        <Button color="error" onClick={deleteButtonClick}>
          Delete
        </Button>
        {isPending && <Loading />}
      </div>
    </div>
  );
}
