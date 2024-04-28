"use client";

import { isAdmin } from "@/lib/shared";
import { Avatar, Dropdown } from "flowbite-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import ButChangeLang from "../ButChangeLang";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  session: Session | null;
  locale: string;
}

const userImage = (image: string) => (
  <Image
    className="rounded-2xl"
    alt="User Avatar"
    width={50}
    height={50}
    src={image}
  />
);

export default function UserMenuAvatar({
  session,
  locale,
  ...props
}: Readonly<Props>) {
  const user = session?.user;

  return (
    <Dropdown
      {...props}
      arrowIcon={false}
      inline
      label={
        user ? (
          <Avatar
            className={twMerge(
              isAdmin(session) ? "outline-dotted outline-yellow-300" : "",
              "w-12",
            )}
            alt="User settings"
            img={() => userImage(user.image)}
            rounded
          />
        ) : (
          <FaRegUserCircle className="size-8" />
        )
      }
    >
      {user && (
        <Dropdown.Header>
          <span className="block text-sm">{user?.name}</span>
          <span className="block truncate text-sm font-medium">
            {user?.email}
          </span>
        </Dropdown.Header>
      )}
      <ButChangeLang locale={locale} />
      <Dropdown.Divider />
      {user ? (
        <Dropdown.Item onClick={() => signOut({ callbackUrl: "/" })}>
          Sign out
        </Dropdown.Item>
      ) : (
        <Dropdown.Item onClick={signIn}>Sign in</Dropdown.Item>
      )}
    </Dropdown>
  );
}
