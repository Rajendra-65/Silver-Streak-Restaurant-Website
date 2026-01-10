import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";

export async function GET() {
  await connectDb();

  const orders = await Order.find({
    status: { $in: ["CONFIRMED", "PREPARING"] },
  })
    .sort({ createdAt: 1 })
    .lean();


  return NextResponse.json({ orders });
}
