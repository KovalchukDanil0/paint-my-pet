"use client";

import ProductsCarousel from "@/components/ProductsCarousel";
import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import { parse } from "path";
import { Button, Checkbox, Link, Mask, Modal, Table } from "react-daisyui";
import { FaTimes } from "react-icons/fa";

type Props = {
  order: Prisma.OrderUncheckedCreateInput;
  userImage: string;
  products: Product[];
};

export default function TableRow({
  order,
  userImage,
  products,
}: Readonly<Props>) {
  const { Dialog, handleShow } = Modal.useDialog();

  return (
    <Table.Row>
      <Checkbox />
      <div className="flex items-center space-x-3 truncate">
        <Mask className="size-16" variant="squircle" src={userImage} />

        <div>
          <div className="font-bold">{order.nameFirst}</div>
          <div className="text-sm opacity-50">{order.nameLast}</div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link color="primary" href={`mailto:${order.email}`}>
          {order.email}
        </Link>

        <Link color="primary" href={`tel:${order.phone}`}>
          {order.phone}
        </Link>
      </div>
      <p className="row-start-1 md:col-span-2">{order.address}</p>
      <Button color="ghost" size="xs" onClick={handleShow}>
        details
      </Button>
      <Dialog className="w-11/12 max-w-5xl" backdrop>
        <form method="dialog" className="sticky top-0 z-10">
          <Button
            size="sm"
            color="ghost"
            shape="circle"
            className="absolute right-2 top-2"
          >
            <FaTimes />
          </Button>
        </form>

        <Modal.Header className="font-bold">
          Details of {order.nameFirst} {order.nameLast}
        </Modal.Header>
        <Modal.Body className="mx-5">
          <div className="flex items-center justify-around space-x-3 truncate">
            <Mask className="size-16" variant="squircle" src={userImage} />

            <div className="basis-1/2">
              <div className="font-bold">{order.nameFirst}</div>
              <div className="text-sm opacity-50">{order.nameLast}</div>
            </div>

            <div className="flex flex-col gap-3">
              <Link color="primary" href={`mailto:${order.email}`}>
                {order.email}
              </Link>

              <Link color="primary" href={`tel:${order.phone}`}>
                {order.phone}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-3 gap-3">
            <p className="col-span-2 row-start-1">
              Full Address: {order.address}
            </p>
            <p>City: {order.addressCity}</p>
            <p>State: {order.addressState}</p>
            <p>Postal: {order.addressPostal}</p>
            <p>Country: {order.addressCountry}</p>
          </div>

          <ProductsCarousel products={products} />

          {order.imagePath && (
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${order.imagePath}`}
              alt={parse(order.imagePath).base}
              width={750}
              height={750}
            />
          )}
        </Modal.Body>
        <Modal.Actions></Modal.Actions>
      </Dialog>
    </Table.Row>
  );
}
