"use server";

import { redirect } from "next/navigation";

export default async function searchProducts(formData: FormData) {
  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}
