import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { AuthPayload } from "@/types/auth";

export async function getAuthUser(): Promise<AuthPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthPayload;

    return decoded;
  } catch {
    return null;
  }
}
