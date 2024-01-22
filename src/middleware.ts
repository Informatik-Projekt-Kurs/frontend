import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/actions";
import { User } from "./types";

export async function middleware(req: NextRequest) {
  const user = (await getUser()) as User;
  if (user) return NextResponse.redirect(new URL("/login", req.url));
  try {
    if (req.nextUrl.pathname.startsWith("/admin") && (user as User).role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"]
};
