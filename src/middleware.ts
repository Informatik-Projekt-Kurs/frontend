import { type NextRequest, NextResponse } from "next/server";
import { getUser, getRefreshToken, refreshAccessToken } from "./lib/actions";

export async function middleware(req: NextRequest) {
  let user = await getUser();

  // If no user, try to refresh the access token using a valid refresh token.
  if (user === null) {
    const refreshToken = await getRefreshToken(req); // This function should retrieve the refresh token from the request.
    if (refreshToken !== undefined || refreshToken !== "") {
      console.log("Attempting to refresh access token");
      const newAccessToken = await refreshAccessToken(refreshToken, req); // Attempt to refresh the access token.
      if (newAccessToken !== undefined || newAccessToken !== "" || newAccessToken !== null) {
        user = await getUser(); // Try to get the user again with the new access token.
      }
    }
  }

  // Redirect to /login if no user could be authenticated.
  if (user === null) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // The existing role-based redirection logic can remain unchanged.
  try {
    if (req.nextUrl.pathname.startsWith("/dashboard") && user?.role !== "CLIENT" && user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/company/dashboard", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/company/dashboard") &&
      user?.role !== "COMPANY_MEMBER" &&
      user?.role !== "COMPANY_ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/company/dashboard/:path*"]
};
