"use server";

import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  const gg = await supabase.storage.from("images").list("", {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  return (
    <div>
      {gg.data?.map(async (folder) => {
        const folders = await supabase.storage.from("images").list(folder.name);

        if (folders.error || !folders?.data) {
          throw new Error("no images here");
        }

        return (
          <div key={folder.name}>
            {folders.data?.map((image) => {
              if (image.name === ".emptyFolderPlaceholder") {
                return <p key={image.name}>placeholder</p>;
              }

              return (
                <Image
                  key={image.name}
                  alt={image.name}
                  src={`https://ljcwvpublqnhcfwtbjli.supabase.co/storage/v1/object/public/images/${folder.name}/${image.name}`}
                  width={1000}
                  height={1000}
                />
              );
            })}
          </div>
        );
      })}
      <p>Hello {data.user.email}</p>
    </div>
  );
}
