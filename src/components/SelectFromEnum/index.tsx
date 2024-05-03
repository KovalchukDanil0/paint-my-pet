"use client";

import { Select } from "flowbite-react";
import { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  enumObj: object;
}

export default function SelectFromEnum({ enumObj, ...props }: Readonly<Props>) {
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
