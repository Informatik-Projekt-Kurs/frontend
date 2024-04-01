import { type NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/actions";

export async function middleware(req: NextRequest) {
  const user = await getUser();
  if (user === null) return NextResponse.redirect(new URL("/login", req.url));

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
    console.log("Error: ", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/account/:path*", "/company/dashboard/:path*"]
};
