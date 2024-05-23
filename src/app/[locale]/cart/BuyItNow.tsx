"use client";

import SelectFromObject from "@/components/SelectFromEnum";
import { createClient } from "@/lib/supabase/client";
import { FileInput, Label, TextInput } from "flowbite-react";
import { ChangeEvent } from "react";

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
          <Label htmlFor="name-box" className="text-base font-bold">
            Name<span className="text-red-500">*</span>
          </Label>
          <div id="name-box" className="flex gap-5">
            <div className="w-full">
              <TextInput
                id="name-first"
                name="name-first"
                required
                type="text"
              />
              <Label htmlFor="name-first">First</Label>
            </div>
            <div className="w-full">
              <TextInput id="name-last" name="name-last" required type="text" />
              <Label htmlFor="name-last">Last</Label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Label htmlFor="email" className="text-base font-bold">
            Email<span className="text-red-500">*</span>
          </Label>
          <TextInput id="email" name="email" required type="email" />
        </div>
        <div className="w-full">
          <Label htmlFor="phone" className="text-base font-bold">
            Phone<span className="text-red-500">*</span>
          </Label>
          <TextInput id="phone" name="phone" required type="tel" />
        </div>
        <div className="w-full">
          <Label htmlFor="address" className="text-base font-bold">
            Address<span className="text-red-500">*</span>
          </Label>
          <TextInput id="address" name="address" required type="text" />
        </div>
        <div className="w-full">
          <Label htmlFor="address-full">Address Line 1</Label>
          <TextInput id="address-full" name="address-full" type="text" />
        </div>
        <div>
          <Label>Address Line 2</Label>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <TextInput id="address-city" name="address-city" type="text" />
              <Label htmlFor="address-city">City</Label>
            </div>
            <div>
              <TextInput id="address-state" name="address-state" type="text" />
              <Label htmlFor="address-state">State / Province / Region</Label>
            </div>
            <div>
              <TextInput
                id="address-postal"
                name="address-postal"
                type="text"
              />
              <Label htmlFor="address-postal">Postal Code</Label>
            </div>
            <div>
              <SelectFromObject
                required
                id="address-country"
                name="address-country"
                obj={countries}
              />
              <Label htmlFor="address-country">Country</Label>
            </div>
          </div>
        </div>
        <FileInput accept="image/*" onChange={handleImageUpload} />
      </form>
    </div>
  );
}
