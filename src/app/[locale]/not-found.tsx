"use client";

import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="https://http.cat/404"
        alt="404 error"
        width={750}
        height={600}
      />
    </div>
  );
}
