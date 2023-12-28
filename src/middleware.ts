import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { User } from "./types";

export async function middleware(req: NextRequest) {
  const serializedPersistRoot = req.cookies.get("auth_token");
  console.log("serializedPersistRoot", serializedPersistRoot);

  if (!serializedPersistRoot) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const accessToken = serializedPersistRoot.value;

    let decoded: User = { id: "", name: "", email: "", admin: false };
    let isAdmin = false;
    await jwtVerify(accessToken, new TextEncoder().encode(process.env.JWT_SECRET)).then((result) => {
      decoded = result.payload as User;
      isAdmin = decoded.admin;
    });

    if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Error verifying JWT token", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply the middleware to specific paths
export const config = {
  matcher: ["/admin/:path*", "/account/:path*"]
};
