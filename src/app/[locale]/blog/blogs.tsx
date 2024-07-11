"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  blogs: string[];
};

export default function Blogs({ blogs }: Readonly<Props>) {
  const pathname = usePathname();

  return (
    <div id="blog" className="m-5 flex flex-col gap-3">
      {blogs.map((blog) => {
        const fileNoExtension =
          blog.substring(0, blog.lastIndexOf(".")) || blog;

        return (
          <Link
            className="w-fit"
            key={blog}
            href={`${pathname}/${fileNoExtension}`}
          >
            {fileNoExtension}
          </Link>
        );
      })}
    </div>
  );
}
