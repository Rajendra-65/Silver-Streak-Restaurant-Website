"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Order = {
  _id: string;
  table: string;
  status: "PLACED" | "ACTIVE" | "COMPLETED";
  grandTotal: number;
  createdAt: string;
  items: {
    name: string;
    quantity: number;
    size: string;
    choice?: string;
    status: string;
  }[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data.orders || []);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;
      await fetchOrders();
    };

    load(); // initial fetch

    const interval = setInterval(() => {
      if (mounted) {
        fetchOrders();
      }
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const forceComplete = async (orderId: string) => {
    await fetch("/api/admin/force-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    fetchOrders();
  };

  if (loading) {
    return <div className="p-6 text-accent">Loading orders…</div>;
  }

  return (
    <div className="p-6 bg-neutral-950 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-accent">
        Admin – Orders Overview
      </h1>

      <div className="space-y-3 border">
        {orders.map(order => (
          <div
            key={order._id}
            className="border border-neutral-800 rounded"
          >
            {/* ROW SUMMARY */}
            <h1 className="text-accent font-medium">
              Table {order.table}
            </h1>
            <div className="grid grid-cols-5 gap-3 px-4 py-3 items-center">
              <span className="text-xs text-gray-400 truncate">
                #{order._id}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded w-fit ${order.status === "COMPLETED"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                  }`}
              >
                {order.status}
              </span>

              <span className="text-accent font-semibold">
                ₹ {order.grandTotal}
              </span>

              <span className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleTimeString()}
              </span>

              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id
                    )
                  }
                >
                  {expandedOrder === order._id ? "Hide" : "View"}
                </Button>

                {order.status !== "COMPLETED" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => forceComplete(order._id)}
                  >
                    Force Close
                  </Button>
                )}
              </div>
            </div>

            {/* READ-ONLY ITEM DETAILS */}
            {expandedOrder === order._id && (
              <div className="bg-neutral-900 border-t border-neutral-800 px-4 py-3 space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm text-accent"
                  >
                    <span>
                      {item.name} ({item.size})
                      {item.choice && ` • ${item.choice}`} × {item.quantity}
                    </span>
                    <span className="text-gray-400">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
