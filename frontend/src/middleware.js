import { NextResponse } from "next/server";
import { verifyJwtToken } from "./libs/auth";

const AUTH_PAGES = ["/login"];
const isAuthPages = (url) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      //response.cookies.delete("token");
      return response;
    }
    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const response = NextResponse.redirect(new URL("/login", url));
    //response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}
export const config = {
    matcher:[
        '/login',
        '/product',
        "/invoice"
    ]
}