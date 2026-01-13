import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Menu } from "@/models/Menu";

export async function POST(req: Request) {
  const { id } = await req.json();
  await connectDb();

  const item = await Menu.findById(id);
  if (!item) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  item.isAvailable = !item.isAvailable;
  await item.save();

  return NextResponse.json({ success: true });
}
