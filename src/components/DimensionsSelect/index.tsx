"use client";

import { Dimensions } from "@/lib/shared";
import { Select } from "flowbite-react";
import { ChangeEventHandler } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function DimensionsSelect(props: Readonly<Props>) {
  return (
    <Select {...props}>
      {Object.keys(Dimensions).map((dim) => {
        const num = Dimensions[dim as keyof typeof Dimensions];
        if (!isNaN(Number(num))) {
          return;
        }
        return <option key={num}>{num}</option>;
      })}
    </Select>
  );
}
