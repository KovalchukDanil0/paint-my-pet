"use client";

import { Prisma } from "@prisma/client";
import { MouseEvent } from "react";
import { Checkbox, Table } from "react-daisyui";
import { ProductKeyType } from "./page";
import TableRow from "./TableRow";

let checkboxes: NodeListOf<HTMLInputElement> | null = null;

function checkAll({
  currentTarget: { checked },
}: MouseEvent<HTMLInputElement>) {
  if (!checkboxes) {
    checkboxes = document.querySelectorAll(".checkbox");
  }

  checkboxes.forEach((checkbox) => (checkbox.checked = checked));
}

type Props = {
  orders: Prisma.OrderUncheckedCreateInput[];
  products: ProductKeyType;
};

export default function OrdersPageClient({
  orders,
  products,
}: Readonly<Props>) {
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
