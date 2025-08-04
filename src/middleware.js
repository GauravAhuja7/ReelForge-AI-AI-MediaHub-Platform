import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * Authentication middleware for protecting routes
 * Uses NextAuth.js to check if users are authenticated before accessing protected pages
 */
export default withAuth(
  function middleware() {
    // Continue to next middleware/route handler
    return NextResponse.next();
  },
  {
    callbacks: {
      /**
       * Determines if a user is authorized to access a specific route
       * @param {Object} params - Authorization parameters
       * @param {Object} params.token - JWT token containing user session data
       * @param {Object} params.req - Next.js request object
       * @returns {boolean} - True if user can access the route, false otherwise
       */
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to public video assets
        if (pathname === "/background-video.mp4") {
          return true;
        }

        // Allow access to authentication and public pages
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register" ||
          pathname === "/contact" ||
          pathname === "/subscription"
        ) {
          return true;
        }

        // Allow access to public homepage
        if (pathname === "/") {
          return true;
        }

        // Handle API route authorization
        if (pathname.startsWith("/api/")) {
          // Allow authentication and AI processing API routes without session
          if (
            pathname.startsWith("/api/auth") || 
            pathname.startsWith("/api/generate")
          ) {
            return true;
          }

          // All other API routes require authentication
          return !!token;
        }

        // Default: All other routes require authentication
        return !!token;
      },
    },
  }
);

/**
 * Middleware configuration
 * Defines which routes this middleware should run on
 * Excludes Next.js static files, images, and favicon
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|background-video.mp4).*)"],
};
