import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { OrderItem } from "@/types/order";
import { requireAuth } from "@/utils/requireAuth";
import { pusher } from "@/utils/pusher";

export async function POST(req: Request) {
  try {
    const auth = requireAuth(req, ["WAITER"]);
    if (auth instanceof NextResponse) return auth;

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

    // 🔔 3️⃣ Notify CUSTOMER: item served
    await pusher.trigger(`order-${orderId}`, "item-served", {
      itemId,
    });

    // 4️⃣ Check if all items are SERVED
    const allServed = order.items.every(
      (item: OrderItem) => item.status === "SERVED"
    );

    // 🔔 5️⃣ Complete order & notify
    if (allServed) {
      order.status = "COMPLETED";
      await order.save();

      await pusher.trigger(`order-${orderId}`, "order-completed", {
        orderId,
      });

      await pusher.trigger("admin", "orders:completed", {
        orderId,
        table: order.table,
      });
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
