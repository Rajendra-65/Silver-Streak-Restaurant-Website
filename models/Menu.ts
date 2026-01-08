import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema(
  {
    size: {
      type: String, // Small, Regular
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const choiceSchema = new Schema(
  {
    name: {
      type: String, // Veg, Non-Veg, Chicken, Egg, Mixed
      required: true,
    },
    extraPrice: {
      type: Number,
      default: 0,
    },
    extraPriceBySize: {
      type: Map,
      of: Number, // { Small: 10, Regular: 37 }
      default: undefined,
    },
  },
  { _id: false }
);

const menuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    variants: {
      type: [variantSchema],
      default: [],
    },

    choices: {
      type: [choiceSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Menu =
  mongoose.models.Menu || mongoose.model("Menu", menuSchema);
