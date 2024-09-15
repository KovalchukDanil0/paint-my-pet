"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import SelectFromObject from "@/components/SelectFromObject";
import { ProductTags } from "lib/shared";
import { Input, Textarea } from "react-daisyui";
import { addProduct } from "./action";

export default function AddProductPageClient() {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form className="flex flex-col gap-3" action={addProduct}>
        <Input required name="name-en" placeholder="Name EN" type="text" />
        <Textarea required name="description-en" placeholder="Description EN" />

        <Input required name="name-cz" placeholder="Name CZ" type="text" />
        <Textarea required name="description-cz" placeholder="Description CZ" />

        <Input required name="imageUrl" placeholder="Image URL" type="text" />
        <Input required name="price" placeholder="Price" type="number" />
        <SelectFromObject required name="tag" enumObj={ProductTags} />
        <FormSubmitButton className="w-fit">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
