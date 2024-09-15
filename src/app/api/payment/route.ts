import { ShoppingCart, getCart } from "lib/db/cart";
import { formatPrice, localeToCurrency } from "lib/format";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export type routeData = {
  link: string;
  locale: string;
};

export async function POST(request: NextRequest) {
  const { items, subtotal }: ShoppingCart = await getCart();

  if (items.length === 0) {
    throw new Error("There are no items in cart");
  }

  const { prices, checkout }: Stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY,
  );
  const { locale, link }: routeData = await request.json();
  const currency = localeToCurrency(locale);

  const unit_amount = Number(await formatPrice(subtotal, locale, false));

  const nickname: string = items.map((item) => item.product.name).join(", ");

  const price: Stripe.Price = await prices.create({
    nickname,
    unit_amount,
    currency,
    product: "prod_PqAA86kBDBjhuO",
  });

  const session = await checkout.sessions.create({
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
