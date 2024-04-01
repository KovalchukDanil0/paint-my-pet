import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export type routeData = {
  price: number;
  products: string;
  link: string;
};

export async function POST(request: NextRequest) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);

  const data: routeData = await request.json();
  const unit_amount = data.price;
  const nickname = data.products;
  const link = data.link;

  const price: Stripe.Price = await stripe.prices.create({
    nickname,
    unit_amount,
    product: "prod_PqAA86kBDBjhuO",
    currency: "czk",
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
