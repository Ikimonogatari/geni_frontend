import { NextResponse } from "next/server";

// MAINTENANCE MODE FLAG - Set to true to enable maintenance mode
const MAINTENANCE_MODE = true;

export function middleware(req) {
  const url = req.nextUrl.clone();

  // Paths that should still be accessible during maintenance
  const allowedPaths = [
    "/maintenance",
    "/_next",
    "/fonts",
    "/images",
    "/favicon.ico",
    "/geni-logo.svg",
    "/geni-logo.png",
    "/v0.2-image.png",
    "/ig-icon.png",
    "/mail-icon.png",
  ];

  // Check if we're in maintenance mode and the current path is not allowed
  if (
    MAINTENANCE_MODE &&
    !allowedPaths.some((path) => url.pathname.startsWith(path))
  ) {
    // Redirect to the maintenance page
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }

  // Only run the original middleware logic if not in maintenance mode
  if (!MAINTENANCE_MODE) {
    const { cookies } = req;
    const authToken = cookies.get("auth");
    const userType = cookies.get("userType");

    // Allow access to the login page
    if (url.pathname === "/login") {
      if (authToken && userType?.value !== "Student") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      } else {
        return NextResponse.next();
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
  }

  // Proceed to the requested page if conditions are met
  return NextResponse.next();
}

// Update the matcher to catch all routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
