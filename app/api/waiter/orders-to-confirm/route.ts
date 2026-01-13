import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";

export async function GET() {
  await connectDb();

  const orders = await Order.find({
    status: { $in: ["PLACED"] },
    "items.status": { $in: ["PENDING"] },
  })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    orders: orders.map(order => ({
      _id: order._id,
      table: order.table,
      items: order.items
    })),
  });
}
