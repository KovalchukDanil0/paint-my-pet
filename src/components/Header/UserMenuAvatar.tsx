"use client";

import { isAdmin } from "@/lib/shared";
import { User, UserResponse } from "@supabase/supabase-js";
import { Avatar, Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import ButChangeLang from "../ButChangeLang";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  user: User;
  userAvatar: string | undefined;
  locale: string;
}

export default function UserMenuAvatar({
  user,
  userAvatar,
  locale,
  ...props
}: Readonly<Props>) {
  const router = useRouter();
  const userResponse: UserResponse = { data: { user }, error: null };

  return (
    <Dropdown
      {...props}
      arrowIcon={false}
      inline
      label={
        userAvatar != null ? (
          <Avatar
            className={twMerge(
              isAdmin(userResponse) ? "outline-dotted outline-yellow-300" : "",
              "w-12",
            )}
            alt="User settings"
            img={userAvatar}
            rounded
          />
        ) : (
          <FaRegUserCircle className="size-8" />
        )
      }
    >
      {user != null && (
        <Dropdown.Header>
          <span className="block text-sm">{user.id}</span>
          <span className="block truncate text-sm font-medium">
            {user?.email}
          </span>
        </Dropdown.Header>
      )}
      <ButChangeLang locale={locale} />
      <Dropdown.Divider />
      {user != null ? (
        <Dropdown.Item onClick={() => router.push("/login")}>
          Sign out
        </Dropdown.Item>
      ) : (
        <Dropdown.Item onClick={() => router.push("/login")}>
          Sign in
        </Dropdown.Item>
      )}
    </Dropdown>
  );
}
