import { prisma } from "@/lib/db/prisma";
import { User, UserResponse } from "@supabase/supabase-js";

export async function isAdmin(
  userResponse?: UserResponse | User,
): Promise<boolean> {
  if (!userResponse) {
    return false;
  }

  let user: User | null;

  if (new Object(userResponse).hasOwnProperty("data")) {
    user = (userResponse as UserResponse).data.user;
  } else {
    user = userResponse as User;
  }

  if (!user) {
    return false;
  }

  const adminsList = await prisma.admins.findFirst({
    where: { id: { equals: user.id } },
  });

  return adminsList?.id != null;
}
