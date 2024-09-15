"use server";

import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { getCart } from "lib/db/cart";
import { formatPrice } from "lib/format";
import { Countries } from "lib/shared";
import { getLocale } from "next-intl/server";
import BuyItNow from "./BuyItNow";
import CartEntry from "./client";

const axios = setupCache(Axios.create());

export default async function CartPage() {
  const { items, subtotal } = await getCart();
  const locale = await getLocale();
  const subtotalPrice = await formatPrice(subtotal ?? 0, locale);

  const { data: countriesResponse }: Countries = await axios.get(
    "https://restcountries.com/v3.1/independent?status=true&fields=name",
    {},
  );
  const countries = countriesResponse
    .map((country) => country.name.common)
    .sort((a, b) => a.localeCompare(b));

  const isCartEmpty = items.length === 0;

  return (
    <div className="m-7 md:m-11">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Your cart {isCartEmpty && " is empty"}
      </h1>
      <div className="flex flex-row flex-wrap gap-9">
        {items.map(async (cartItem) => {
          const price = String(
            await formatPrice(cartItem.product.price, locale),
          );
          return (
            <CartEntry cartItem={cartItem} key={cartItem.id} price={price} />
          );
        })}
      </div>

      {!isCartEmpty && (
        <div>
          <div className="flex flex-col items-end sm:items-center">
            <p className="mb-3 font-bold">Total: {subtotalPrice}</p>
            <BuyItNow subtotalPrice={subtotalPrice} countries={countries} />
          </div>
        </div>
      )}
    </div>
  );
}
