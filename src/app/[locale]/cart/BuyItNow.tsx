"use client";

import FormRequiredField from "@/components/FormRequiredField";
import SelectFromObject from "@/components/SelectFromObject";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useLocale } from "next-intl";
import { useTransition } from "react";
import { Button, FileInput, Input, Loading, Modal } from "react-daisyui";
import { FaTimes } from "react-icons/fa";
import { fillTheForm } from "./action";

const axios = setupCache(Axios.create());

type Props = {
  subtotalPrice: string | number;
  countries: string[];
};

export default function BuyItNow({
  subtotalPrice,
  countries,
}: Readonly<Props>) {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const { Dialog, handleShow, handleHide } = Modal.useDialog();

  async function fetchPrices(formData: FormData) {
    startTransition(async function () {
      await fillTheForm(formData);

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
    });
  }

  return (
    <div>
      <Button color="primary" className="center" onClick={handleShow}>
        Proceed to checkout {isPending && <Loading />}
      </Button>

      <Dialog className="w-11/12 max-w-5xl" backdrop>
        <div className="sticky top-0">
          <Button
            onClick={handleHide}
            size="sm"
            color="ghost"
            shape="circle"
            className="absolute right-2 top-2"
          >
            <FaTimes />
          </Button>
        </div>

        <Modal.Header className="font-bold">Please fill the form</Modal.Header>

        <form action={fetchPrices}>
          <Modal.Body>
            <div className="flex flex-col gap-3 md:m-36">
              <div className="flex flex-col">
                <label htmlFor="name-box" className="text-base font-bold">
                  Name
                </label>
                <div id="name-box" className="flex gap-5">
                  <div className="flex w-full flex-col">
                    <Input
                      id="name-first"
                      name="name-first"
                      required
                      type="text"
                    />
                    <label htmlFor="name-first">
                      First
                      <FormRequiredField />
                    </label>
                  </div>
                  <div className="flex w-full flex-col">
                    <Input
                      id="name-last"
                      name="name-last"
                      required
                      type="text"
                    />
                    <label htmlFor="name-last">
                      Last
                      <FormRequiredField />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="email" className="text-base font-bold">
                  Email
                  <FormRequiredField />
                </label>
                <Input id="email" name="email" required type="email" />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="phone" className="text-base font-bold">
                  Phone
                  <FormRequiredField />
                </label>
                <Input id="phone" name="phone" required type="tel" />
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="address" className="text-base font-bold">
                  Address
                  <FormRequiredField />
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
                    <label htmlFor="address-city">
                      City
                      <FormRequiredField />
                    </label>
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
                      <FormRequiredField />
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <Input
                      id="address-postal"
                      name="address-postal"
                      type="text"
                      required
                    />
                    <label htmlFor="address-postal">
                      Postal Code
                      <FormRequiredField />
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <SelectFromObject
                      required
                      id="address-country"
                      name="address-country"
                      enumObj={countries}
                    />
                    <label htmlFor="address-country">
                      Country
                      <FormRequiredField />
                    </label>
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
                <FormRequiredField />
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
