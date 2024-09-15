"use client";

import { useTranslations } from "next-intl";
import { Tooltip, TooltipProps } from "react-daisyui";
import { twMerge } from "tailwind-merge";

export default function Disclaimer({
  message,
  className,
  ...props
}: Readonly<TooltipProps>) {
  const t = useTranslations("Disclaimers");
  const disclaimer = t(message);

  return (
    <sup>
      <Tooltip
        {...props}
        className={twMerge("select-none", className)}
        id="disclaimer"
        message={disclaimer}
      >
        {message}
      </Tooltip>
    </sup>
  );
}
