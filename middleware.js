import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies } = req;
  const authToken = cookies.get("auth");
  const url = req.nextUrl.clone();

  if (url.pathname === "/payment") {
    return NextResponse.next();
  }

  if (url.pathname === "/products") {
    return NextResponse.next();
  }

  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-product",
    "/edit-profile",
    "/brand-profile/:path*",
    "/creator-profile/:path*",
    "/notifications/:path*",
    "/notifications",
    "/payment/:path*",
    "/products/:path*",
  ],
};
