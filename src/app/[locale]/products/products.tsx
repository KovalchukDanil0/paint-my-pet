"use client";

import ProductCard from "@/components/ProductCard";
import { ProductTags, isEmpty } from "@/lib/shared";
import { Product } from "@prisma/client";
import { Radio } from "flowbite-react";
import { ChangeEvent, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = { products: Product[] };

export default function ProductsPage({ products }: Readonly<Props>) {
  const [chosenTag, setChosenTag] = useState<string | null>(null);

  function setChosenTagFunc(ev: ChangeEvent<HTMLInputElement>) {
    setChosenTag(ev.currentTarget.id);
  }

  let newProducts;
  if (!isEmpty(chosenTag)) {
    newProducts = products.filter((val) => val.tag === chosenTag);
  } else {
    newProducts = products;
  }

  return (
    <>
      <div className="my-5 flex flex-row justify-around">
        {Object.keys(ProductTags).map((val) => {
          const num = ProductTags[val as keyof typeof ProductTags].toString();
          if (!isNaN(Number(num))) {
            return;
          }
          return (
            <div
              key={num}
              className="flex select-none flex-row items-center gap-3"
            >
              <Radio id={num} onChange={setChosenTagFunc} name="tagFilter" />
              <p className="uppercase">{num}</p>
            </div>
          );
        })}
      </div>

      {!isEmpty(newProducts) ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {newProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className={twMerge(
                index === 0 ? "col-span-1 md:col-span-3" : "",
                "animate-fade-up",
              )}
            />
          ))}
        </div>
      ) : (
        <p className="center">No products to display</p>
      )}
    </>
  );
}
