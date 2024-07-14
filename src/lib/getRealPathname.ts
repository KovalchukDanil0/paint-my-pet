import { headers } from "next/headers";

export default function getRealPathname() {
  const requestUrl = headers().get("x-original-url");

  if (!requestUrl) {
    throw new Error("requestUrl is undefined");
  }

  return requestUrl.replace(/^\/\w\w/, "");
}
