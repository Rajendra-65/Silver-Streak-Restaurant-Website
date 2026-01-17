"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useAuthGuard } from "@/hooks/useAuthGaurd";
import { pusherClient } from "@/utils/pusherClient";
import { toast } from "sonner";

type OrderItem = {
  name: string;
  quantity: number;
  size: string;
  choice?: string;
  status: string;
};

type Order = {
  _id: string;
  table: string;
  status: "PLACED" | "ACTIVE" | "COMPLETED";
  grandTotal: number;
  createdAt: string;
  items: OrderItem[];
  paymentStatus: string;
  paymentMethod : string;
};

export default function Page() {
  useAuthGuard(["ADMIN"]);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  /* ---------------- FETCH ORDERS ---------------- */
  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /* ---------------- REALTIME PUSHER ---------------- */
  useEffect(() => {
    const channel = pusherClient.subscribe("admin");

    channel.bind("orders:new", fetchOrders);
    channel.bind("orders:confirmed", fetchOrders);
    channel.bind("orders:updated", fetchOrders);
    channel.bind("orders:completed", fetchOrders);
    channel.bind("item-status-updated", fetchOrders);

    return () => {
      pusherClient.unsubscribe("admin");
    };
  }, [fetchOrders]);

  /* ---------------- MARK PAID FOR CASH ---------------- */
  const markPaid = async (orderId: string) => {
    await fetch("/api/admin/mark-paid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    toast.success("Order Marked As PAID");
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

      <div className="space-y-3">
        {orders.map(order => (
          <div
            key={order._id}
            className="border border-neutral-800 rounded"
          >
            {/* SUMMARY */}
            <div className="grid grid-cols-5 gap-3 px-4 py-3 items-center">
              <span className="text-accent font-medium">
                Table {order.table}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded w-fit ${order.status === "COMPLETED"
                  ? "bg-green-600/20 text-green-400"
                  : order.status === "ACTIVE"
                    ? "bg-blue-600/20 text-blue-400"
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

                {order.paymentStatus === "UNPAID" && (
                  <Button
                    size="sm"
                    className="bg-green-600"
                    onClick={() => markPaid(order._id)}
                  >
                    Mark as Paid (Cash)
                  </Button>
                )}

              </div>
            </div>

            {/* ITEMS (READ ONLY) */}
            {expandedOrder === order._id && (
              <div className="bg-neutral-900 border-t border-neutral-800 px-4 py-3 space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-accent">
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
