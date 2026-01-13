import { Order } from "@/models/Order";
import { connectDb } from "@/utils/ConnectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { table } = await req.json();
    await connectDb();

    const order = await Order.findOne({
      table,
      status: { $in: ["PLACED", "ACTIVE"] },
    }).lean();

    if (!order) {
      return NextResponse.json({
        success: true,
        order: null,
      });
    }

    return NextResponse.json({
      success: true,
      order: {
        _id: order._id.toString(),
        items: order.items,
        grandTotal: order.grandTotal,
        status: order.status,
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
