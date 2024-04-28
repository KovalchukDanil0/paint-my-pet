"use client";

interface Props extends React.HtmlHTMLAttributes<HTMLHeadingElement> {
  text: string;
}

export default function SectionHeading({ text, ...props }: Readonly<Props>) {
  return (
    <h2 {...props} className="my-10 text-center text-4xl">
      {text}
    </h2>
  );
}
