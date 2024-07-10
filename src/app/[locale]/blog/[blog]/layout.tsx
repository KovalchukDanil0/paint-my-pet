import { PropsWithChildren } from "react";
import "../styles.scss";

export default function DashboardLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div id="blog" className="mx-10 md:mx-72 md:my-16">
      {children}
      <h2>Blogs carousel</h2>
    </div>
  );
}
