import axios from "axios";
import Big from "big.js";
import { convert } from "cashify";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export type routeData = {
  price: number;
  products: string;
  link: string;
  currency: string;
};

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const requestData: routeData = await request.json();

  const {
    data: { rates },
  } = await axios.get("https://open.er-api.com/v6/latest/EUR");

  const unit_amount = convert(requestData.price, {
    rates,
    base: "EUR",
    from: "EUR",
    to: requestData.currency,
    BigJs: Big,
  });

  const nickname = requestData.products;
  const link = requestData.link;

  //! user can manipulate the price of the product - not pass value to the route

  const price: Stripe.Price = await stripe.prices.create({
    nickname,
    unit_amount,
    product: "prod_PqAA86kBDBjhuO",
    currency: requestData.currency,
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
