import { User } from "@/models/User"
import { connectDb } from "@/utils/ConnectDb"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connectDb()
        const user = await User.find();
        return NextResponse.json({
            success : true,
            user : user
        })
    }catch(e){
        console.log(e)
        return NextResponse.json({
            success : false,
            status : 404
        })
    }
}