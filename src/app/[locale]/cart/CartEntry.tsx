"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import { Select, Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useTransition } from "react";

interface Props {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, dimension: string) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, dimension },
  setProductQuantity,
}: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();

  function updateDimension(e: ChangeEvent<HTMLSelectElement>) {
    const newDimension = e.currentTarget.value;

    startTransition(async () => {
      await setProductQuantity(product.id, newDimension);
    });
  }

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
          <Select defaultValue={dimension} onChange={updateDimension}>
            <option>16x20</option>
            <option>12x16</option>
            <option>11x14</option>
            <option>8x10</option>
            <option>5x7</option>
          </Select>
          {isPending && <Spinner />}
        </div>
      </div>
    </div>
  );
}
