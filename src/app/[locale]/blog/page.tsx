"use server";

import fs from "fs";
import Blogs from "./blogs";
import "./styles.css";

type Props = {
  params: {
    locale: string;
  };
};

export default async function Page({ params: { locale } }: Readonly<Props>) {
  const folder = `/blogs/${locale}`;

  const props: { files: string[] } = { files: fs.readdirSync("src" + folder) };

  return <Blogs {...props} />;
}
