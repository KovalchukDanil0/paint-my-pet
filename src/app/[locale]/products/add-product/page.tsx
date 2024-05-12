"use server";

import FormSubmitButton from "@/components/FormSubmitButton";
import SelectFromObject from "@/components/SelectFromEnum";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { ProductTags, isAdmin, isEmpty } from "@/lib/shared";
import { TextInput, Textarea } from "flowbite-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function checkIfSigned() {
  const session = await getServerSession(authOptions);

  if (!isAdmin(session!)) {
    throw new Error("You are not admin");
  }
}

async function addProduct(formData: FormData) {
  "use server";

  await checkIfSigned();

  const data = {
    name: formData.get("name")?.toString()!,
    description: formData.get("description")?.toString()!,
    imageUrl: formData.get("imageUrl")?.toString()!,
    price: Number(formData.get("price") || 0),
    tag: formData.get("tag")?.toString()!,
  };

  if (isEmpty(data)) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data,
  });

  redirect("/products");
}

export default async function AddProductPage() {
  await checkIfSigned();

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form className="flex flex-col gap-3" action={addProduct}>
        <TextInput required name="name" placeholder="Name" type="text" />
        <Textarea required name="description" placeholder="Description" />
        <TextInput
          required
          name="imageUrl"
          placeholder="Image URL"
          type="text"
        />
        <TextInput required name="price" placeholder="Price" type="number" />
        <SelectFromObject required name="tag" obj={ProductTags} />
        <FormSubmitButton className="w-fit">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
