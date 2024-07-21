"use server";

import { promises as fs } from "fs";
import { getLocale } from "next-intl/server";
import path from "path";
import Blogs from "./blogs";

const getBlogs = async () => {
  const locale = await getLocale();
  const folder = `blogs/${locale}`;

  const files = await fs.readdir(process.cwd() + `/src/${folder}`);
  return files.map((file) => path.parse(file).name);
};

export default async function Page() {
  const blogs = await getBlogs();
  return <Blogs blogs={blogs} />;
}
