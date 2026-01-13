// import OrderItem from "@/components/order-item";
// import { getMenu } from "@/service/menu/get-menu";
// import Image from "next/image";
import { MenuItem } from "@/types/menu";
// import Link from "next/link";
// import { getMenuByCategory } from "@/service/menu/get-menu-by-category";
import { connectDb } from "@/utils/ConnectDb";
import { Menu } from "@/models/Menu";
import OrderingClient from "@/components/ordering-client";
interface OrderParam {
  params: { table: string };
}


const Ordering = async ({ params }: OrderParam) => {

  const { table } = await params;
  
  await connectDb();
  
  const menu = await Menu.find({
    isAvailable:true
  }).lean<MenuItem[]>()

  const safeMenu = menu.map((item:MenuItem) => ({
  ...item,
  _id: item._id.toString(),
}));


  return(
    <OrderingClient
      table = {table}
      menu = {safeMenu}
    />
  )

  
  
}



export default Ordering;