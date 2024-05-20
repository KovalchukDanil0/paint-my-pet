"use server";

import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }

  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (userId != null) {
    await mergeAnonymousCartIntoUserCart(userId);
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const formAuthData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp(formAuthData);

  if (error) {
    throw new Error(error.message);
  }

  await prisma.user.create({ data: { id: data.user?.id! } });
}

export async function signout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  cookies().delete("localCartId");
}
