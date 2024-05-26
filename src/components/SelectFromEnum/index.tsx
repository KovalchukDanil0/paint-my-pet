"use client";

import { Select, SelectProps } from "react-daisyui";

interface Props extends SelectProps {
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
          return <></>;
        }
        return <Select.Option key={num}>{num}</Select.Option>;
      })}
    </Select>
  );
}
