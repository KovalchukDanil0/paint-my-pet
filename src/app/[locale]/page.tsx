"use server";

import Billboard from "@/components/Billboard";
import Disclaimer from "@/components/Disclaimer";
import ProductsCarousel from "@/components/ProductsCarousel";
import ReactVideo from "@/components/ReactVideo";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/db/prisma";
import { getTranslations } from "next-intl/server";
import "react-multi-carousel/lib/styles.css";

export default async function Home() {
  const t = await getTranslations("Home");
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div>
      <Billboard
        btnText={t("BBBuyCTA")}
        src="/interior-dog-portrait.jpg"
        alt="Test Billboard"
        offsetY={25}
      >
        <h2 className="text-black">{t("BBTitle")}</h2>
        <h3 className="my-10 center">
          Get the most beautiful painting of all ages
          <Disclaimer name="test" /> ggg hhh jjj
        </h3>
      </Billboard>

      <SectionHeading text="View collection" />
      <ProductsCarousel products={products} />
      <SectionHeading text="See the video" />
      <ReactVideo videoID="kRQhapTU_OQ" />
    </div>
  );
}
