import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    itemId: { type: Schema.Types.ObjectId, ref: "Menu" },
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
  },
  { _id: true }
);


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
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", orderSchema);
