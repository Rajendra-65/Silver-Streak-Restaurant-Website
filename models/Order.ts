import mongoose, { Schema } from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: String,
  size: String,
  choice: String,
  quantity: Number,
  unitPrice: Number,
  totalPrice: Number,
  status: {
    type: String,
    enum: ["PENDING", "PREPARING", "READY", "SERVED"],
    default: "PENDING",
  },
});

const orderSchema = new Schema(
  {
    table: {
      type: String,
      required: true,
    },

    items: [orderItemSchema],

    status: {
      type: String,
      enum: ["PLACED", "ACTIVE", "COMPLETED"],
      default: "PLACED",
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    payment: {
      method: {
        type: String,
        enum: ["ONLINE", "CASH"],
        default: "ONLINE",
      },
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING",
      },
    },

    bill: {
      type: {
        type: String,
        enum: ["E_BILL", "PHYSICAL"],
      },
      billNumber: String,
      billUrl: String, // PDF link (only for e-bill)
      generatedAt: Date,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
