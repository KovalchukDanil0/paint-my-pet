const title = "Some Test";
const description = "We make your wallet cry";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return <div className="m-auto min-w-[300px] max-w-7xl p-4">{children}</div>;
}
