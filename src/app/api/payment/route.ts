import { ShoppingCart, getCart } from "@/lib/db/cart";
import { localeToCurrency } from "@/lib/format";
import axios from "axios";
import Big from "big.js";
import { convert } from "cashify";
import { Rates } from "cashify/dist/lib/options";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export type routeData = {
  link: string;
  locale: string;
};

export async function POST(request: NextRequest) {
  const cart: ShoppingCart = await getCart();

  if (cart.items.length === 0) {
    throw new Error("There are no items in cart");
  }

  const stripe: Stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const requestData: routeData = await request.json();
  const currency = localeToCurrency(requestData.locale);

  const {
    data: { rates },
  }: { data: { rates: Rates } } = await axios.get(
    "https://open.er-api.com/v6/latest/EUR",
  );

  const unit_amount: number = Math.round(
    convert(cart.subtotal, {
      rates,
      base: "EUR",
      from: "EUR",
      to: currency,
      BigJs: Big,
    }),
  );

  const nickname: string = cart.items
    .map((item) => item.product.name)
    .join(", ");

  const link: string = requestData.link;

  const price: Stripe.Price = await stripe.prices.create({
    nickname,
    unit_amount,
    currency,
    product: "prod_PqAA86kBDBjhuO",
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: price.id, quantity: 1 }],
    custom_text: {
      after_submit: { message: `Total products: ${nickname}` },
    },
    mode: "payment",
    cancel_url: link,
    success_url: link,
  });

  return NextResponse.json(session.url);
}
