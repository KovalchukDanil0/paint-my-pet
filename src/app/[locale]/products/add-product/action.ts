"use server";

import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db/prisma";
import { isEmpty } from "@/lib/shared";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type DataType = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  tag: string;
};

export async function checkIfSigned() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();

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
    name: formData.get("name")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    imageUrl: formData.get("imageUrl")?.toString() ?? "",
    price: Number(formData.get("price") ?? 0),
    tag: formData.get("tag")?.toString() ?? "",
  };

  if (isEmpty(data)) {
    throw Error("Missing required fields");
  }

  await prisma.product.create({
    data,
  });

  redirect("/products");
}
