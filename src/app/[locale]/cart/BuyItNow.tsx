"use client";

import SelectFromObject from "@/components/SelectFromEnum";
import { createClient } from "@/lib/supabase/client";
import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useLocale } from "next-intl";
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useRef,
  useTransition,
} from "react";
import { Button, FileInput, Input, Loading, Modal } from "react-daisyui";
import { FaTimes } from "react-icons/fa";

const axios = setupCache(Axios.create());

async function fetchPrices(e: MouseEvent<HTMLButtonElement>, locale: string) {
  e.preventDefault();

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
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDialogElement>(null);
  const locale = useLocale();

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files![0];

    const supabase = createClient();

    startTransition(async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error != null || data.user == null) {
        throw new Error(error?.message);
      }

      const path = `${data.user?.id}/${file.name}`;

      const storage = await supabase.storage
        .from("images")
        .upload(path, file, { upsert: true });
      if (storage.error != null) {
        throw new Error(storage.error.message);
      }
    });
  }

  const handleShow = useCallback(async () => {
    ref.current?.showModal();
  }, [ref]);

  return (
    <div>
      <Button color="primary" className="center" onClick={handleShow}>
        Proceed to checkout
      </Button>
      <Modal className="w-11/12 max-w-5xl" ref={ref}>
        <form method="dialog">
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
        <Modal.Body>
          <div className="md:m-36">
            <form className="flex flex-col gap-5" action="">
              <div>
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
              <div className="flex w-full flex-col">
                <label htmlFor="address-full">Address Line 1</label>
                <Input id="address-full" name="address-full" type="text" />
              </div>
              <div>
                <label htmlFor="address-container">Address Line 2</label>
                <div id="address-container" className="grid grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <Input id="address-city" name="address-city" type="text" />
                    <label htmlFor="address-city">City</label>
                  </div>
                  <div className="flex flex-col">
                    <Input
                      id="address-state"
                      name="address-state"
                      type="text"
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
                <FileInput accept="image/*" onChange={handleImageUpload} />
                {isPending && <Loading />}
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Actions>
          <form>
            <p className="mb-3 font-bold">Total: {subtotalPrice}</p>
            <Button
              color="primary"
              onClick={(ev: MouseEvent<HTMLButtonElement>) =>
                fetchPrices(ev, locale)
              }
            >
              Submit the form
            </Button>
          </form>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
