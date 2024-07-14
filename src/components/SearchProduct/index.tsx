"use client";

import { Form, Input, InputProps } from "react-daisyui";
import searchProducts from "./SearchProducts";

interface Props extends InputProps {
  inNavigation?: boolean;
}

export default function SearchProduct({
  inNavigation,
  ...props
}: Readonly<Props>) {
  return (
    <Form
      className={inNavigation ? "hidden md:block" : ""}
      action={searchProducts}
    >
      <Input
        {...props}
        bordered
        name="searchQuery"
        type="text"
        placeholder="Search"
      />
    </Form>
  );
}
