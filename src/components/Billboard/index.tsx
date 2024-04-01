import { Button } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  src?: string;
  hl?: string;
  alt?: string;
  href?: string;
  sl?: string;
  width?: number;
  height?: number;
  marginLeft?: number;
  marginTop?: number;
  children?: ReactElement[];
  btnText?: string;
}

export default function Billboard({
  width = 2160,
  height = 750,
  href,
  src,
  alt,
  children,
  btnText,
}: Readonly<Props>): React.ReactElement {
  const image: ReactElement = (
    <Image
      className={`h-[450px] w-[2160px] object-cover md:h-[750px]`}
      src={src!}
      width={width}
      height={height}
      alt={alt!}
      title={alt}
    />
  );

  return (
    <div className="relative">
      {href == null ? image : <Link href={href}>{image}</Link>}
      {children?.length !== 0 ? (
        <div
          className={twMerge(
            "absolute bottom-20 left-1/2 m-0 inline-block w-fit -translate-x-1/2 translate-y-1/3 justify-center text-center",
            "[&>h1]:bg-gradient-to-r [&>h1]:from-blue-600 [&>h1]:via-green-500 [&>h1]:to-indigo-400 [&>h1]:bg-clip-text [&>h1]:text-4xl [&>h1]:uppercase [&>h1]:text-transparent md:[&>h1]:text-6xl",
            "[&>p]:text-xl md:[&>p]:text-3xl",
          )}
        >
          {children}
          {href == null ? (
            <></>
          ) : (
            <Button href={href} className="m-auto mt-9 w-1/3">
              {btnText}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
