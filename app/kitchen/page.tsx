"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type OrderItem = {
  name: string;
  quantity: number;
  size: string;
  choice?: string;
};

type Order = {
  _id: string;
  table: string;
  items: OrderItem[];
  createdAt: string;
};

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [preparing,setPreparing] = useState(false);
  const [finish,setFinish] = useState(false);



  const fetchOrders = async () => {
    const res = await fetch("/api/kitchen/orders");
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 45000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  const markPreparing = async (orderId: string) => {
    await fetch("/api/kitchen/preparing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    setPreparing(true)

    fetchOrders();
  };

  const markFinish = async (orderId: string) => {
    await fetch("/api/kitchen/finish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    setFinish(true)

    fetchOrders();
  };

  if (loading) {
    return <div className="p-4">Loading kitchen orders…</div>;
  }

  return (
    <div className="bg-neutral-950 min-h-screen p-4 space-y-4">
      <h1 className="text-xl font-bold text-accent">
        🍳 Kitchen Window
      </h1>

      {orders.length === 0 && (
        <p className="text-gray-400">
          Waiter Not Confirmed Any Order Yet
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-neutral-900 border rounded p-4 space-y-3"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-accent">
                Table {order.table}
              </h2>
              <span className="text-sm text-yellow-400">
                CONFIRMED
              </span>
            </div>

            {/* ITEMS */}
            <div className="space-y-1">
              {order.items.map((item, idx) => (
                <p
                  key={idx}
                  className="text-accent text-sm"
                >
                  <span className="font-semibold">
                    {item.quantity}×
                  </span>{" "}
                  {item.name}
                  <span className="text-gray-400">
                    {" "}
                    ({item.size}
                    {item.choice && ` • ${item.choice}`})
                  </span>
                </p>
              ))}
            </div>

            {/* ACTION */}
            {preparing ? <Button
              className="w-full bg-orange-500 text-black font-semibold"
              onClick={() => markFinish(order._id)}
            >
              Mark Finish 
            </Button> : <Button
              className="w-full bg-orange-500 text-black font-semibold"
              onClick={() => markPreparing(order._id)}
            >
              Start Preparing
            </Button>}
          </div>
        ))}
      </div>
    </div>
  );
}
