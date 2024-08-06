"use client";

import { FaImage, FaTruck } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

export default function ProductInformation() {
  return (
    <div className="flex flex-row justify-around gap-5 bg-slate-600 px-10 py-10 md:px-36">
      <div className="flex w-1/3 flex-col">
        <FaImage className="size-9 md:size-14" />
        <h3>
          <b>Authentic, hand-crafted art</b>
        </h3>
        <p>
          Shop original, unique and affordable art from thousands of artists
          around the world.
        </p>
      </div>
      <div className="flex w-1/3 flex-col">
        <IoPerson className="size-9 md:size-14" />
        <h3>
          <b>Support independent artists</b>
        </h3>
        <p>
          Buy directly from an artist, helping them to make a living doing what
          they love.
        </p>
      </div>
      <div className="flex w-1/3 flex-col">
        <FaTruck className="size-9 md:size-14" />
        <h3>
          <b>Risk-free shopping</b>
        </h3>
        <p>
          Secure transactions, free 14-day returns. Full peace of mind,
          guaranteed.
        </p>
      </div>
    </div>
  );
}
