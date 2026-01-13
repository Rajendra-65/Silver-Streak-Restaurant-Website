import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { OrderItem } from "@/types/order";

export async function POST(req: Request) {
  try {
    const { orderId, itemId } = await req.json();

    await connectDb();

    // 1️⃣ Mark item as SERVED
    await Order.updateOne(
      { _id: orderId, "items._id": itemId },
      { $set: { "items.$.status": "SERVED" } }
    );

    // 2️⃣ Fetch updated order
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // 3️⃣ ✅ CHECK IF ALL ITEMS ARE SERVED
    const allServed = order.items.every(
      (item : OrderItem) => item.status === "SERVED"
    );

    // 4️⃣ COMPLETE ORDER IF YES
    if (allServed) {
      order.status = "COMPLETED";
      await order.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
