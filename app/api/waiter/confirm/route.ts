import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { requireAuth } from "@/utils/requireAuth";
import { pusher } from "@/utils/pusher";
import { Order_type } from "@/types/order";

export async function POST(req: Request) {
  const auth = requireAuth(req, ["WAITER"]);
  if (auth instanceof NextResponse) return auth;

  const { orderId } = await req.json();
  await connectDb();


  await Order.updateOne(
    { _id: orderId, status: "PLACED" },
    { $set: { status: "ACTIVE" } }
  );

  const updated_order = await Order.findById(orderId) as Order_type;

  pusher.trigger("orders", "order:confirmed", {
    orderId,
    table : updated_order.table,
  });


  return NextResponse.json({ success: true });
}
