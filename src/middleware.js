import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // ✅ Allow public video file access
        if (pathname === "/background-video.mp4") {
          return true;
        }

        // ✅ Allow authentication routes (Login & Register)
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"||
          pathname === "/contact"||
          pathname === "/subscription"
        ) {
          return true;
        }

        // ✅ Allow public homepage
        if (pathname === "/") {
          return true;
        }

        // ✅ Protect API & user routes (Requires authentication)
       // ✅ Allow all API routes except protected ones
      if (pathname.startsWith("/api/")) {
        // Allow authentication & AI processing API routes without a session
        if (
          pathname.startsWith("/api/auth") || 
          pathname.startsWith("/api/generate")
        ) {
          return true;
        }

        // Other API routes require authentication
        return !!token;
      }


        return !!token; // ✅ Default: All other routes require authentication
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|background-video.mp4).*)"],
};
