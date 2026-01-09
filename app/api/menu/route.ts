import { Menu } from "@/models/Menu";
import { connectDb } from "@/utils/ConnectDb";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDb();

  const menu = await Menu.find({ isAvailable: true })
    .sort({ categoryOrder: 1 })
    .lean();

  return NextResponse.json({
    success: true,
    data: menu,
  });
};
