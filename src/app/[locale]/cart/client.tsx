"use client";

import SelectFromObject from "@/components/SelectFromObject";
import { getIndexOfLocale } from "@/i18n";
import { CartItemWithProduct } from "lib/db/cart";
import { Dimensions } from "lib/shared";
import { useLocale } from "next-intl";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useTransition } from "react";
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
  const locale = useLocale();

  function updateDimension({
    currentTarget: { value: newDimension },
  }: ChangeEvent<HTMLSelectElement>) {
    startTransition(async () => {
      await setProductDimension(id, newDimension);
    });
  }

  function deleteButtonClick(_e: MouseEvent<HTMLButtonElement>) {
    startTransition(async () => {
      await deleteItemFromCart(id);
    });
  }

  return (
    <div className="flex w-fit flex-col gap-3">
      <h2>{name}</h2>
      <Image
        src={imageUrl}
        alt={name[getIndexOfLocale(locale)]}
        width={200}
        height={200}
        className="size-52 rounded-lg object-cover"
      />
      <Link href={"/products/id"} className="link link-primary w-fit font-bold">
        View product
      </Link>
      <div>Price: {price}</div>
      <div className="my-1 flex items-center gap-2">
        <SelectFromObject
          defaultValue={dimension}
          onChange={updateDimension}
          enumObj={Dimensions}
        />
        <Button color="error" onClick={deleteButtonClick}>
          Delete
        </Button>
        {isPending && <Loading />}
      </div>
    </div>
  );
}
