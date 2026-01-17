// app/api/admin/mark-paid/route.ts
import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { requireAuth } from "@/utils/requireAuth";

export async function POST(req: Request) {
  const auth = requireAuth(req, ["ADMIN"]);
  if (auth instanceof NextResponse) return auth;

  const { orderId } = await req.json();
  await connectDb();

  await Order.updateOne(
    { _id: orderId },
    {
      $set: {
        paymentStatus: "PAID",
        paymentMethod: "CASH",
        paidAt: new Date(),
      },
    }
  );

  return NextResponse.json({ success: true });
}
