"use client";

export default function NotFound() {
  return (
    <div className="relative h-40">
      <h1 className="absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 text-4xl uppercase">
        <span className="text-red-600">404 ERROR</span> - Not Found
      </h1>
    </div>
  );
}
