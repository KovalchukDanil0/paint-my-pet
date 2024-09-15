"use server";

import Billboard from "@/components/Billboard";
import Disclaimer from "@/components/Disclaimer";
import DisclaimerAccordion from "@/components/DisclaimerAccordion";
import ProductInformation from "@/components/ProductInformation";
import ProductsCarousel from "@/components/ProductsCarousel";
import ReactVideo from "@/components/ReactVideo";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "lib/db/prisma";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("Home");
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <>
      <Billboard
        btnText={t("BBBuyCTA")}
        src="/interior-dog-portrait.jpg"
        alt="Test Billboard"
        offsetY={25}
      >
        <h2 className="text-black">{t("BBTitle")}</h2>
        <h3 className="text-slate-700">
          {t("BBBuyText")}
          <Disclaimer message="click" />
        </h3>
      </Billboard>

      <ProductInformation />

      <SectionHeading text={t("ViewCollection")} />
      <ProductsCarousel products={products} className="px-10" showButton />
      <SectionHeading text={t("SeeTheVideo")} />
      <ReactVideo videoID="LXtfbkymhII" />

      <DisclaimerAccordion />
    </>
  );
}
