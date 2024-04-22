/* import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  const response = NextResponse.json(data, { status: 200 });
  response.cookies.set(data.name, data.value);

  cookies().set("gg", "yy");

  const test = response.cookies.get(data.name);
  console.log(test);

  return response;
};
 */

import { cookies } from "next/headers";

export function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { "Set-Cookie": `token=${token?.value}` },
  });
}
