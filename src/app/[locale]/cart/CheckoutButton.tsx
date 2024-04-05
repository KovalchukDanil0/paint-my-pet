"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import axios from "axios";
import { Button } from "flowbite-react";

type Props = { price: number; items: CartItemWithProduct[] };

async function fetchPrices(
  e: React.MouseEvent<HTMLButtonElement>,
  price: number,
  products: string,
) {
  e.preventDefault();

  const { data } = await axios.post(
    "/api/payment",
    {
      price,
      products,
      link: window.location.href,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  window.location.assign(data);
}

export default function CheckoutButton({ price, items }: Readonly<Props>) {
  const productsInCart = items.map((item) => item.product.name).join(", ");

  function fetchPricesButton(e: React.MouseEvent<HTMLButtonElement>) {
    fetchPrices(e, price, productsInCart);
  }

  return (
    <div>
      <Button onClick={fetchPricesButton} className="sm:w-52">
        Checkout
      </Button>
    </div>
  );
}
