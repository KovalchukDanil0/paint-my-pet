"use server";

import { redirect } from "@/i18n/routing";

export default async function searchProducts(formData: FormData) {
  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect<any>("/search?query=" + searchQuery);
  }
}
