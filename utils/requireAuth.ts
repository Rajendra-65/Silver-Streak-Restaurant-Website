import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export type AuthPayload = JwtPayload & {
  id: string;
  role: "ADMIN" | "WAITER" | "KITCHEN";
};

export function requireAuth(
  req: Request,
  allowedRoles?: AuthPayload["role"][]
): AuthPayload | NextResponse {
  const cookie = req.headers.get("cookie");
  const token = cookie
    ?.split("; ")
    .find(c => c.startsWith("auth_token="))
    ?.split("=")[1];

  if (!token) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthPayload;

    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    return decoded;
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
