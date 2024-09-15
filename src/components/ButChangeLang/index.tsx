"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { Dropdown, DropdownProps } from "react-daisyui";

interface Props extends DropdownProps {
  locale: string;
}

let butValue: string;
let butText: string;

export default function ButChangeLang({ locale, ...props }: Readonly<Props>) {
  const pathname: string = usePathname();
  const router = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  function changeLanguage() {
    const fullPath = `${pathname}?${searchParams}`.replace(
      /^\/\w\w/gm,
      `/${butValue}`,
    );

    router.replace<any>(fullPath);
  }

  if (locale === "en") {
    butValue = "cz";
    butText = "CZ";
  } else {
    butValue = "en";
    butText = "EN";
  }

  return (
    <Dropdown.Item {...props} onClick={changeLanguage}>
      {butText}
    </Dropdown.Item>
  );
}
