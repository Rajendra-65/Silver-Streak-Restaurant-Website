"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { playPlaceOrderNotificationSound } from "@/utils/playSound";
import { useAuthGuard } from "@/hooks/useAuthGaurd";
import { pusherClient } from "@/utils/pusherClient";

type KitchenItem = {
  _id: string;
  name: string;
  size: string;
  choice?: string;
  quantity: number;
  status: "PENDING" | "PREPARING" | "READY";
};

type KitchenOrder = {
  _id: string;
  table: string;
  items: KitchenItem[];
};

export default function Page() {
  useAuthGuard(["KITCHEN"]);

  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    const res = await fetch("/api/kitchen/orders");
    const data = await res.json();
    setOrders(data.orders || []);
  }, []);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      await fetchOrders();
      if (mounted) setLoading(false);
    };

    load();

    return () => {
      mounted = false;
    };
  }, [fetchOrders]);


  /* ---------------- REALTIME: WAITER → KITCHEN ---------------- */
  useEffect(() => {
    const channel = pusherClient.subscribe("orders");

    channel.bind(
      "order:confirmed",
      (data: { orderId: string; table: string }) => {
        console.log("🔥 New confirmed order", data);

        toast.success(`New order for Table ${data.table}`);
        playPlaceOrderNotificationSound();

        // Re-fetch to get full order with items
        fetchOrders();
      }
    );

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe("orders");
    };
  }, [fetchOrders]);

  /* ---------------- UPDATE ITEM STATUS ---------------- */
  const updateStatus = async (
    orderId: string,
    itemId: string,
    status: "PENDING" | "PREPARING" | "READY"
  ) => {
    await fetch("/api/kitchen/item-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, itemId, status }),
    });

    playPlaceOrderNotificationSound();
    toast.success("Status updated");
    fetchOrders();
  };

  if (loading) {
    return <div className="p-4 text-accent">Loading kitchen…</div>;
  }

  return (
    <div className="p-4 bg-neutral-950 min-h-screen space-y-6">
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
              className={`flex justify-between items-center p-3 rounded ${item.status === "READY"
                ? "bg-green-600/20 border border-green-500"
                : "bg-neutral-900"
                }`}
            >
              <div>
                <p className="font-medium text-accent">
                  {item.name}
                </p>
                <p className="text-sm text-gray-400">
                  {item.size}
                  {item.choice && ` • ${item.choice}`} ×{" "}
                  {item.quantity}
                </p>
              </div>

              {item.status === "PENDING" ? (
                <Button
                  className="bg-yellow-500 text-black"
                  onClick={() =>
                    updateStatus(order._id, item._id, "PREPARING")
                  }
                >
                  Start
                </Button>
              ) : item.status === "PREPARING" ? (
                <Button
                  className="bg-green-600"
                  onClick={() =>
                    updateStatus(order._id, item._id, "READY")
                  }
                >
                  READY
                </Button>
              ) : (
                <span className="text-green-400 font-semibold">
                  Done
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
