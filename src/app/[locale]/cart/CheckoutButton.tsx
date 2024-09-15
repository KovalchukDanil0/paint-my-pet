"use client";

import axios from "axios";
import { useCallback } from "react";
import { Button } from "react-daisyui";

async function fetchPrices(locale: string) {
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
  const fetchPricesFunc = useCallback(
    () => () => fetchPrices(locale),
    [locale],
  );

  return (
    <div>
      <Button onClick={fetchPricesFunc} className="sm:w-52">
        Checkout
      </Button>
    </div>
  );
}
