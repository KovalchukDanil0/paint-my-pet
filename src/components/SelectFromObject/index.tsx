"use client";

import { ReactElement } from "react";
import { Select, SelectProps } from "react-daisyui";

interface Props extends Omit<SelectProps, "children"> {
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

        return (isNaN(Number(num)) && (
          <Select.Option key={num}>{num}</Select.Option>
        )) as ReactElement;
      })}
    </Select>
  );
}
