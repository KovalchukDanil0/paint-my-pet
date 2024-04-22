import Billboard from "@/components/Billboard";
import ProductsCarousel from "@/components/ProductsCarousel";
import SectionHeading from "@/components/SectionHeading";
import YouTubeVideo from "@/components/YouTubeVideo";
import { prisma } from "@/lib/db/prisma";
import { getTranslations } from "next-intl/server";
import "react-multi-carousel/lib/styles.css";

export default async function Home() {
  const t = await getTranslations("Home");
  const products = await prisma.product.findMany({ orderBy: { id: "desc" } });

  return (
    <div>
      <Billboard
        btnText={t("BBBuyCTA")}
        src="/painting1.jpg"
        alt="Test Billboard"
      >
        <h1
          style={{
            animation: "IridescentColor 30s ease infinite",
            backgroundSize: "400% 400%",
          }}
        >
          {t("BBTitle")}
        </h1>
        <p>{t("BBBuyText")}</p>
      </Billboard>
      <SectionHeading text="See the collection" />
      <ProductsCarousel products={products} />
      <SectionHeading text="See the video" />
      <YouTubeVideo videoID="Bv__4y2cyMk" />
    </div>
  );
}
