"use server";

import fs from "fs";
import { getLocale } from "next-intl/server";
import path from "path";
import Blogs from "./blogs";

const getBlogs = async () => {
  const locale = await getLocale();
  const folder = `blogs/${locale}`;

  // TODO: fix blogs not displaying on server

  const files = fs.readdirSync(path.join("src", folder));
  return files.map((file) => file.substring(0, file.lastIndexOf(".")) || file);
};

export default async function Page() {
  const blogs = await getBlogs();
  return <Blogs blogs={blogs} />;
}
