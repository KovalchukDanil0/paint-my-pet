"use client";

import { useTranslations } from "next-intl";
import { Tooltip, TooltipProps } from "react-daisyui";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<TooltipProps, "message"> {
  name: string;
}

export default function Disclaimer({
  name,
  className,
  ...props
}: Readonly<Props>) {
  const t = useTranslations("Disclaimers");
  const disclaimer = t(name);

  return (
    <sup>
      <Tooltip
        {...props}
        className={twMerge("select-none", className)}
        id="disclaimer"
        message={disclaimer}
      >
        {name}
      </Tooltip>
    </sup>
  );
}
