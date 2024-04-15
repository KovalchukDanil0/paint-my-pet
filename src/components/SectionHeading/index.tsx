"use client";

type Props = {
  text: string;
};

export default function SectionHeading({ text }: Readonly<Props>) {
  return <h2 className="my-10 text-center text-4xl">{text}</h2>;
}
