import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Order } from "@/models/Order";
import { Menu } from "@/models/Menu";

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


export async function POST(req: Request) {
  try {
    const { table, items } = await req.json();
    await connectDb();

    const calculatedItems = [];
    let addedTotal = 0;

    // 🔐 Always calculate price on server
    for (const cartItem of items) {
      const menuItem = (await Menu.findById(cartItem.itemId).lean()) as MenuLean | null;
      if (!menuItem) continue;

      const variant = menuItem.variants.find(
        (v: Variant) => v.size === cartItem.size
      );
      if (!variant) continue;

      let unitPrice = variant.price;

      const choice = menuItem.choices.find(
        (c: Choice) => c.name === cartItem.choice
      );

      if (choice?.extraPriceBySize) {
        unitPrice += choice.extraPriceBySize[cartItem.size] ?? 0;
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
      });
    }

    
    // 1️⃣ FIND ACTIVE ORDER FOR TABLE
    const activeOrder = await Order.findOne({
      table,
      status: {$in :["PLACED","ACTIVE"]},
    });

    // 2️⃣ APPEND TO EXISTING ACTIVE ORDER
    if (activeOrder) {
      const itemsWithStatus = calculatedItems.map(item => ({
        ...item,
        status: "PENDING", // 👈 IMPORTANT
      }));

      activeOrder.items.push(...itemsWithStatus);
      activeOrder.grandTotal += addedTotal;

      await activeOrder.save();

      return NextResponse.json({
        success: true,
        orderId: activeOrder._id,
        items: activeOrder.items,
        grandTotal: activeOrder.grandTotal,
        appended: true,
      });
    }

    // 3️⃣ CREATE NEW ORDER (ONLY IF NO ACTIVE ORDER)
    const newOrder = await Order.create({
      table,
      items: calculatedItems.map(item => ({
        ...item,
        status: "PENDING", // 👈 IMPORTANT
      })),
      grandTotal: addedTotal,
      status: "PLACED", // ✅ FIXED
    });

    return NextResponse.json({
      success: true,
      orderId: newOrder._id,
      items: newOrder.items,
      grandTotal: newOrder.grandTotal,
      status : newOrder.status,
      appended: false,
    });

    
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}
