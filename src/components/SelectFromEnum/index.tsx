"use client";

import { Select } from "flowbite-react";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"select"> {
  obj: object;
}

export default function SelectFromObject({
  obj: enumObj,
  ...props
}: Readonly<Props>) {
  return (
    <Select {...props}>
      {Object.keys(enumObj).map((val) => {
        const num = enumObj[val as keyof typeof enumObj];
        if (!isNaN(Number(num))) {
          return;
        }
        return <option key={num}>{num}</option>;
      })}
    </Select>
  );
}
