"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, ReactElement, useTransition } from "react";
import { Select } from "react-daisyui";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactElement[];
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Readonly<Props>) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onSelectChange({
    target: { value: locale },
  }: ChangeEvent<HTMLSelectElement>) {
    startTransition(() => {
      router.replace<any>(`${pathname}?${searchParams.toString()}`, {
        locale,
      });
    });
  }

  return (
    <label
      className={twMerge(
        "relative text-gray-400",
        isPending && "transition-opacity [&:disabled]:opacity-30",
      )}
    >
      <p className="sr-only">{label}</p>
      <Select
        className="bg-transparent"
        bordered={false}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </Select>
    </label>
  );
}
