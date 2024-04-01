import fs from "fs";
import Blogs from "./blogs";
import "./styles.css";

type Props = {
  params: {
    locale: string;
  };
};

export default function Page({
  params: { locale },
}: Readonly<Props>): React.ReactElement {
  const folder = `/blogs/${locale}`;
  const files: string[] = fs.readdirSync("src" + folder);

  return <Blogs files={files} />;
}
