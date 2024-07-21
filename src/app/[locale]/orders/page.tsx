"use server";

import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { UserResponse } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import OrdersPageClient from "./orders";

export default async function OrdersPageServer() {
  const supabase = createClient();
  const currentUser: UserResponse = await supabase.auth.getUser();

  if (currentUser.error || !currentUser.data.user) {
    throw new Error(currentUser.error?.message ?? "user is undefined");
  }

  const ifAdmin = await isAdmin(currentUser.data.user);
  if (!ifAdmin) {
    redirect("/auth/login");
  }

  const orders = await prisma.order.findMany();

  return <OrdersPageClient orders={orders} />;
}
