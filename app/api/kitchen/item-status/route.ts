import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { requireAuth } from "@/utils/requireAuth";

type ItemStatus = "PENDING" | "PREPARING" | "SERVED";

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

    // 3️⃣ Fetch order
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
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
