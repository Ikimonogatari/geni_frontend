import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies } = req;
  const authToken = cookies.get("auth");
  const userType = cookies.get("userType");
  console.log("User Type:", userType); // Add this log statement

  const url = req.nextUrl.clone();

  // Allow access to public paths without authentication
  if (["/payment", "/products"].includes(url.pathname)) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Check user type and restrict access accordingly

  console.log(userType.value, "user type shude");
  console.log("Is Creator:", userType); // Add these logs

  // Redirect Creator users trying to access Brand-specific pages
  if (
    userType.value !== "Brand" &&
    (url.pathname === "/brand-profile" ||
      url.pathname === "/edit-profile-brand" ||
      url.pathname === "/add-product")
  ) {
    console.log("Redirecting Creator to login"); // Add this log
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect Brand users trying to access Creator-specific pages
  if (
    userType.value !== "Creator" &&
    (url.pathname === "/creator-profile" ||
      url.pathname === "/edit-profile-creator")
  ) {
    console.log("Redirecting Brand to login"); // Add this log
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Proceed to the requested page if conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-product",
    "/edit-profile-brand",
    "/edit-profile-creator",
    "/brand-profile",
    "/creator-profile",
    "/notifications/:path*",
    "/notifications",
    "/payment/:path*",
    "/products/:path*",
  ],
};
