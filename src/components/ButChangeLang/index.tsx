"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Dropdown, DropdownProps } from "react-daisyui";

interface Props extends DropdownProps {
  locale: string;
}

let butValue: string;
let butText: string;

export default function ButChangeLang({ locale, ...props }: Readonly<Props>) {
  const pathname: string = usePathname();
  const router: AppRouterInstance = useRouter();
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  function ChangeLanguage() {
    const fullPath = `${pathname}?${searchParams}`.replace(
      /^\/\w\w/gm,
      `/${butValue}`,
    );

    router.replace(fullPath);
  }

  if (locale === "en") {
    butValue = "cz";
    butText = "CZ";
  } else {
    butValue = "en";
    butText = "EN";
  }

  return (
    <Dropdown.Item {...props} onClick={ChangeLanguage}>
      {butText}
    </Dropdown.Item>
  );
}
