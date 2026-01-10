"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Order = {
  _id: string;
  table: string;
  status: string;
  grandTotal: number;
  items: { name: string; quantity: number }[];
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data.orders || []);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 20000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    fetchOrders();
  };

  return (
    <div className="p-6 bg-neutral-950 min-h-screen text-accent space-y-4">
      <h1 className="text-2xl font-bold">🛠 Admin Dashboard</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-neutral-700 rounded p-4 space-y-2 bg-neutral-900"
        >
          <div className="flex justify-between">
            <h2 className="font-semibold">
              Table {order.table}
            </h2>
            <span className="text-sm">{order.status}</span>
          </div>

          <div className="text-sm space-y-1">
            {order.items.map((item, i) => (
              <p key={i}>
                {item.quantity}× {item.name}
              </p>
            ))}
          </div>

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹ {order.grandTotal}</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {["PLACED", "CONFIRMED", "PREPARING", "SERVED"].map(
              (status) => (
                <Button
                  key={status}
                  size="sm"
                  className="text-amber-400"
                  variant={order.status === status ? "default" : "outline"}
                  onClick={() => updateStatus(order._id, status)}
                >
                  {status}
                </Button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
