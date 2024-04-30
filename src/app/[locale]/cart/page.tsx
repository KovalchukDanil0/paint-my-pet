import { getCart } from "@/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import CartEntry from "./CartEntry";
import CheckoutButton from "./CheckoutButton";

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="m-7 md:m-11">
      <h1 className="mb-6 text-center text-3xl font-bold">Your cart</h1>
      <div className="flex flex-row flex-wrap gap-9">
        {cart?.items.map((cartItem) => (
          <CartEntry cartItem={cartItem} key={cartItem.id} />
        ))}
      </div>
      {cart?.items == null ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex flex-col items-end sm:items-center">
          <p className="mb-3 font-bold">
            Total: {FormatPrice(cart?.subtotal ?? 0)}
          </p>
          <CheckoutButton items={cart?.items} price={cart?.subtotal} />
        </div>
      )}
    </div>
  );
}
