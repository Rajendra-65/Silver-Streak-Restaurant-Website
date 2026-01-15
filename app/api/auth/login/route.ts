import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDb } from "@/utils/ConnectDb";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { email, password, role } = await req.json();
  await connectDb();

  const user = await User.findOne({ email, isActive: true });
  
  if (!user) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  if (user.role !== role) {
    return NextResponse.json(
      { success: false, message: "Invalid role selection" },
      { status: 401 }
    );
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  const res = NextResponse.json({
    success: true,
    role: user.role,
  });

  res.cookies.set("auth_token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return res;
}
