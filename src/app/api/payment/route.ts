import { ShoppingCart, getCart } from "@/lib/db/cart";
import { FormatPrice, localeToCurrency } from "@/lib/format";
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

  const unit_amount = Number(
    await FormatPrice(cart.subtotal, requestData.locale, false),
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
