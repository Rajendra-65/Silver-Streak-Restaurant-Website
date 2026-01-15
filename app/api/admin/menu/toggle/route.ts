import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Menu } from "@/models/Menu";
import { requireAuth } from "@/utils/requireAuth";

export async function POST(req: Request) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;
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
