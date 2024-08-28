// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const { cookies } = req;
//   const authToken = cookies.get("auth");
//   const userType = cookies.get("userType");
//   const url = req.nextUrl.clone();

//   // Allow access to public paths without authentication
//   if (["/payment", "/products"].includes(url.pathname)) {
//     return NextResponse.next();
//   }

//   // Redirect unauthenticated users to the login page
//   if (!authToken) {
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }

//   // Check user type and restrict access accordingly
//   const isCreator = userType === "Creator";
//   const isBrand = userType === "Brand";

//   // Redirect Creator users trying to access Brand-specific pages
//   if (
//     !isBrand &&
//     (url.pathname.startsWith("/brand-profile") ||
//       url.pathname === "/edit-profile-brand")
//   ) {
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }

//   // Redirect Brand users trying to access Creator-specific pages
//   if (
//     !isCreator &&
//     (url.pathname.startsWith("/creator-profile") ||
//       url.pathname === "/edit-profile-creator")
//   ) {
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }

//   // Proceed to the requested page if conditions are met
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/add-product",
//     "/edit-profile-brand",
//     "/edit-profile-creator",
//     "/brand-profile/:path*",
//     "/creator-profile/:path*",
//     "/notifications/:path*",
//     "/notifications",
//     "/payment/:path*",
//     "/products/:path*",
//   ],
// };
