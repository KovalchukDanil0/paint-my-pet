"use client";

import ProductCard from "@/components/ProductCard";
import SearchProduct from "@/components/SearchProduct";
import { ProductTags, isEmpty } from "@/lib/shared";
import { Product } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import { Button, Radio } from "react-daisyui";
import { twMerge } from "tailwind-merge";

type Props = { products: Product[]; admin: boolean };

export default function ProductsPage({ products, admin }: Readonly<Props>) {
  const [chosenTag, setChosenTag] = useState<string>();

  function setChosenTagFunc(ev: ChangeEvent<HTMLInputElement>) {
    setChosenTag(ev.currentTarget.id);
  }

  const newProducts = isEmpty(chosenTag)
    ? products
    : products.filter((val) => val.tag === chosenTag);

  return (
    <div>
      {admin && (
        <div className="flex h-24 items-center justify-center">
          <Button color="primary" tag="a" href="products/add-product">
            Add product page
          </Button>
        </div>
      )}

      <div className="my-5 flex flex-col items-center justify-center md:hidden">
        <SearchProduct />
      </div>

      <div className="my-5 flex flex-row justify-around">
        {Object.keys(ProductTags).map((val) => {
          const num = ProductTags[val as keyof typeof ProductTags].toString();
          if (!isNaN(Number(num))) {
            return false;
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
              imageHeight={index === 0 ? "h-[600px]" : undefined}
              product={product}
              className={twMerge(
                index === 0 ? "col-span-1 md:col-span-3" : "",
                "animate-fade-up",
              )}
            />
          ))}
        </div>
      ) : (
        <p className="flex flex-col items-center justify-center">
          No products to display
        </p>
      )}
    </div>
  );
}
