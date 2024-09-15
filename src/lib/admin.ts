import { User } from "@supabase/supabase-js";
import { prisma } from "lib/db/prisma";

export async function isAdmin(user: User | null): Promise<boolean> {
  if (!user) {
    return false;
  }

  const adminsList = await prisma.admins.findFirst({
    where: { id: { equals: user.id } },
  });

  return adminsList?.id != null;
}
