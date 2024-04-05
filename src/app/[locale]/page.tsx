"use client";

import Billboard from "@/components/Billboard";
import EComCard from "@/components/EComCard";
import SectionHeading from "@/components/SectionHeading";
import YouTubeVideo from "@/components/YouTubeVideo";
import { useTranslations } from "next-intl";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  const t = useTranslations("Home");

  const responsive: ResponsiveType = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

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
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="my-5"
        containerClass=""
        dotListClass=""
        draggable
        focusOnSelect={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <EComCard
          text="rrtt"
          alt="rert"
          src="/painting2.jpg"
          cost={666}
          stars={5}
        />
        <EComCard
          text="rrtt"
          alt="rert"
          src="/painting3.webp"
          cost={435}
          stars={4}
        />
        <EComCard
          text="rrtt"
          alt="rert"
          src="/painting4.webp"
          cost={700}
          stars={5}
        />
        <EComCard
          text="rrtt"
          alt="rert"
          src="/painting5.jpg"
          cost={350}
          stars={3}
        />
        <EComCard
          text="rrtt"
          alt="rert"
          src="/painting6.webp"
          cost={550}
          stars={4}
        />
        <EComCard
          text="rrtt"
          alt="rert"
          src="/painting7.jpg"
          cost={101}
          stars={1}
        />
        <EComCard
          text="rrtt"
          alt="rert"
          src="/painting8.jpg"
          cost={470}
          stars={3}
        />
      </Carousel>
      <SectionHeading text="See the video" />
      <YouTubeVideo videoID="Bv__4y2cyMk" />
    </div>
  );
}
