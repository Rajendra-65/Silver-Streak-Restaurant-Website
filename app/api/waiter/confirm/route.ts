import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { requireAuth } from "@/utils/requireAuth";

export async function POST(req: Request) {
  const auth = requireAuth(req, ["WAITER"]);
  if (auth instanceof NextResponse) return auth;

  const { orderId } = await req.json();
  await connectDb();

  await Order.updateOne(
    { _id: orderId, status: "PLACED" },
    { $set: { status: "ACTIVE" } }
  );

  return NextResponse.json({ success: true });
}
