// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { AuthPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  // Public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/login")
  ) {
    return NextResponse.next();
  }

  // No token → redirect home
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  let decoded: AuthPayload;

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (typeof payload === "string") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    decoded = payload as AuthPayload;
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Role-based access
  if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/waiter") && decoded.role !== "WAITER") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/kitchen") && decoded.role !== "KITCHEN") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/waiter/:path*",
    "/kitchen/:path*",
  ],
};
