"use server";

import { checkIfSigned } from "./action";
import AddProductPageClient from "./client";

export default async function AddProductPageServer() {
  await checkIfSigned();

  return <AddProductPageClient />;
}
