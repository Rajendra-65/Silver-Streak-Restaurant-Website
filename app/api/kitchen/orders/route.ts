import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { OrderItem } from "@/types/order";
import { requireAuth } from "@/utils/requireAuth";

export async function GET(req:Request) {
  const auth = requireAuth(req, ["KITCHEN"]);
  if (auth instanceof NextResponse) return auth;
  await connectDb();

  const orders = await Order.find({
    status: { $in: ["ACTIVE"] },
    "items.status": { $in: ["PENDING", "PREPARING"] },
  }).lean();

  return NextResponse.json({
    orders: orders.map(order => ({
      _id: order._id,
      table: order.table,
      items: order.items.filter(
        (item: OrderItem) => item.status !== "SERVED"
      ),
    })),
  });
}
