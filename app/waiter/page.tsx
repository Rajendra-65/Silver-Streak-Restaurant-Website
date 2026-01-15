"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { playPlaceOrderNotificationSound } from "@/utils/playSound";
import { useAuthGuard } from "@/hooks/useAuthGaurd";

/* ---------------- TYPES ---------------- */

type ConfirmOrderItem = {
  name: string;
  quantity: number;
  size: string;
  choice?: string;
};

type ConfirmOrder = {
  _id: string;
  table: string;
  items: ConfirmOrderItem[];
  grandTotal: number;
};

type ServeItem = {
  _id: string;
  name: string;
  quantity: number;
  size: string;
  choice?: string;
};

type ServeOrder = {
  _id: string;
  table: string;
  items: ServeItem[];
};

/* ---------------- COMPONENT ---------------- */

export default function Page() {
  useAuthGuard(["WAITER"])
  const [tab, setTab] = useState<"CONFIRM" | "SERVE">("CONFIRM");

  const [confirmOrders, setConfirmOrders] = useState<ConfirmOrder[]>([]);
  const [serveOrders, setServeOrders] = useState<ServeOrder[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ---------------- */

  const fetchConfirmOrders = useCallback(async () => {
    const res = await fetch("/api/waiter/orders-to-confirm");
    const data = await res.json();
    setConfirmOrders(data.orders || []);
  }, []);

  const fetchServeOrders = useCallback(async () => {
    const res = await fetch("/api/waiter/orders-to-serve");
    const data = await res.json();
    setServeOrders(data.orders || []);
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([
      fetchConfirmOrders(),
      fetchServeOrders(),
    ]);
    setLoading(false);
  }, [fetchConfirmOrders, fetchServeOrders]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;
      await fetchAll();
    };

    load(); // initial fetch

    const interval = setInterval(() => {
      if (mounted) {
        fetchAll();
      }
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [fetchAll]);

  /* ---------------- ACTIONS ---------------- */

  const confirmOrder = async (orderId: string) => {
    await fetch("/api/waiter/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    playPlaceOrderNotificationSound();
    toast.success("Order confirmed");
    fetchAll();
  };

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
    fetchAll();
  };

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return <div className="p-4 text-accent">Loading…</div>;
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="p-4 bg-neutral-950 min-h-screen space-y-4">
      <h1 className="text-xl font-semibold text-accent">
        👨‍🍳 Waiter Panel
      </h1>

      {/* TABS */}
      <div className="flex gap-2">
        <Button
          onClick={() => setTab("CONFIRM")}
          className={
            tab === "CONFIRM"
              ? "bg-amber-500 text-black hover:bg-amber-600"
              : "bg-neutral-900 text-gray-300 border border-neutral-700 hover:bg-neutral-800"
          }
        >
          Confirm Orders
        </Button>
        <Button
          onClick={() => setTab("SERVE")}
          className={
            tab === "SERVE"
              ? "bg-amber-500 text-black hover:bg-amber-600"
              : "bg-neutral-900 text-gray-300 border border-neutral-700 hover:bg-neutral-800"
          }
        >
          Items to Serve
        </Button>
      </div>

      {/* ---------------- CONFIRM ORDERS ---------------- */}
      {tab === "CONFIRM" && (
        <div className="space-y-4">
          {confirmOrders.length === 0 && (
            <p className="text-accent">No orders to confirm</p>
          )}

          {confirmOrders.map(order => (
            <div
              key={order._id}
              className="border border-neutral-800 rounded p-4 bg-neutral-900 space-y-3"
            >
              <div className="flex justify-between">
                <h2 className="text-accent font-semibold">
                  Table {order.table}
                </h2>
                <span className="text-yellow-400 text-sm">
                  PLACED
                </span>
              </div>

              {order.items.map((item, idx) => (
                <p
                  key={idx}
                  className="text-sm text-gray-300"
                >
                  {item.name} • {item.size}
                  {item.choice && ` • ${item.choice}`} ×{" "}
                  {item.quantity}
                </p>
              ))}

              <div className="flex justify-between font-semibold text-accent">
                <span>Total</span>
                <span>₹ {order.grandTotal}</span>
              </div>

              <Button
                className="w-full bg-green-600"
                onClick={() => confirmOrder(order._id)}
              >
                Confirm Order
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- SERVE ITEMS ---------------- */}
      {tab === "SERVE" && (
        <div className="space-y-4">
          {serveOrders.length === 0 && (
            <p className="text-accent">No items ready</p>
          )}

          {serveOrders.map(order => (
            <div
              key={order._id}
              className="border border-neutral-800 rounded p-4 bg-neutral-900 space-y-3"
            >
              <h2 className="text-accent font-semibold">
                Table {order.table}
              </h2>

              {order.items.map(item => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-neutral-800 p-3 rounded"
                >
                  <div>
                    <p className="text-accent font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.size}
                      {item.choice && ` • ${item.choice}`} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className="bg-green-600"
                    onClick={() =>
                      serveItem(order._id, item._id)
                    }
                  >
                    Served
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
