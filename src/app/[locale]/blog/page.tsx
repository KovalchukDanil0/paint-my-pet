"use server";

import fsPromises from "fs/promises";
import { getLocale } from "next-intl/server";
import path from "path";
import Blogs from "./blogs";
import "./styles.scss";

const getBlogs = async () => {
  const locale = await getLocale();
  const folder = `blogs/${locale}`;

  // TODO: fix blogs not displaying on server

  return fsPromises.readdir(path.join("src", folder));
};

export default async function Page() {
  const blogs = await getBlogs();

  return <Blogs blogs={blogs} />;
}
