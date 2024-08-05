"use client";

import SelectFromObject from "@/components/SelectFromObject";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useLocale } from "next-intl";
import { Button, FileInput, Input, Modal } from "react-daisyui";
import { FaTimes } from "react-icons/fa";
import { fillTheForm } from "./action";

const axios = setupCache(Axios.create());

async function fetchPrices(locale: string) {
  const { data } = await axios.post(
    "/api/payment",
    {
      link: window.location.href,
      locale,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  window.location.assign(data);
}

type Props = {
  subtotalPrice: string | number;
  countries: string[];
};

export default function BuyItNow({
  subtotalPrice,
  countries,
}: Readonly<Props>) {
  const locale = useLocale();

  const { Dialog, handleShow } = Modal.useDialog();

  return (
    <div>
      <Button color="primary" className="center" onClick={handleShow}>
        Proceed to checkout
      </Button>

      <Dialog className="w-11/12 max-w-5xl" backdrop>
        <form method="dialog" className="sticky top-0">
          <Button
            size="sm"
            color="ghost"
            shape="circle"
            className="absolute right-2 top-2"
          >
            <FaTimes />
          </Button>
        </form>

        <Modal.Header className="font-bold">Please fill the form</Modal.Header>

        <form
          method="post"
          encType="multipart/form-data"
          action={fillTheForm}
          onSubmit={() => fetchPrices(locale)}
        >
          <Modal.Body>
            <div className="flex flex-col gap-3 md:m-36">
              <div className="flex flex-col">
                <label htmlFor="name-box" className="text-base font-bold">
                  Name<span className="text-red-500">*</span>
                </label>
                <div id="name-box" className="flex gap-5">
                  <div className="flex w-full flex-col">
                    <Input
                      id="name-first"
                      name="name-first"
                      required
                      type="text"
                    />
                    <label htmlFor="name-first">First</label>
                  </div>
                  <div className="flex w-full flex-col">
                    <Input
                      id="name-last"
                      name="name-last"
                      required
                      type="text"
                    />
                    <label htmlFor="name-last">Last</label>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="email" className="text-base font-bold">
                  Email<span className="text-red-500">*</span>
                </label>
                <Input id="email" name="email" required type="email" />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="phone" className="text-base font-bold">
                  Phone<span className="text-red-500">*</span>
                </label>
                <Input id="phone" name="phone" required type="tel" />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="address" className="text-base font-bold">
                  Address<span className="text-red-500">*</span>
                </label>
                <Input id="address" name="address" required type="text" />
              </div>
              <div>
                <label htmlFor="address-container">Address Details</label>
                <div id="address-container" className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <Input
                      id="address-city"
                      name="address-city"
                      type="text"
                      required
                    />
                    <label htmlFor="address-city">City</label>
                  </div>
                  <div className="flex flex-col">
                    <Input
                      id="address-state"
                      name="address-state"
                      type="text"
                      required
                    />
                    <label htmlFor="address-state">
                      State / Province / Region
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <Input
                      id="address-postal"
                      name="address-postal"
                      type="text"
                      required
                    />
                    <label htmlFor="address-postal">Postal Code</label>
                  </div>
                  <div className="flex flex-col">
                    <SelectFromObject
                      required
                      id="address-country"
                      name="address-country"
                      obj={countries}
                    />
                    <label htmlFor="address-country">Country</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <FileInput
                  id="file-input"
                  name="file-input"
                  accept="image/*"
                  required
                />
              </div>
            </div>
          </Modal.Body>

          <Modal.Actions>
            <div className="flex flex-col">
              <p className="mb-3 font-bold">Total: {subtotalPrice}</p>
              <Button color="primary">Submit the form</Button>
            </div>
          </Modal.Actions>
        </form>
      </Dialog>
    </div>
  );
}
