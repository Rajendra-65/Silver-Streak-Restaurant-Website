"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type KitchenItem = {
  _id: string;
  name: string;
  size: string;
  choice?: string;
  quantity: number;
  status: "PENDING" | "PREPARING";
};

type KitchenOrder = {
  _id: string;
  table: string;
  items: KitchenItem[];
};

export default function KitchenPage() {
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/kitchen/orders");
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (
    orderId: string,
    itemId: string,
    status: "PENDING" | "PREPARING" | "SERVED"
  ) => {
    await fetch("/api/kitchen/item-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, itemId, status }),
    });

    

    fetchOrders();
  };

  if (loading) {
    return <div className="p-4 text-accent">Loading kitchen…</div>;
  }

  return (
    <div className="p-4 bg-neutral-950 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-accent">
          Kitchen Window
        </h1>
        <Button variant="outline" onClick={fetchOrders}>
          Refresh
        </Button>
      </div>

      {orders.length === 0 && (
        <p className="text-gray-400">No active orders</p>
      )}

      {/* ORDERS */}
      {orders.map(order => (
        <div
          key={order._id}
          className="border border-neutral-800 rounded p-4 space-y-3"
        >
          <h2 className="text-lg font-semibold text-accent">
            Table {order.table}
          </h2>

          {order.items.map(item => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-neutral-900 p-3 rounded"
            >
              <div>
                <p className="font-medium text-accent">
                  {item.name}
                </p>
                <p className="text-sm text-gray-400">
                  {item.size}
                  {item.choice && ` • ${item.choice}`} × {item.quantity}
                </p>
              </div>

              {item.status === "PENDING" ? (
                <Button
                  className="bg-yellow-500 text-black hover:bg-yellow-600"
                  onClick={() =>
                    updateStatus(order._id, item._id, "PREPARING")
                  }
                >
                  Start
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    updateStatus(order._id, item._id, "READY")
                  }
                >
                  READY
                </Button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
