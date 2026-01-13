import { Order } from "@/models/Order";
import { connectDb } from "@/utils/ConnectDb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { table } = await req.json();
    await connectDb();
    const order_of_the_table = await Order.find({
        table : table
    })
    return NextResponse.json({
        order : order_of_the_table,
        success : true
    })
  }catch(e) {
    console.log(e);
    return NextResponse.json({
        success : false,
    })
  }
}