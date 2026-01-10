import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";

export async function POST(req: Request) {
  const { orderId } = await req.json();
  await connectDb();

  await Order.findByIdAndUpdate(orderId, {
    status: "PREPARING",
  });

  return NextResponse.json({ success: true });
}
