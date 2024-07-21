import { Badge, Button, Card, Dropdown, Indicator } from "react-daisyui";
import { FaShoppingCart } from "react-icons/fa";
import { ShoppingCartProps } from "./Navbar";

export default function ShoppingCartComponent({
  cart,
  price,
}: Readonly<ShoppingCartProps>) {
  const itemsCount: number = cart?.items.length ?? 0;

  return (
    <Dropdown end>
      <Button tag="label" tabIndex={0} color="ghost" shape="circle">
        <Indicator>
          <Badge size="sm" className={Indicator.Item.className()}>
            {itemsCount}
          </Badge>
          <FaShoppingCart />
        </Indicator>
      </Button>
      <Dropdown.Menu className="card card-compact z-10 mt-3 w-52 !p-0">
        <Card.Body>
          <span className="text-lg font-bold">{itemsCount} Items</span>
          <span className="text-info">Subtotal: {price}</span>
          <Card.Actions>
            <Button tag="a" href="/cart" color="primary" fullWidth>
              View cart
            </Button>
          </Card.Actions>
        </Card.Body>
      </Dropdown.Menu>
    </Dropdown>
  );
}
