"use server";

import { cookies } from "next/headers";

export async function exampleAction(localCartId: string, cartId: string) {
  // Set cookie
  cookies().set(localCartId, cartId);
}
