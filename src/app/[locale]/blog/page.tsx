"use server";

import fsPromises from "fs/promises";
import path from "path";
import Blogs from "./blogs";
import "./styles.scss";

type Props = {
  params: {
    locale: string;
  };
};

export default async function Page({ params: { locale } }: Readonly<Props>) {
  const folder = `blogs/${locale}`;

  const props: { files: string[] } = {
    files: await fsPromises.readdir(path.join("src", folder)),
  };

  return <Blogs {...props} />;
}
