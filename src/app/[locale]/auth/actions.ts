"use server";

import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logIn(formData: FormData) {
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
  if (userId) {
    await mergeAnonymousCartIntoUserCart(userId);
  }

  redirectAfterAction();
}

export async function signUp(formData: FormData) {
  const supabase = createClient();

  const formAuthData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp(formAuthData);

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("data user is undefined");
  }

  await prisma.user.create({
    data: { id: data.user.id, name: formData.get("name") as string },
  });

  redirectAfterAction();
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

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

export async function deleteAccount() {
  const supabase = createClient();

  const user = await supabase.auth.getUser();

  if (!user.data.user || user.error) {
    throw new Error(user.error?.message);
  }

  const deleteUser = await supabase.auth.admin.deleteUser(user.data.user?.id);

  if (!deleteUser.data.user || deleteUser.error) {
    throw new Error(deleteUser.error?.message);
  }

  redirectAfterAction();
}

function redirectAfterAction() {
  cookies().delete("localCartId");
  redirect("/");
}
