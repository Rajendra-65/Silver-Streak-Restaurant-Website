"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { playPlaceOrderNotificationSound } from "@/utils/playSound";

type OrderItem = {
  _id: string;
  name: string;
  quantity: number;
  size: string;
  choice?: string;
  status: "READY";
};

type Order = {
  _id: string;
  table: string;
  items: OrderItem[];
  status:  "ACTIVE";
};

export default function WaiterPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/waiter/orders");
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 2000);
    return () => clearInterval(interval);
  }, []);

  const serveItem = async (orderId: string, itemId: string) => {
    await fetch("/api/waiter/served", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        itemId,
        status: "SERVED",
      }),
    });

    playPlaceOrderNotificationSound();
    toast.success("Item served");
    fetchOrders();
  };

  if (loading) {
    return <div className="p-4 text-accent">Loading orders…</div>;
  }

  if (orders.length === 0) {
    return <div className="p-4 text-accent">No orders to serve</div>;
  }

  return (
    <div className="p-4 space-y-4 bg-neutral-950 min-h-screen">
      <h1 className="text-xl font-semibold text-accent">
        Waiter Serving Panel
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-neutral-900 border border-neutral-800 rounded p-4 space-y-3"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-accent">
              Table {order.table}
            </h2>
            <span className="text-sm text-yellow-400">
              {order.status}
            </span>
          </div>

          {/* ITEMS */}
          <div className="space-y-2">
            {order.items
              .filter(item => item.status === "READY")
              .map(item => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-neutral-800 px-3 py-2 rounded"
                >
                  <div className="text-sm text-accent">
                    <p className="font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.size}
                      {item.choice && ` • ${item.choice}`} × {item.quantity}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => serveItem(order._id, item._id)}
                  >
                    Served
                  </Button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
