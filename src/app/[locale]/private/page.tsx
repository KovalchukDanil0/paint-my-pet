"use server";

import { redirect } from "@/i18n";
import { isAdmin } from "lib/admin";
import { prisma } from "lib/db/prisma";
import { createClient } from "lib/supabase/server";
import Image from "next/image";

export default async function PrivatePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const ifAdmin = await isAdmin(user);
  if (!ifAdmin) {
    redirect("/auth");
  }

  const currentUserName = (
    await prisma.user.findFirst({
      where: { id: { equals: user?.id } },
    })
  )?.name;

  const { data: imagesList, error: imagesListError } = await supabase.storage
    .from("images")
    .list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

  if (imagesListError || !imagesList) {
    throw new Error("no root found");
  }

  return (
    <div>
      <h1>Hello {currentUserName}</h1>
      {imagesList.map(async ({ name: folderName }) => {
        const { data: subfolderList, error } = await supabase.storage
          .from("images")
          .list(folderName);

        const userName = await prisma.user.findFirst({
          where: { id: { equals: folderName } },
        });

        return (
          (!error || subfolderList) && (
            <div key={folderName} className="flex flex-col">
              <h2>{userName?.name}</h2>
              {subfolderList.map(
                ({ name: subfolderName }) =>
                  subfolderName !== ".emptyFolderPlaceholder" && (
                    <Image
                      key={subfolderName}
                      alt={subfolderName}
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${folderName}/${subfolderName}`}
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
