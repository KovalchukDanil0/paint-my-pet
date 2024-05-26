import { prisma } from "@/lib/db/prisma";
import { User, UserResponse } from "@supabase/supabase-js";

export async function isAdmin(
  userResponse: UserResponse | User | null,
): Promise<boolean> {
  if (userResponse == null) {
    return false;
  }

  let user: User | null;

  if (new Object(userResponse).hasOwnProperty("data")) {
    user = (userResponse as UserResponse).data.user;
  } else {
    user = userResponse as User;
  }

  if (user == null) {
    return false;
  }

  return (
    (await prisma.admins.findFirst({ where: { id: { equals: user.id } } }))
      ?.id != null
  );
}
