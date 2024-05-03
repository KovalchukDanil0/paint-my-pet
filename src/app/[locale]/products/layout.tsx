type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
  return <div className="m-auto min-w-72 max-w-7xl p-4">{children}</div>;
}
