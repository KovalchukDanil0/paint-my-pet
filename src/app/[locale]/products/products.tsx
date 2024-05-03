"use client";

import ProductCard from "@/components/ProductCard";
import { ProductTags, isEmpty } from "@/lib/shared";
import { Product } from "@prisma/client";
import { Radio } from "flowbite-react";
import { ChangeEvent, useState } from "react";

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

  console.log(newProducts);

  return (
    <>
      <div className="my-5 flex flex-row justify-around">
        {Object.keys(ProductTags).map((val) => {
          const num = ProductTags[val as keyof typeof ProductTags].toString();
          if (!isNaN(Number(num))) {
            return;
          }
          return (
            <div key={num} className="flex flex-row items-center gap-3">
              <Radio id={num} onChange={setChosenTagFunc} name="tagFilter" />
              <p className="uppercase">{num}</p>
            </div>
          );
        })}
      </div>

      {!isEmpty(newProducts) ? (
        <div className="grid grid-cols-3 gap-4">
          <ProductCard
            className="col-span-3"
            product={newProducts[0]}
          ></ProductCard>
          {newProducts.slice(1).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <center>
          <p>No products to display</p>
        </center>
      )}
    </>
  );
}
