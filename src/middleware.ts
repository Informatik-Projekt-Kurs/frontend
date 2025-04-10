import { type NextRequest, NextResponse } from "next/server";
import { getUser, refreshAccessToken } from "./lib/authActions.server";
import type { User } from "@/types";

// Cache duration in milliseconds (e.g., 1 minute)
const CACHE_DURATION = 60 * 1000;

// In-memory cache for user data
const userCache = new Map<string, { user: User; timestamp: number }>();

async function getUserWithCache(accessToken: string | undefined) {
  if (accessToken === null) return null;

  // Check cache first
  const cachedData = userCache.get(accessToken!);
  const now = Date.now();

  if (cachedData !== null && cachedData !== undefined && now - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.user;
  }

  // If not in cache or expired, fetch fresh data
  const user = await getUser(accessToken!);

  if (user !== null) {
    userCache.set(accessToken!, { user, timestamp: now });
  }

  return user;
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  let user = await getUserWithCache(accessToken);
  const response = NextResponse.next();

  // Only attempt refresh if there's no valid access token
  if (user === null) {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (refreshToken !== null) {
      const newAccessToken = await refreshAccessToken(refreshToken!);

      if (newAccessToken !== undefined) {
        response.cookies.set("accessToken", newAccessToken[0], {
          httpOnly: true,
          secure: true,
          sameSite: "strict"
        });
        response.cookies.set("expires_at", newAccessToken[1], {
          httpOnly: true,
          secure: true,
          sameSite: "strict"
        });

        user = await getUserWithCache(newAccessToken[0]);
      }
    }

    if (user === null) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Handle role-based routing
  const path = req.nextUrl.pathname;
  if (path.startsWith("/dashboard") && !["CLIENT", "ADMIN"].includes(user.role)) {
    return NextResponse.redirect(new URL("/company/dashboard", req.url));
  }

  if (path.startsWith("/company/dashboard") && !["COMPANY_MEMBER", "COMPANY_OWNER"].includes(user.role)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/company/dashboard/:path*"]
};
