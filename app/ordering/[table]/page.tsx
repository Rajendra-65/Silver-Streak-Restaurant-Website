// import OrderItem from "@/components/order-item";
import { getMenu } from "@/service/menu/get-menu";
import Image from "next/image";
import { MenuItem } from "@/types/menu";
import Link from "next/link";
interface OrderParam {
    params: { table: string };
}


const Ordering = async ({ params }: OrderParam) => {

    const { table } = await params;
    const menu: MenuItem[] = await getMenu();

  if (!menu.length) {
    return <div className="p-4">No menu available</div>;
  }

  return (
    <div className=" mx-auto p-4 space-y-4 h-full bg-neutral-950">
      <h1 className="text-xl font-semibold text-accent">
        Menu · Table {table}
      </h1>

      {menu.map((item) => (
        <Link
          key={item._id}
          href={`/ordering/${table}/item/${item._id}`}
          className="block"
        >
          <div className="flex gap-3 border rounded-lg p-3 hover:bg-gray-700">
            {/* IMAGE */}
            <div className="relative w-20 h-20 rounded-md overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h2 className="font-medium text-accent">{item.name}</h2>
              <p className="text-sm  line-clamp-2 text-accent">
                {item.description}
              </p>

              <p className="text-sm font-semibold mt-1 text-accent">
                ₹ {item.variants[0]?.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}



export default Ordering;