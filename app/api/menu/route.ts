import { Menu } from "@/models/Menu";
import { connectDb } from "@/utils/ConnectDb";
import { NextResponse } from "next/server";
import { MenuItem } from "@/types/menu";
export const GET = async() => {
    try{
        await connectDb();
        const menu : MenuItem[] = await Menu.find({ isAvailable: true }).lean();
        return NextResponse.json({
            success : true,
            menu   
        });
    }catch(e) {
        console.log(e)
    }
}
