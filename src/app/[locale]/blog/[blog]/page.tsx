"use client";

import { Spinner } from "flowbite-react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

type Props = {
  params: {
    locale: string;
    blog: string;
  };
};

function LoadingElm() {
  return (
    <div className="flex h-20 items-center justify-center">
      <Spinner />
    </div>
  );
}

export default function BlogPage({
  params: { locale, blog },
}: Readonly<Props>) {
  const DynamicBlog = dynamic(
    () => import(`@/blogs/${locale}/${blog}.mdx`).catch(() => notFound()),
    {
      loading: () => LoadingElm(),
    },
  );
  return <DynamicBlog />;
}
