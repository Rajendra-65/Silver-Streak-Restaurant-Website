import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";

export async function POST(req: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        { success: false, message: "Missing payment details" },
        { status: 400 }
      );
    }

    // ✅ USE CORRECT SECRET (test or live)
    const secret =
      process.env.NODE_ENV === "production"
        ? process.env.RAZORPAY_LIVE_SECRET_KEY!
        : process.env.RAZORPAY_TEST_SECRET_KEY!;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("SIGNATURE MISMATCH");
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    await connectDb();

    const order = await Order.findOne({
      "payment.razorpayOrderId": razorpay_order_id,
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    order.payment.razorpayPaymentId = razorpay_payment_id;
    order.payment.razorpaySignature = razorpay_signature;
    order.payment.status = "SUCCESS";
    order.status = "COMPLETED";

    await order.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}
