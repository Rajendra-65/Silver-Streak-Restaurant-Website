import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { Menu } from "@/models/Menu";
import { pusher } from "@/utils/pusher";
/* ---------- TYPES ---------- */

type CalculatedOrderItem = {
  itemId: string;
  name: string;
  size: string;
  choice?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: "PENDING";
};

type CartItemInput = {
  itemId: string;
  size: string;
  choice?: string;
  quantity: number;
};

type Variant = {
  size: string;
  price: number;
};

type Choice = {
  name: string;
  extraPrice?: number;
  extraPriceBySize?: Record<string, number>;
};

type MenuLean = {
  _id: string;
  name: string;
  variants: Variant[];
  choices: Choice[];
};

/* ---------- API ---------- */

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      table: string;
      items: CartItemInput[];
    };

    const { table, items } = body;

    if (!table || !items?.length) {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    await connectDb();

    const calculatedItems: CalculatedOrderItem[] = [];
    let addedTotal = 0;

    /* ---------- PRICE CALCULATION (SERVER ONLY) ---------- */

    for (const cartItem of items) {
      const menuItem = (await Menu.findById(cartItem.itemId).lean()) as
        | MenuLean
        | null;

      if (!menuItem) continue;

      const variant = menuItem.variants.find(
        (v) => v.size === cartItem.size
      );
      if (!variant) continue;

      let unitPrice = variant.price;

      const choice = menuItem.choices.find(
        (c) => c.name === cartItem.choice
      );

      if (choice?.extraPriceBySize) {
        unitPrice +=
          choice.extraPriceBySize[cartItem.size] ?? 0;
      } else if (choice?.extraPrice) {
        unitPrice += choice.extraPrice;
      }

      const totalPrice = unitPrice * cartItem.quantity;
      addedTotal += totalPrice;

      calculatedItems.push({
        itemId: menuItem._id,
        name: menuItem.name,
        size: cartItem.size,
        choice: cartItem.choice,
        quantity: cartItem.quantity,
        unitPrice,
        totalPrice,
        status: "PENDING", // 👈 item lifecycle starts here
      });
    }

    /* ---------- FIND TABLE ORDER (ONLY ONE EVER) ---------- */

    let order = await Order.findOne({ table });

    /* ---------- APPEND ITEMS ---------- */
    if (order) {
      order.items.push(...calculatedItems);
      order.grandTotal += addedTotal;
      order.status = "ACTIVE"
      await order.save();

      await pusher.trigger("orders", "order:placed", {
        orderId: order._id,
        table,
      });

      await pusher.trigger("admin", "orders:updated", {
        orderId: order._id,
        table: order.table,
      });

      return NextResponse.json({
        success: true,
        orderId: order._id,
        items: order.items,
        grandTotal: order.grandTotal,
        appended: true,
      });
    }
    /* ---------- CREATE ORDER (ONLY FIRST TIME) ---------- */
    else {
      order = await Order.create({
        table,
        items: calculatedItems,
        grandTotal: addedTotal,
        status: "PLACED",
      });
      await pusher.trigger("admin", "orders:new", {
        orderId: order._id,
        table: order.table,
      });
      return NextResponse.json({
        success: true,
        orderId: order._id,
        items: order.items,
        grandTotal: order.grandTotal,
        appended: false,
      });
    }

  } catch (error) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
