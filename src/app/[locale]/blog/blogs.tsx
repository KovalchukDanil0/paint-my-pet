"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  files: string[];
};

export default function Blogs({ files }: Readonly<Props>) {
  const pathname = usePathname();

  return (
    <div id="blog" className="mx-5 my-5 flex flex-col gap-3">
      {files.map((file) => {
        if (
          file === "page.tsx" ||
          file === "layout.tsx" ||
          file === "styles.css"
        ) {
          return false;
        }

        const fileNoExtension =
          file.substring(0, file.lastIndexOf(".")) || file;

        return (
          <Link
            className="w-fit"
            key={file}
            href={`${pathname}/${fileNoExtension}`}
          >
            {fileNoExtension}
          </Link>
        );
      })}
    </div>
  );
}
