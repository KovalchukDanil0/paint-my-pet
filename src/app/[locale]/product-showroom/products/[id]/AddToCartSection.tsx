"use client";

import { Button, Select, Spinner } from "flowbite-react";
import { ChangeEvent, useState, useTransition } from "react";
import { FaShoppingCart } from "react-icons/fa";

type Props = {
  productId: string;
  incrementProductQuantity: (
    productId: string,
    dimension: string,
  ) => Promise<void>;
};

let dimension = "16x20";
function selectChange(e: ChangeEvent<HTMLSelectElement>) {
  dimension = e.currentTarget.value;
}

export default function AddToCartSection({
  productId,
  incrementProductQuantity,
}: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Select onChange={selectChange}>
        <option>16x20</option>
        <option>12x16</option>
        <option>11x14</option>
        <option>8x10</option>
        <option>5x7</option>
      </Select>
      <Button
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId, dimension);
            setSuccess(true);
          });
        }}
      >
        Add to cart <FaShoppingCart />
      </Button>
      {isPending && <Spinner />}
      {!isPending && success && (
        <span className="text-green-500">Added to cart</span>
      )}
    </div>
  );
}
