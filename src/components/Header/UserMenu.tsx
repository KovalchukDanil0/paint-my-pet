import { useRouter } from "@/i18n/routing";
import { Button, Dropdown, Link } from "react-daisyui";
import { FaRegUserCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { UserMenuProps } from "./client";

export default function UserMenu({
  admin,
  user,
  userName,
}: Readonly<UserMenuProps>) {
  const router = useRouter();

  function signOut() {
    router.push("/auth/sign-out");
    router.refresh();
  }

  return (
    <Dropdown end>
      <Button
        tag="label"
        tabIndex={0}
        color="ghost"
        className="avatar"
        shape="circle"
      >
        <FaRegUserCircle
          className={twMerge(
            admin ? "outline-dotted outline-yellow-300" : "",
            "size-8",
          )}
        />
      </Button>
      <Dropdown.Menu className="menu-sm z-10 mt-3 w-52 p-2">
        {user && (
          <Dropdown.Item>
            <span className="block text-sm">{userName}</span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Item>
        )}

        {admin && (
          <li>
            <Link href="/orders" className="justify-between">
              Orders
            </Link>
          </li>
        )}

        {user ? (
          <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={() => router.push("/auth")}>
            Sign in
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
