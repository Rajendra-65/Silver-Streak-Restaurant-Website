import { NextResponse } from "next/server";
import { connectDb } from "@/utils/ConnectDb";
import { Menu } from "@/models/Menu";
import { Order } from "@/models/Order";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items,table } = body;

    await connectDb();

    const calculatedItems = [];
    let grandTotal = 0;

    for (const cartItem of items) {
      const menuItem = await Menu.findById(cartItem.itemId).lean();

      if (!menuItem) {
        return NextResponse.json(
          { success: false, message: "Invalid item" },
          { status: 400 }
        );
      }

      const variant = menuItem.variants.find(
        (v: any) => v.size === cartItem.size
      );

      if (!variant) {
        return NextResponse.json(
          { success: false, message: "Invalid size" },
          { status: 400 }
        );
      }

      let unitPrice = variant.price;

      const choice = menuItem.choices.find(
        (c: any) => c.name === cartItem.choice
      );

      if (choice?.extraPriceBySize) {
        unitPrice += choice.extraPriceBySize[cartItem.size] ?? 0;
      } else if (choice?.extraPrice) {
        unitPrice += choice.extraPrice;
      }

      const totalPrice = unitPrice * cartItem.quantity;
      grandTotal += totalPrice;

      calculatedItems.push({
        itemId: menuItem._id,
        name: menuItem.name,
        size: cartItem.size,
        choice: cartItem.choice,
        quantity: cartItem.quantity,
        unitPrice,
        totalPrice,
        grandTotal
      });
    }

    const order = await Order.create({
      table: table,
      items: calculatedItems,
      grandTotal,
    });

    return NextResponse.json({
      success: true,
      orderId: order._id,
      items : calculatedItems,
      grandTotal : grandTotal,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
