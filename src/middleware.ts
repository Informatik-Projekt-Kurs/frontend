import { type NextRequest, NextResponse } from "next/server";
import { getUser, refreshAccessToken } from "./lib/actions";

export async function middleware(req: NextRequest) {
  let user = await getUser(req.cookies.get("accessToken")?.value);
  let response = NextResponse.next();

  // If no user, try to refresh the access token using a valid refresh token.
  if (user === null) {
    console.log("No user found, attempting to refresh access token.");
    const refreshToken = req.cookies.get("refreshToken")?.value;
    if (refreshToken !== undefined || refreshToken !== "") {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken !== undefined) {
        response.cookies.set("accessToken", newAccessToken[0], { httpOnly: true, secure: true, sameSite: "strict" });
        response.cookies.set("expires_at", newAccessToken[1], { httpOnly: true, secure: true, sameSite: "strict" });
        user = await getUser(newAccessToken[0]);
        if (user === null) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      } else {
        console.log("Error refreshing access token, redirecting to login.");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } else {
      console.log("No refresh token found, redirecting to login.");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/dashboard") && !["CLIENT", "ADMIN"].includes(user.role)) {
    response = NextResponse.redirect(new URL("/company/dashboard", req.url));
  } else if (
    req.nextUrl.pathname.startsWith("/company/dashboard") &&
    !["COMPANY_MEMBER", "COMPANY_ADMIN"].includes(user.role)
  ) {
    response = NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/company/dashboard/:path*"]
};
