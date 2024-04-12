"use client";

import DimensionsSelect from "@/components/DimensionsSelect";
import { CartItemWithProduct } from "@/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import { Button, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useTransition } from "react";
import { addPrice, deleteItemFromCart, setProductDimension } from "./action";

interface Props {
  cartItem: CartItemWithProduct;
}

export default function CartEntry({
  cartItem: {
    product: { id, imageUrl, name, price },
    dimension,
  },
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
    <div>
      <p>{name}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
      <div>
        <Link href={"/product-showroom/products/" + id} className="font-bold" />
        <div>Price: {FormatPrice(price)}</div>
        <div className="my-1 flex items-center gap-2">
          <DimensionsSelect
            defaultValue={dimension}
            onChange={updateDimension}
          />
          <Button onClick={deleteButtonClick}>Delete</Button>
          {isPending && <Spinner />}
        </div>
      </div>
    </div>
  );
}
