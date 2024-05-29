"use client";

import SelectFromObject from "@/components/SelectFromEnum";
import { createClient } from "@/lib/supabase/client";
import { ChangeEvent } from "react";
import { FileInput, Input } from "react-daisyui";

type Props = {
  countries: string[];
};

async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
  const file = event.currentTarget.files![0];

  const supabase = createClient();

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
}

export default function BuyItNow({ countries }: Readonly<Props>) {
  return (
    <div className="md:m-36">
      <form className="flex flex-col gap-5" action="">
        <div>
          <label htmlFor="name-box" className="text-base font-bold">
            Name<span className="text-red-500">*</span>
          </label>
          <div id="name-box" className="flex gap-5">
            <div className="flex w-full flex-col">
              <Input id="name-first" name="name-first" required type="text" />
              <label htmlFor="name-first">First</label>
            </div>
            <div className="flex w-full flex-col">
              <Input id="name-last" name="name-last" required type="text" />
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
              <Input id="address-state" name="address-state" type="text" />
              <label htmlFor="address-state">State / Province / Region</label>
            </div>
            <div className="flex flex-col">
              <Input id="address-postal" name="address-postal" type="text" />
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
        <FileInput accept="image/*" onChange={handleImageUpload} />
      </form>
    </div>
  );
}
