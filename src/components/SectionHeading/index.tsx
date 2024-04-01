type Props = {
  text: string;
};

export default function SectionHeading(props: Props) {
  return <h2 className="my-10 text-center text-4xl">{props.text}</h2>;
}
