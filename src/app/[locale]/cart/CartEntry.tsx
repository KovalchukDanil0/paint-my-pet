"use client";

import SelectFromObject from "@/components/SelectFromEnum";
import { CartItemWithProduct } from "@/lib/db/cart";
import { Dimensions } from "@/lib/shared";
import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useTransition } from "react";
import { addPrice, deleteItemFromCart, setProductDimension } from "./action";

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
      await addPrice(id);
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
      <Link href={"/products/" + id} className="font-bold">
        View product
      </Link>
      <div>Price: {price}</div>
      <div className="my-1 flex items-center gap-2">
        <SelectFromObject
          defaultValue={dimension}
          onChange={updateDimension}
          obj={Dimensions}
        />
        <Button onClick={deleteButtonClick}>Delete</Button>
        {isPending && <Spinner />}
      </div>
    </div>
  );
}
