"use server";

import { checkIfSigned } from "./action";
import AddProductPageClient from "./AddProductPageClient";

export default async function AddProductPageServer() {
  await checkIfSigned();

  return <AddProductPageClient />;
}
