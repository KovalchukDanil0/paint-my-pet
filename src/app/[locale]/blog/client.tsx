"use client";

import { Link } from "react-daisyui";
import "./styles.scss";

type Props = {
  blogs: string[];
};

export default function Blogs({ blogs }: Readonly<Props>) {
  return (
    <div id="blog" className="m-16 flex flex-col gap-3">
      {blogs.map((blog) => (
        <p key={blog}>
          <Link href={`blog/${blog}`} color="primary">
            {blog}
          </Link>
        </p>
      ))}
    </div>
  );
}
