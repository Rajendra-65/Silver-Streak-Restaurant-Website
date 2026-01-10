"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { playNotificationSound } from "@/utils/playSound";


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
  grandTotal: number;
  status: "PLACED" | "CONFIRMED" | "SERVED";
};

export default function WaiterPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/waiter/orders");
    playNotificationSound()
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 500000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  const confirmOrder = async (orderId: string) => {
    await fetch("/api/waiter/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    fetchOrders();
  };

  if (loading) {
    return <div className="p-4">Loading orders…</div>;
  }

  if (orders.length === 0) {
    return <div className="p-4">No pending orders</div>;
  }

  return (
    <div className="p-4 space-y-4 bg-neutral-950 min-h-screen">
      <h1 className="text-xl font-semibold text-accent">
        Waiter Order Confirmation
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-neutral-900 border rounded p-4 space-y-2"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-accent">
              Table {order.table}
            </h2>
            <span className="text-yellow-400 text-sm">
              {order.status}
            </span>
          </div>

          {/* ITEMS */}
          <div className="space-y-1">
            {order.items.map((item, idx) => (
              <p
                key={idx}
                className="text-sm text-accent"
              >
                {item.name} • {item.size}
                {item.choice && ` • ${item.choice}`} ×{" "}
                {item.quantity}
              </p>
            ))}
          </div>

          {/* TOTAL */}
          <div className="flex justify-between font-semibold text-accent">
            <span>Total</span>
            <span>₹ {order.grandTotal}</span>
          </div>

          {/* ACTION */}
          {order.status === "PLACED" && (
            <Button
              className="w-full bg-green-600 hover:bg-green-800"
              onClick={() => confirmOrder(order._id)}
            >
              Confirm Order
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
