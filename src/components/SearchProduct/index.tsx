"use client";

import { useTranslations } from "next-intl";
import { Form, Input, InputProps } from "react-daisyui";
import { twMerge } from "tailwind-merge";
import searchProducts from "./SearchProducts";

interface Props extends InputProps {
  inNavigation?: boolean;
}

export default function SearchProduct({
  inNavigation,
  ...props
}: Readonly<Props>) {
  const t = useTranslations("Header");

  return (
    <Form
      className={twMerge(inNavigation && "hidden md:block")}
      action={searchProducts}
    >
      <Input
        {...props}
        bordered
        name="searchQuery"
        type="text"
        placeholder={t("Search")}
      />
    </Form>
  );
}
