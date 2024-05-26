"use client";

import axios from "axios";
import { MouseEvent } from "react";
import { Button } from "react-daisyui";

async function fetchPrices(e: MouseEvent<HTMLButtonElement>, locale: string) {
  e.preventDefault();

  const { data } = await axios.post(
    "/api/payment",
    {
      link: window.location.href,
      locale,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  window.location.assign(data);
}

type Props = {
  locale: string;
};

export default function CheckoutButton({ locale }: Readonly<Props>) {
  return (
    <div>
      <Button
        onClick={(ev: MouseEvent<HTMLButtonElement>) => fetchPrices(ev, locale)}
        className="sm:w-52"
      >
        Checkout
      </Button>
    </div>
  );
}
