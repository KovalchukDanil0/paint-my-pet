"use server";

import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = createClient();

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

  redirectAfterAction();
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const formAuthData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp(formAuthData);

  if (error) {
    throw new Error(error.message);
  }

  await prisma.user.create({
    data: { id: data.user?.id!, name: formData.get("name") as string },
  });

  redirectAfterAction();
}

export async function signout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  cookies().delete("localCartId");

  redirectAfterAction();
}

export async function logInWithGoogle() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${process.env.NEXTAUTH_URL}/api/auth/callback` },
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(data.url);
}

function redirectAfterAction() {
  redirect("/");
}
