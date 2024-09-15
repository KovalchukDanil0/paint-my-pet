"use client";

import ProductsCarousel from "@/components/ProductsCarousel";
import { Prisma, Product } from "@prisma/client";
import Image from "next/image";
import { join, parse } from "path";
import { Button, Checkbox, Link, Modal, Table } from "react-daisyui";
import { FaTimes } from "react-icons/fa";
import UserImage from "./UserImage";

type Props = {
  order: Prisma.OrderUncheckedCreateInput;
  userImage: string;
  products: Product[];
};

export default function TableRow({
  order: {
    nameFirst,
    nameLast,
    email,
    phone,
    address,
    addressCity,
    addressCountry,
    addressPostal,
    addressState,
    imagePath,
  },
  userImage,
  products,
}: Readonly<Props>) {
  const { Dialog, handleShow } = Modal.useDialog();

  return (
    <Table.Row>
      <Checkbox />
      <div className="flex items-center space-x-3 truncate">
        <UserImage userImage={userImage} />

        <div>
          <div className="font-bold">{nameFirst}</div>
          <div className="text-sm opacity-50">{nameLast}</div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Link color="primary" href={`mailto:${email}`}>
          {email}
        </Link>

        <Link color="primary" href={`tel:${phone}`}>
          {phone}
        </Link>
      </div>
      <p className="row-start-1 md:col-span-2">{address}</p>
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
          Details of {nameFirst} {nameLast}
        </Modal.Header>
        <Modal.Body className="mx-5">
          <div className="flex items-center justify-around space-x-3 truncate">
            <UserImage userImage={userImage} />

            <div className="basis-1/2">
              <div className="font-bold">{nameFirst}</div>
              <div className="text-sm opacity-50">{nameLast}</div>
            </div>

            <div className="flex flex-col gap-3">
              <Link color="primary" href={`mailto:${email}`}>
                {email}
              </Link>

              <Link color="primary" href={`tel:${phone}`}>
                {phone}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-3 gap-3">
            <p className="col-span-2 row-start-1">Full Address: {address}</p>
            <p>City: {addressCity}</p>
            <p>State: {addressState}</p>
            <p>Postal: {addressPostal}</p>
            <p>Country: {addressCountry}</p>
          </div>

          <ProductsCarousel products={products} />

          {imagePath && (
            <Image
              src={join(
                process.env.NEXT_PUBLIC_SUPABASE_URL,
                "storage",
                "v1",
                "object",
                "public",
                imagePath,
              )}
              alt={parse(imagePath).base}
              width={750}
              height={750}
              className="bg-white"
            />
          )}
        </Modal.Body>
        <Modal.Actions />
      </Dialog>
    </Table.Row>
  );
}
