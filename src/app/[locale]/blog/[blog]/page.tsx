"use client";

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

type Props = {
  params: {
    locale: string;
    blog: string;
  };
};

export default function BlogPage({
  params: { locale, blog },
}: Readonly<Props>) {
  const DynamicBlog = dynamic(() =>
    import(`@/blogs/${locale}/${blog}.mdx`).catch(() => notFound()),
  );
  return <DynamicBlog />;
}
