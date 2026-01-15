// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { AuthPayload } from "./types/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const path = req.nextUrl.pathname;

  // 🚫 No token → login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded: AuthPayload;

  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthPayload;
  } catch {
    // ❌ Invalid / expired token
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔒 Role-based protection
  if (path.startsWith("/admin") && decoded.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/waiter") && decoded.role !== "WAITER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/kitchen") && decoded.role !== "KITCHEN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/waiter/:path*", "/kitchen/:path*"],
};
