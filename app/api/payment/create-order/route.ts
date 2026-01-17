import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_TEST_API_KEY!,
  key_secret: process.env.RAZORPAY_TEST_SECRET_KEY!,
});

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();
    await connectDb();

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // ✅ Razorpay order creation
    const razorpayOrder = await razorpay.orders.create({
      amount: order.grandTotal * 100, // paise
      currency: "INR",
      receipt: `order_${orderId}`,
    });

    // ✅ Safe payment assignment
    order.payment.razorpayOrderId = razorpayOrder.id;
    order.payment.method = "ONLINE";
    order.payment.status = "PENDING";

    await order.save();

    return NextResponse.json({
      success: true,
      razorpayOrderId: razorpayOrder.id,
      amount: order.grandTotal,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { success: false, message: "Payment initiation failed" },
      { status: 500 }
    );
  }
}
