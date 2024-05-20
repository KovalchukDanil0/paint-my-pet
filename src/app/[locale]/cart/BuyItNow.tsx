"use client";

import SelectFromObject from "@/components/SelectFromEnum";
import { createClient } from "@supabase/supabase-js";
import { FileInput, Label, TextInput } from "flowbite-react";
import { ChangeEvent } from "react";

type Props = {
  countries: string[];
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.currentTarget.files![0];

  const auth = await supabase.auth.getUser();

  console.log(`${auth.data.user?.id}/${file.name}`);

  const storage = await supabase.storage
    .from("images")
    .upload(`${auth.data.user?.id}/${file.name}`, file);

  if (storage.error != null) {
    throw new Error(storage.error.message);
  }
};

export default function BuyItNow({ countries }: Readonly<Props>) {
  return (
    <div className="md:m-36">
      <form className="flex flex-col gap-5" action="">
        <div>
          <Label className="text-base font-bold">
            Name<span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-5">
            <div className="w-full">
              <TextInput name="name-first" required type="text" />
              <Label>First</Label>
            </div>
            <div className="w-full">
              <TextInput name="name-last" required type="text" />
              <Label>Last</Label>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Label className="text-base font-bold">
            Email<span className="text-red-500">*</span>
          </Label>
          <TextInput name="email" required type="email" />
        </div>
        <div className="w-full">
          <Label className="text-base font-bold">
            Phone<span className="text-red-500">*</span>
          </Label>
          <TextInput name="phone" required type="tel" />
        </div>
        <div className="w-full">
          <Label className="text-base font-bold">
            Address<span className="text-red-500">*</span>
          </Label>
          <TextInput name="address" required type="text" />
        </div>
        <div className="w-full">
          <Label>Address Line 1</Label>
          <TextInput name="address-full" type="text" />
        </div>
        <div>
          <Label>Address Line 2</Label>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <TextInput name="address-city" type="text" />
              <Label>City</Label>
            </div>
            <div>
              <TextInput name="address-state" type="text" />
              <Label>State / Province / Region</Label>
            </div>
            <div>
              <TextInput name="address-postal" type="text" />
              <Label>Postal Code</Label>
            </div>
            <div>
              <SelectFromObject
                required
                name="address-country"
                obj={countries}
              />
              <Label>Country</Label>
            </div>
          </div>
        </div>
        <FileInput accept="image/*" onChange={handleImageUpload} />
      </form>
    </div>
  );
}
