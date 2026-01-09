import { Menu } from "@/models/Menu"
import { connectDb } from "@/utils/ConnectDb"
import { NextResponse } from "next/server"

export const GET = async () => {
    try{
        await connectDb()

        const Chicken = await Menu.find({category : "Chicken"});
        const Dimsum = await Menu.find({category : "Dimsum"});
        const Non_Veg_Starter = await Menu.find({category : "Non-Veg-Starter"});
        const Noodles = await Menu.find({category : "Noodles"});
        const Rice = await Menu.find({category : "Rice"});
        const Sea_Food_Starter = await Menu.find({category:"Sea-Food-Starter"});
        const Sea_Food = await Menu.find({category:"Sea-Food"});
        const Soup = await Menu.find({category : "Soup"});
        const Veg_Starter = await Menu.find({category:"Veg_Starter"});
        const Vegetable = await Menu.find({category : "Vegetable"});
        const Vegetarian = await Menu.find({category : "Vegetarian"})
        console.log(Dimsum);
        return NextResponse.json({
            Chicken : Chicken,
            Dimsum : Dimsum,
            Non_Veg_Starter : Non_Veg_Starter,
            Noodles : Noodles,
            Rice : Rice,
            Sea_Food_Starter : Sea_Food_Starter,
            Sea_Food : Sea_Food,
            Soup : Soup,
            Veg_Starter : Veg_Starter,
            Vegetable : Vegetable,
            Vegetarian : Vegetarian,
            success : true,
            status : 200
        })
    } catch(e){
        console.log(e)
        return NextResponse.json(
            {success : false , message : "Server error"},
            {status : 500}
        )
    }
}