"use client";

import { useTranslations } from "next-intl";
import { FaImage, FaTruck } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

export default function ProductInformation() {
  const t = useTranslations("ProductInformation");

  return (
    <div className="flex flex-row justify-around gap-5 bg-slate-300 px-10 py-10 md:px-36 dark:bg-slate-800">
      <div className="flex w-1/3 flex-col">
        <FaImage className="size-9 md:size-14" />
        <h3>
          <b>{t("HandCraftedHeading")}</b>
        </h3>
        <p>{t("HandCraftedDescription")}</p>
      </div>
      <div className="flex w-1/3 flex-col">
        <IoPerson className="size-9 md:size-14" />
        <h3>
          <b>{t("ArtistsHeading")}</b>
        </h3>
        <p>{t("ArtistsDescription")}</p>
      </div>
      <div className="flex w-1/3 flex-col">
        <FaTruck className="size-9 md:size-14" />
        <h3>
          <b>{t("ShoppingHeading")}</b>
        </h3>
        <p>{t("ShoppingDescription")}</p>
      </div>
    </div>
  );
}
