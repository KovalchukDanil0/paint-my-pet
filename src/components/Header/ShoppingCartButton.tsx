"use server";

import { getCart } from "@/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import { Badge, Button, Popover } from "flowbite-react";
import { FaShoppingCart } from "react-icons/fa";

export default async function ShoppingCartButton() {
  const cart = await getCart();

  const itemsCount = cart?.size ?? 0;

  return (
    <Popover
      aria-labelledby="default-popover"
      content={
        <div className="h-fit w-64 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3
              id="default-popover"
              className="font-semibold text-gray-900 dark:text-white"
            >
              {itemsCount} items
            </h3>
          </div>
          <div className="px-3 py-2">
            <p>Subtotal: {FormatPrice(cart?.subtotal ?? 0)}</p>
            <Button className="my-3" href="/cart">
              View cart
            </Button>
          </div>
        </div>
      }
    >
      <div className="mr-3 flex items-center">
        <FaShoppingCart />
        <Badge>{itemsCount}</Badge>
      </div>
    </Popover>
  );
}
