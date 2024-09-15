"use server";

import { redirect } from "@/i18n/routing";
import { mergeAnonymousCartIntoUserCart } from "lib/db/cart";
import { prisma } from "lib/db/prisma";
import { createClient } from "lib/supabase/server";
import { cookies } from "next/headers";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.id) {
    await mergeAnonymousCartIntoUserCart(user.id);
  }

  redirectAfterAction();
}

export async function signUp(formData: FormData) {
  const { auth } = createClient();

  const formAuthData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {
    error,
    data: { user },
  } = await auth.signUp(formAuthData);

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("data user is undefined");
  }

  await prisma.user.create({
    data: { id: user.id, name: formData.get("name") as string },
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

  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${process.env.NEXTAUTH_URL}/api/auth/callback` },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (url) {
    redirect<any>(url);
  }
}

export async function deleteAccount() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    throw new Error(error?.message);
  }

  const {
    data: { user: deleteUser },
    error: deleteUserError,
  } = await supabase.auth.admin.deleteUser(user?.id);

  if (!deleteUser || deleteUserError) {
    throw new Error(deleteUserError?.message);
  }

  redirectAfterAction();
}

function redirectAfterAction() {
  cookies().delete("localCartId");
  redirect("/");
}
