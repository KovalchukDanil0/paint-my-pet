"use server";

import { promises as fs } from "fs";
import { getLocale } from "next-intl/server";
import { join, parse, resolve } from "path";
import Blogs from "./blogs";

const getBlogs = async () => {
  const locale = await getLocale();
  const folder = `blogs/${locale}`;

  const files = await fs.readdir(
    resolve(join(process.cwd(), "src", `${folder}`)),
    "utf8",
  );
  return files.map((file) => parse(file).name);
};

export default async function Page() {
  const blogs = await getBlogs();
  return <Blogs blogs={blogs} />;
}
