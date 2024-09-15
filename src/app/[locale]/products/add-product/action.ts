"use server";

import { redirect } from "@/i18n/routing";
import { isAdmin } from "lib/admin";
import { prisma } from "lib/db/prisma";
import { createClient } from "lib/supabase/server";

type DataType = {
  name: string[];
  description: string[];
  imageUrl: string;
  price: number;
  tag: string;
};

export async function checkIfSigned() {
  const { auth } = createClient();
  const {
    data: { user },
  } = await auth.getUser();

  const admin = await isAdmin(user);
  if (!admin) {
    throw new Error("You are not admin");
  }

  return true;
}

export async function addProduct(formData: FormData) {
  "use server";

  await checkIfSigned();

  const data: DataType = {
    name: [
      formData.get("name-en")?.toString() ?? "",
      formData.get("name-cz")?.toString() ?? "",
    ],
    description: [
      formData.get("description-en")?.toString() ?? "",
      formData.get("description-cz")?.toString() ?? "",
    ],
    imageUrl: formData.get("imageUrl")?.toString() ?? "",
    price: Number(formData.get("price") ?? 0),
    tag: formData.get("tag")?.toString() ?? "",
  };

  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      throw new Error(`Form field ${key} wasn't specified`);
    }
  }

  await prisma.product.create({
    data,
  });

  redirect("/products");
}
