"use client";

import { adminsList } from "@/lib/shared";
import { Avatar, Dropdown } from "flowbite-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import ButChangeLang from "../ButChangeLang";

type Props = { session: Session | null; locale: string };

export default function UserMenuAvatar({ session, locale }: Readonly<Props>) {
  const user = session?.user;

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        user ? (
          <Avatar
            className={
              adminsList.includes(session.user.email)
                ? "outline-dotted outline-yellow-300"
                : ""
            }
            alt="User settings"
            img={user?.image}
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
