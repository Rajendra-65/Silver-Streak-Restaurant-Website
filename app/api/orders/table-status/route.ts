import { Order } from "@/models/Order";
import { connectDb } from "@/utils/ConnectDb";
import { NextResponse } from "next/server";

type RequestBody = {
  table: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const { table } = body;

    if (!table) {
      return NextResponse.json(
        { success: false, message: "Table is required" },
        { status: 400 }
      );
    }

    await connectDb();

    // ✅ Get latest order for the table
    const order = await Order.findOne({ table })
      .sort({ createdAt: -1 })
      .lean();

    const status = order.status;

    if (!order) {
      return NextResponse.json(
        { success: false, message: "No order found for table" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      status : status,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
