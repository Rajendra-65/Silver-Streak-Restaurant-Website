import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Menu } from "@/models/Menu";
import { requireAuth } from "@/utils/requireAuth";

export async function GET(req:Request) {
  const auth = requireAuth(req, ["KITCHEN"]);
  if (auth instanceof NextResponse) return auth;
  await connectDb();
  const menu = await Menu.find().sort({ category: 1 }).lean();
  return NextResponse.json({ menu });
}
