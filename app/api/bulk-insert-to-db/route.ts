import { connectDb } from "@/utils/ConnectDb"
import { Menu } from "@/models/Menu"


export const post = async () => {
    await connectDb()
    await Menu.insertMany([
        {
            name: "Ching Kao",
            category: "Dimsum",
            description: "Soft steamed momos served with spicy chutney",
            image: "/menuImages/dimsum/ching-kao.png",
            variants: [
                { size: "Small", price: 120 },
                { size: "Regular", price: 220 }
            ],
            choices: [
                { name: "Veg", extraPrice: 0 },
                { name: "Non-Veg", extraPrice: 40 }
            ]
        },
        {
            name: "Pan Fried Ching Kao",
            category: "Dimsum",
            description: "Pan-seared momos with crispy base",
            image: "/menuImages/dimsum/pan-fried-ching-kao.png",
            variants: [
                { size: "Small", price: 140 },
                { size: "Regular", price: 260 }
            ],
            choices: [
                { name: "Veg", extraPrice: 0 },
                { name: "Non-Veg", extraPrice: 40 }
            ]
        }
    ]);

}