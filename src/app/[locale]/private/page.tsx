"use server";

import { isAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db/prisma";
import { createClient } from "@/lib/supabase/server";
import { UserResponse } from "@supabase/supabase-js";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = createClient();

  const currentUser: UserResponse = await supabase.auth.getUser();

  const ifAdmin = await isAdmin(currentUser);
  if (!ifAdmin) {
    redirect("/auth");
  }

  const currentUserName = (
    await prisma.user.findFirst({
      where: { id: { equals: currentUser.data.user?.id } },
    })
  )?.name;

  const root = await supabase.storage.from("images").list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (root.error || !root?.data) {
    throw new Error("no root found");
  }

  return (
    <div>
      <h1>Hello {currentUserName}</h1>
      {root.data?.map(async (folder) => {
        const folders = await supabase.storage.from("images").list(folder.name);

        const userName = await prisma.user.findFirst({
          where: { id: { equals: folder.name } },
        });

        return (
          (!folders.error || folders.data) && (
            <div key={folder.name} className="flex flex-col">
              <h2>{userName?.name}</h2>
              {folders.data.map(
                (image) =>
                  image.name !== ".emptyFolderPlaceholder" && (
                    <Image
                      key={image.name}
                      alt={image.name}
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${folder.name}/${image.name}`}
                      width={1000}
                      height={1000}
                    />
                  ),
              )}
            </div>
          )
        );
      })}
    </div>
  );
}
