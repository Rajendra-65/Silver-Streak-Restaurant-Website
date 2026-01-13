import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Menu } from "@/models/Menu";

export async function GET() {
  await connectDb();
  const menu = await Menu.find().sort({ category: 1 }).lean();
  return NextResponse.json({ menu });
}
