import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies } = req;
  const authToken = cookies.get("auth");
  const userType = cookies.get("userType");
  console.log("User Type:", userType); // Log userType for debugging

  const url = req.nextUrl.clone();

  // Allow access to public paths without authentication
  if (["/payment", "/products"].includes(url.pathname)) {
    return NextResponse.next();
  }

  if (url.pathname === "/login") {
    if (authToken && userType?.value !== "Student") {
      console.log("User already authenticated, redirecting from login");
      return NextResponse.redirect(new URL("/", req.nextUrl)); // Redirect to homepage or dashboard
    } else {
      return NextResponse.next(); // Allow unauthenticated users or Student users to access the login page
    }
  }

  // Redirect unauthenticated users to the login page
  if (!authToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Handle role-specific redirection
  if (userType?.value === "Creator") {
    if (
      url.pathname === "/brand-profile" ||
      url.pathname === "/edit-profile-brand" ||
      url.pathname === "/add-product"
    ) {
      console.log("Redirecting Creator to home"); // Log redirection for debugging
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else if (userType?.value === "Brand") {
    if (
      url.pathname === "/creator-profile" ||
      url.pathname === "/edit-profile-creator"
    ) {
      console.log("Redirecting Brand to home"); // Log redirection for debugging
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  } else if (userType?.value === "Student") {
    if (
      url.pathname === "/brand-profile" ||
      url.pathname === "/edit-profile-brand" ||
      url.pathname === "/add-product" ||
      url.pathname === "/creator-profile" ||
      url.pathname === "/edit-profile-creator"
    ) {
      console.log("Redirecting Student to home"); // Log redirection for debugging
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  // Proceed to the requested page if conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-product",
    "/edit-profile-brand",
    "/edit-profile-creator",
    "/edit-profile-student",
    "/edit-product/:path*",
    "/edit-product",
    "/wallet",
    "/brand-profile",
    "/creator-profile",
    "/student-profile",
    "/notifications/:path*",
    "/notifications",
    "/payment/:path*",
    "/products/:path*",
    "/login",
  ],
};
