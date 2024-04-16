import {
  deleteCookie,
  getCookie,
  getCookies,
  hasCookie,
  setCookie,
} from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  setCookie("test", "value", { res, req });
  getCookie("test", { res, req });
  getCookies({ res, req });
  deleteCookie("test", { res, req });
  hasCookie("test", { req, res });

  // provide cookies fn
  setCookie("test1", "value", { cookies });
  getCookie("test1", { cookies });
  getCookies({ cookies });
  deleteCookie("test1", { cookies });
  hasCookie("test1", { cookies });

  return res;
}
