"use server";

import { getCart } from "@/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import { Countries } from "@/lib/shared";
import axios from "axios";
import { getLocale } from "next-intl/server";
import BuyItNowPage from "./BuyItNow";
import CartEntry from "./CartEntry";
import CheckoutButton from "./CheckoutButton";

export default async function CartPage() {
  const cart = await getCart();
  const locale = await getLocale();
  const subtotalPrice = await FormatPrice(cart?.subtotal ?? 0, locale);
  const countries: Countries = await axios.get(
    "https://restcountries.com/v3.1/independent?status=true&fields=name",
  );

  return (
    <div className="m-7 md:m-11">
      <h1 className="mb-6 text-center text-3xl font-bold">Your cart</h1>
      <div className="flex flex-row flex-wrap gap-9">
        {cart?.items.map(async (cartItem) => {
          const price = await FormatPrice(cartItem.product.price, locale);
          return (
            <CartEntry cartItem={cartItem} key={cartItem.id} price={price} />
          );
        })}
      </div>

      {cart?.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <BuyItNowPage countries={countries} />
          <div className="flex flex-col items-end sm:items-center">
            <p className="mb-3 font-bold">Total: {subtotalPrice}</p>
            <CheckoutButton locale={locale} />
          </div>
        </div>
      )}
    </div>
  );
}
