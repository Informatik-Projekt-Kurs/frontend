// middleware.js
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode("cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2");

export async function middleware(req: NextRequest) {
  const serializedPersistRoot = req.cookies.get("auth_token");
  console.log("serializedPersistRoot", serializedPersistRoot);

  if (!serializedPersistRoot) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Parse the persist:root cookie
    const accessToken = serializedPersistRoot.value;

    // Verify and decode the JWT token
    let decoded = null;
    let isAdmin = false;
    await jwtVerify(accessToken, secret).then((result) => {
      decoded = result;
      isAdmin = decoded.payload.admin;
      console.log(isAdmin);
    });

    if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
      // User is not an admin, redirect to unauthorized page
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Continue with the request
    return NextResponse.next();

    // Role-based access control logic
  } catch (error) {
    console.log("Error verifying JWT token", error);
    // Parsing or JWT verification failed, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply the middleware to specific paths
export const config = {
  matcher: ["/admin/:path*", "/account/:path*"]
};
