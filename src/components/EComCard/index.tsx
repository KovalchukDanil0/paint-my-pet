"use client";

import { Card } from "flowbite-react";
import Link from "next/link";
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa6";

interface IEComCard {
  stars: number;
  cost: number;
  src: string;
  alt: string;
  text: string;
  href?: string;
  className?: string;
}

export default function EComCard({
  stars,
  cost,
  src,
  alt,
  text,
  href = "",
  className = "mx-3",
}: Readonly<IEComCard>) {
  return (
    <Card className={className} imgAlt={alt} imgSrc={src}>
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {href === "" ? <>{text}</> : <Link href={href}>{text}</Link>}
      </h5>

      <div className="mb-5 mt-2.5 flex items-center">
        {Array.from({ length: 5 }).map((_item, i) => {
          const iconsProps: IconContext = { color: "yellow" };
          if (i >= stars) {
            iconsProps.color = "gray";
          }

          return (
            <IconContext.Provider key={i} value={iconsProps}>
              <FaStar />
            </IconContext.Provider>
          );
        })}

        <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
          {stars}.0
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${cost}
        </span>
        <Link
          href={href}
          className={
            "rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300" +
            "dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          }
        >
          Add to cart
        </Link>
      </div>
    </Card>
  );
}
