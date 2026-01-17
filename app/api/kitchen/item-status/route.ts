import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { requireAuth } from "@/utils/requireAuth";
import { pusher } from "@/utils/pusher";

type ItemStatus = "PENDING" | "PREPARING" | "READY";

export async function POST(req: Request) {
  const auth = requireAuth(req, ["KITCHEN"]);
  if (auth instanceof NextResponse) return auth;

  try {
    const { orderId, itemId, status } = (await req.json()) as {
      orderId: string;
      itemId: string;
      status: ItemStatus;
    };

    if (!["PENDING", "PREPARING", "READY"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    await connectDb();

    // 1️⃣ Update item status
    await Order.updateOne(
      { _id: orderId, "items._id": itemId },
      { $set: { "items.$.status": status } }
    );

    // 2️⃣ If kitchen starts → order becomes ACTIVE
    if (status === "PREPARING") {
      await Order.updateOne(
        { _id: orderId, status: "PLACED" },
        { $set: { status: "ACTIVE" } }
      );
    }

    // 3️⃣ Fetch order (for table info)
    const order = await Order.findById(orderId).lean();
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // 🔔 4️⃣ PUSHER EVENT (FIXED)
    await pusher.trigger("kitchen", "item-status-updated", {
      orderId: orderId.toString(),
      itemId: itemId.toString(), // ✅ FIX
      status,
      table: order.table,
    });

    // 🔔 5️⃣ READY EVENT (FIXED)
    if (status === "READY") {
      await pusher.trigger("waiter", "item-ready", {
        orderId: orderId.toString(),
        itemId: itemId.toString(), // ✅ FIX
        table: order.table,
      });

      await pusher.trigger(`order-${orderId}`, "item-ready", {
        itemId: itemId.toString(), // ✅ FIX
        table: order.table,
      });

      await pusher.trigger("admin", "item-status-updated", {
        orderId,
        itemId,
        status,
        table: order.table,
      });

    }

    if (status === "PREPARING" && order) {
      await pusher.trigger(`order-${order._id.toString()}`, "item-preparing", {
        itemId: itemId.toString(),
        status: "PREPARING",
        table: order.table,
      });
      await pusher.trigger("admin", "item-status-updated", {
        orderId,
        itemId,
        status,
        table: order.table,
      });

    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
