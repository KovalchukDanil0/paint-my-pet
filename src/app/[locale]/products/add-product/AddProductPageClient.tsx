"use client";

import FormSubmitButton from "@/components/FormSubmitButton";
import SelectFromObject from "@/components/SelectFromObject";
import { ProductTags } from "@/lib/shared";
import { Input, Textarea } from "react-daisyui";
import { addProduct } from "./action";

export default function AddProductPageClient() {
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
