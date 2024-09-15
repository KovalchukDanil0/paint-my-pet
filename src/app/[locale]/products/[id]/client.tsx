"use client";

import PriceTag from "@/components/PriceTag";
import SelectFromObject from "@/components/SelectFromObject";
import { getIndexOfLocale, Locale } from "@/i18n/routing";
import { Product } from "@prisma/client";
import { Dimensions } from "lib/shared";
import { useLocale } from "next-intl";
import Image from "next/image";
import { AnimationEvent, ChangeEvent, useState, useTransition } from "react";
import { Button, Loading } from "react-daisyui";
import { FaShoppingCart } from "react-icons/fa";
import setDimension from "./actions";

type Props = {
  product: Product;
};

let dimension = Dimensions["16x20"];

function setInvisible({
  currentTarget: { classList },
}: AnimationEvent<HTMLSpanElement>) {
  classList.remove("block");
  classList.add("hidden");
}

export default function AddToCartSection({
  product: { id, imageUrl, description, name, price },
}: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const locale = useLocale();

  function selectChange({
    currentTarget: { value },
  }: ChangeEvent<HTMLSelectElement>) {
    dimension = value as unknown as Dimensions;
  }

  function buttonClick() {
    startTransition(async () => {
      await setDimension(id, dimension);
      setSuccess(true);
    });
  }

  const nameResolved = name[getIndexOfLocale(locale as Locale)];

  return (
    <div className="flex w-fit flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={imageUrl}
        alt={nameResolved}
        width={1080}
        height={1920}
        className="size-full rounded-lg object-cover md:size-1/3"
        style={{ aspectRatio: "3/4" }}
        priority
      />
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold">{nameResolved}</h1>
        <PriceTag price={price} />
        <p>{description[getIndexOfLocale(locale as Locale)]}</p>
        <div className="flex w-fit items-center gap-2">
          <SelectFromObject onChange={selectChange} enumObj={Dimensions} />
          <Button onClick={buttonClick} color="info">
            Add to cart {isPending ? <Loading /> : <FaShoppingCart />}
          </Button>
          {!isPending && success && (
            <span
              onAnimationEnd={setInvisible}
              className="animate-fade text-green-500 animate-reverse"
            >
              Added to cart
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
