import { User } from "@/models/User"
import { connectDb } from "@/utils/ConnectDb"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export const POST = async () => {
    try {
        await connectDb()
        const users = [
            {
                email: "kitchen19@gmail.com",
                password: await bcrypt.hash("kitchen19",10),
                role: "KITCHEN"
            },
            {
                email: "waiter1@gmail.com",
                password: await bcrypt.hash("waiter1",10),
                role: "WAITER"
            },
            {
                email: "waiter2@gmail.com",
                password: await bcrypt.hash("waiter2",10),
                role : "WAITER"
            },
            {
                email: "jdasnayak44@gmail.com",
                password: await bcrypt.hash("jdasnayak",10),
                role : "ADMIN"
            }
        ]
        await User.insertMany([...users])
        return NextResponse.json({
            success: true,
            status: 200
        })
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            status: 404
        })
    }

}