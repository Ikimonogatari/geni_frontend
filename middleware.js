import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies } = req;
  const authToken = cookies.get("auth");
  const userType = cookies.get("userType");

  const url = req.nextUrl.clone();

  // Allow access to the login page
  if (url.pathname === "/login") {
    if (authToken && userType?.value !== "Student") {
      return NextResponse.redirect(new URL("/", req.nextUrl)); // Redirect to homepage or dashboard
    } else {
      return NextResponse.next(); // Allow unauthenticated users or Student users to access the login page
    }
  }

  // Redirect unauthenticated users to the login page
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Handle role-specific access control
  if (userType?.value === "Creator") {
    if (
      [
        "/edit-profile-brand",
        "/add-product",
        "/edit-product",
        "/edit-profile-student",
      ].some((path) => url.pathname.startsWith(path.replace(":path*", "")))
    ) {
      return NextResponse.rewrite(new URL("/not-allowed", req.nextUrl));
    }
  } else if (userType?.value === "Brand") {
    if (
      ["/products", "/edit-profile-creator", "/edit-profile-student"].some(
        (path) => url.pathname.startsWith(path.replace(":path*", ""))
      )
    ) {
      return NextResponse.rewrite(new URL("/not-allowed", req.nextUrl));
    }
  } else if (userType?.value === "Student") {
    if (
      [
        "/edit-profile-brand",
        "/add-product",
        "/edit-product",
        "/edit-profile-creator",
        "/products",
        "/products/:path*",
        "/wallet",
      ].some((path) => url.pathname.startsWith(path.replace(":path*", "")))
    ) {
      return NextResponse.rewrite(new URL("/not-allowed", req.nextUrl));
    }
  }

  // Proceed to the requested page if conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-product",
    "/onboarding",
    "/edit-profile-brand",
    "/edit-profile-creator",
    "/edit-profile-student",
    "/edit-product/:path*",
    "/edit-product",
    "/wallet",
    "/profile",
    "/notifications/:path*",
    "/notifications",
    "/products/:path*",
    "/login",
  ],
};
