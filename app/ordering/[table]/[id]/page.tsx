import { getMenu } from "@/service/menu/get-menu";
import OrderItem from "@/components/order-item";
import { MenuItem } from "@/types/menu";

export default async function ItemPage({
  params,
}: {
  params: { table: string; id: string };
}) {
  const menu: MenuItem[] = await getMenu();
  const item = menu.find((i) => i._id === params.id);

  if (!item) {
    return <div className="p-4">Item not found</div>;
  }

  return <OrderItem item={item} table={params.table} />;
}
