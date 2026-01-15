// models/User.ts
import mongoose, { Schema } from "mongoose";

export type UserRole = "ADMIN" | "WAITER" | "KITCHEN";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String, // bcrypt hash
    role: {
      type: String,
      enum: ["ADMIN", "WAITER", "KITCHEN"],
      required: true,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
