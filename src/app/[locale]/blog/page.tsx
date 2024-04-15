import fs from "fs";
import { ReactElement } from "react";
import Blogs from "./blogs";
import "./styles.css";

type Props = {
  params: {
    locale: string;
  };
};

export default function Page({
  params: { locale },
}: Readonly<Props>): ReactElement {
  const folder = `/blogs/${locale}`;

  const props: { files: string[] } = { files: fs.readdirSync("src" + folder) };

  return <Blogs {...props} />;
}
