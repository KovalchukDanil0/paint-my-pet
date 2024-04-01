import FormSubmitButton from "@/components/FormSubmitButton";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { adminsList } from "@/lib/shared";
import { TextInput, Textarea } from "flowbite-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function checkIfSigned() {
  const session = await getServerSession(authOptions);

  if (!adminsList.includes(session?.user.email!)) {
    throw new Error("You are not admin");
  }
}

async function addProduct(formData: FormData) {
  "use server";

  await checkIfSigned();

  const name: string = formData.get("name")?.toString()!;
  const description: string = formData.get("description")?.toString()!;
  const imageUrl: string = formData.get("imageUrl")?.toString()!;
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/product-showroom");
}

export default async function AddProductPage() {
  await checkIfSigned();

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <TextInput
          required
          name="name"
          placeholder="Name"
          type="text"
          className="mb-3 w-full"
        />
        <Textarea
          required
          name="description"
          placeholder="Description"
          className="mb-3 w-full"
        />
        <TextInput
          required
          name="imageUrl"
          placeholder="Image URL"
          type="text"
          className="mb-3 w-full"
        />
        <TextInput
          required
          name="price"
          placeholder="Price"
          type="number"
          className="mb-3 w-full"
        />
        <FormSubmitButton>Add Product</FormSubmitButton>
      </form>
    </div>
  );
}
