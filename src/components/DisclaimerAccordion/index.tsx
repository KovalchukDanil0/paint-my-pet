"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionProps } from "react-daisyui";
import { twMerge } from "tailwind-merge";

interface Props extends AccordionProps {}

export default function DisclaimerAccordion({
  className,
  ...props
}: Readonly<Props>) {
  const [disclaimerList, setDisclaimerList] =
    useState<NodeListOf<HTMLElement>>();

  useEffect(() => {
    async function getDisclaimers() {
      const disclaimers = document.querySelectorAll<HTMLElement>("#disclaimer");
      setDisclaimerList(disclaimers);
    }

    if (!disclaimerList) {
      getDisclaimers();
    }
  }, [disclaimerList]);

  if (!disclaimerList || disclaimerList.length === 0) {
    return false;
  }

  return (
    <Accordion {...props} className={twMerge(className, "w-auto")} icon="arrow">
      <Accordion.Title className="text-xl font-medium">
        Click to open disclaimers
      </Accordion.Title>
      <Accordion.Content>
        <div className="flex flex-col gap-3">
          {Array.from(disclaimerList).map((item) => (
            <p key={item.textContent}>
              {item.textContent}: {item.getAttribute("data-tip")}
            </p>
          ))}
        </div>
      </Accordion.Content>
    </Accordion>
  );
}
