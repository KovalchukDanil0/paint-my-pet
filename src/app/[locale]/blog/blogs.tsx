"use client";

import { usePathname } from "next/navigation";
import { Link } from "react-daisyui";
import "./styles.scss";

type Props = {
  blogs: string[];
};

export default function Blogs({ blogs }: Readonly<Props>) {
  const pathname = usePathname();

  return (
    <div id="blog" className="m-5 flex flex-col gap-3">
      {blogs.map((blog) => (
        <p key={blog}>
          <Link href={`${pathname}/${blog}`} color="primary">
            {blog}
          </Link>
        </p>
      ))}
    </div>
  );
}
