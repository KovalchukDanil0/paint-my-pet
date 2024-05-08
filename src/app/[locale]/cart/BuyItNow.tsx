import SelectFromEnum from "@/components/SelectFromEnum";
import { Countries } from "@/lib/shared";
import { Label, TextInput } from "flowbite-react";

type Props = {
  countries: Countries;
};

export default function BuyItNowPage({ countries }: Readonly<Props>) {
  const countriesNames = countries.data
    .map((country) => country.name.common)
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className="m-36">
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
              <SelectFromEnum
                required
                name="address-country"
                enumObj={countriesNames}
              />
              <Label>Country</Label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
