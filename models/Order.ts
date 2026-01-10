import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    itemId: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
    name: String,
    size: String,
    choice: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    table: { type: String, required: true },
    items: [orderItemSchema],
    grandTotal: Number,
    status: {
      type: String,
      enum: ["PLACED","CONFIRMED", "PREPARING", "SERVED"],
      default: "PLACED",
    },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
