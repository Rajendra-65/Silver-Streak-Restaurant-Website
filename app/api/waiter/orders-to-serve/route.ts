import { Order } from "@/models/Order";
import { connectDb } from "@/utils/ConnectDb";
import { NextResponse } from "next/server";
import {OrderItem} from "@/types/order";
import { requireAuth } from "@/utils/requireAuth";
export async function GET(req: Request) {
  const auth = requireAuth(req, ["WAITER"]);
  if (auth instanceof NextResponse) return auth;
  await connectDb();

  const orders = await Order.find({
    status: "ACTIVE",
    "items.status": "READY",
  })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    orders: orders.map(order => ({
      _id: order._id.toString(),
      table: order.table,
      items: order.items.filter(
        (item : OrderItem) => item.status === "READY"
      ),
    })),
  });
}
