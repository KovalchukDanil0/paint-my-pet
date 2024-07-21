"use client";

import { Prisma } from "@prisma/client";
import { Link } from "react-daisyui";

type Props = {
  orders: Prisma.OrderUncheckedCreateInput[];
};

export default function OrdersPageClient({ orders }: Readonly<Props>) {
  return (
    <div className="m-10 flex flex-col gap-5">
      {orders.map((order) => (
        <div key={order.id} className="flex flex-col gap-1">
          <p>{order.nameFirst}</p>
          <p>{order.nameLast}</p>
          <Link color="primary" href={`mailto:${order.email}`}>
            {order.email}
          </Link>
          <Link color="primary" href={`tel:${order.phone}`}>
            {order.phone}
          </Link>
          <p>{order.address}</p>
          <p>{order.addressCity}</p>
          <p>{order.addressState}</p>
          <p>{order.addressPostal}</p>
          <p>{order.addressCountry}</p>
        </div>
      ))}
    </div>
  );
}
