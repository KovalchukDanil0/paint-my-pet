"use client";

import { Prisma } from "@prisma/client";
import { MouseEvent, useEffect } from "react";
import { Checkbox, Table } from "react-daisyui";
import { ProductKeyType } from "./page";
import TableRow from "./TableRow";

let checkboxes: NodeListOf<HTMLInputElement> | null = null;

function checkAll(ev: MouseEvent<HTMLInputElement>) {
  checkboxes?.forEach(
    (checkbox) => (checkbox.checked = ev.currentTarget.checked),
  );
}

type Props = {
  orders: Prisma.OrderUncheckedCreateInput[];
  products: ProductKeyType;
};

export default function OrdersPageClient({
  orders,
  products,
}: Readonly<Props>) {
  useEffect(() => {
    checkboxes = document.querySelectorAll(".checkbox");
  }, []);

  return (
    <div className="m-10 overflow-x-auto">
      <Table className="rounded-box">
        <Table.Head>
          <Checkbox onClick={checkAll} />
          <span>Name</span>
          <span>Contact Info</span>
          <span>Address</span>
          <span />
        </Table.Head>

        <Table.Body className="table-body">
          {orders.map((order) => {
            if (!order.id) {
              return false;
            }

            return (
              <TableRow
                key={order.id}
                order={order}
                userImage={products[order.id].userImage}
                products={products[order.id].products}
              />
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
