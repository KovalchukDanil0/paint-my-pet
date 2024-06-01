"use server";

import { getCart } from "@/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import { Countries } from "@/lib/shared";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { getLocale } from "next-intl/server";
import BuyItNow from "./BuyItNow";
import CartEntry from "./CartEntry";

const axios = setupCache(Axios.create());

export default async function CartPage() {
  const cart = await getCart();
  const locale = await getLocale();
  const subtotalPrice = await FormatPrice(cart?.subtotal ?? 0, locale);

  const countriesResponse: Countries = await axios.get(
    "https://restcountries.com/v3.1/independent?status=true&fields=name",
    {},
  );
  const countries = countriesResponse.data
    .map((country) => country.name.common)
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className="m-7 md:m-11">
      <h1 className="mb-6 text-center text-3xl font-bold">Your cart</h1>
      <div className="flex flex-row flex-wrap gap-9">
        {cart?.items.map(async (cartItem) => {
          const price = String(
            await FormatPrice(cartItem.product.price, locale),
          );
          return (
            <CartEntry cartItem={cartItem} key={cartItem.id} price={price} />
          );
        })}
      </div>

      {cart?.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
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
