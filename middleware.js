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
      console.log("Redirecting Creator to login"); // Log redirection for debugging
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  } else if (userType?.value === "Brand") {
    if (
      url.pathname === "/creator-profile" ||
      url.pathname === "/edit-profile-creator"
    ) {
      console.log("Redirecting Brand to login"); // Log redirection for debugging
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
  } else if (userType?.value === "Student") {
    // Add specific conditions for Student role if needed
    if (
      url.pathname === "/brand-profile" ||
      url.pathname === "/edit-profile-brand" ||
      url.pathname === "/add-product" ||
      url.pathname === "/creator-profile" ||
      url.pathname === "/edit-profile-creator"
    ) {
      console.log("Redirecting Student to login"); // Log redirection for debugging
      return NextResponse.redirect(new URL("/login", req.nextUrl));
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
    "/brand-profile",
    "/creator-profile",
    "/student-profile",
    "/notifications/:path*",
    "/notifications",
    "/payment/:path*",
    "/products/:path*",
  ],
};
