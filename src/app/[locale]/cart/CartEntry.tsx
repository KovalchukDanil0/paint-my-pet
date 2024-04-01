"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import { Button, Select, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useTransition } from "react";

interface Props {
  cartItem: CartItemWithProduct;
  setProductQuantity: (
    productId: string,
    quantity: number,
    size: string,
  ) => Promise<void>;
}

let newQuantity: number;
function updateQuantity(e: ChangeEvent<HTMLSelectElement>) {
  newQuantity = parseInt(e.currentTarget.value);
}

let newSize: string;
function updateSize(e: ChangeEvent<HTMLSelectElement>) {
  newSize = e.currentTarget.value;
}

function updateValues() {}

export default function CartEntry({
  cartItem: { product, quantity, size },
  setProductQuantity,
}: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
      </div>
      <div>
        <Link
          href={"/product-showroom/products/" + product.id}
          className="font-bold"
        />
        <div>Price: {FormatPrice(product.price)}</div>
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <Select defaultValue={quantity} onChange={updateQuantity}>
            {Array.from({ length: 100 }).map((_elm, index) => (
              <option key={index}>{index}</option>
            ))}
          </Select>
          <Select defaultValue={size} onChange={updateSize}>
            <option>16x20</option>
            <option>12x16</option>
            <option>11x14</option>
            <option>8x10</option>
            <option>5x7</option>
          </Select>
        </div>
        <Button
          onClick={() => {
            startTransition(async () => {
              await setProductQuantity(product.id, newQuantity, newSize);
            });
          }}
        >
          Update
        </Button>
        <div className="flex items-center gap-3">
          Total: {FormatPrice(product.price * quantity)}
          {isPending && <Spinner />}
        </div>
      </div>
    </div>
  );
}
