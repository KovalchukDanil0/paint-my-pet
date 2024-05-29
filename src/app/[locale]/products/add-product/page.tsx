"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import SelectFromObject from "@/components/SelectFromEnum";
import { ProductTags } from "@/lib/shared";
import { useEffect, useState } from "react";
import { Input, Progress, Textarea } from "react-daisyui";
import { addProduct, checkIfSigned } from "./action";

export default function AddProductPage() {
  const [isSigned, setIsSigned] = useState<boolean>(false);

  useEffect(() => {
    if (isSigned) {
      return;
    }

    async function checkIfAdmin() {
      if (await checkIfSigned()) {
        setIsSigned(true);
      }
    }

    checkIfAdmin();
  }, [isSigned]);

  if (!isSigned) {
    return <Progress />;
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form className="flex flex-col gap-3" action={addProduct}>
        <Input required name="name" placeholder="Name" type="text" />
        <Textarea required name="description" placeholder="Description" />
        <Input required name="imageUrl" placeholder="Image URL" type="text" />
        <Input required name="price" placeholder="Price" type="number" />
        <SelectFromObject required name="tag" obj={ProductTags} />
        <FormSubmitButton className="w-fit">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
