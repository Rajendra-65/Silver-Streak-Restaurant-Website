import { Menu } from "@/models/Menu";
import { connectDb } from "@/utils/ConnectDb";
import { NextResponse } from "next/server";

export const GET = async() => {
    try{
        await connectDb();
        const categories = await Menu.distinct("category");
        return NextResponse.json({
            success : true,
            categories : categories
        })
    }catch(e) {
        console.log(e)
        return NextResponse.json({
            success : false
        })
    }
}
