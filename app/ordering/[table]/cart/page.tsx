"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";
import { playPlaceOrderNotificationSound } from "@/utils/playSound";
import { pusherClient } from "@/utils/pusherClient";

type OrderStatus = "PLACED" | "ACTIVE" | "COMPLETED";

type OrderItemWithStatus = CartItem & {
  status?: "PENDING" | "PREPARING" | "READY" | "SERVED";
};

export default function Page() {
  const { cart, clearCart, removeFromCart } = useCart();
  const { table } = useParams<{ table: string }>();
  const router = useRouter();

  const [placing, setPlacing] = useState(false);
  const [placeSuccess, setPlaceSuccess] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string>();
  const [orderItems, setOrderItems] = useState<OrderItemWithStatus[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [orderStatus, setOrderStatus] =
    useState<OrderStatus>("PLACED");

  /* ---------------- FETCH EXISTING ORDER ---------------- */
  const fetchOrderOfTheTable = useCallback(async () => {
    const res = await fetch("/api/orders/find-table", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table }),
    });

    const data = await res.json();

    if (data.success && data.order) {
      setOrderItems(data.order.items);
      setGrandTotal(data.order.grandTotal);
      setOrderStatus(data.order.status);
      setSuccessOrderId(data.order._id);
      setPlaceSuccess(true);
    }
  }, [table]);

  useEffect(() => {
    fetchOrderOfTheTable();
  }, [fetchOrderOfTheTable]);

  /* ---------------- REALTIME PUSHER (KITCHEN → CUSTOMER) (waiter->customer) ---------------- */
  useEffect(() => {
    if (!successOrderId) return;

    const channelName = `order-${successOrderId}`;
    const channel = pusherClient.subscribe(channelName);

    console.log("📡 Subscribed to", channelName);

    // 🟡 Kitchen → READY
    channel.bind("item-ready", (data: { itemId: string }) => {
      setOrderItems(prev =>
        prev.map(item =>
          item._id === data.itemId
            ? { ...item, status: "READY" }
            : item
        )
      );

      playPlaceOrderNotificationSound();
      toast.success("Your item is ready 🍽️");
    });

    channel.bind("item-preparing",(data: { itemId: string }) => {
      setOrderItems(prev =>
        prev.map(item =>
          item._id === data.itemId
          ? {...item , status : "PREPARING"}
          : item
        )
      )

      playPlaceOrderNotificationSound();
      toast.success("item preparation started 🍽️");
    })

    // 🟢 Waiter → SERVED
    channel.bind("item-served", (data: { itemId: string }) => {
      setOrderItems(prev =>
        prev.map(item =>
          item._id === data.itemId
            ? { ...item, status: "SERVED" }
            : item
        )
      );

      toast.success("Item served to your table ✅");
    });

    // 🏁 Order completed
    channel.bind("order-completed", () => {
      setOrderStatus("COMPLETED");
      toast.success("Order completed 🎉 Please pay at counter");
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(channelName);
    };
  }, [successOrderId]);

  /* ---------------- FALLBACK POLLING (ORDER STATUS) ---------------- */
  const fetchOrderStatus = useCallback(async () => {
    const res = await fetch("/api/orders/table-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table }),
    });

    const data = await res.json();
    setOrderStatus(data.status);
  }, [table]);

  useEffect(() => {
    const interval = setInterval(fetchOrderStatus, 7000);
    return () => clearInterval(interval);
  }, [fetchOrderStatus]);

  /* ---------------- UI TOTAL ---------------- */
  const displayTotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  /* ---------------- PLACE ORDER ---------------- */
  const placeOrder = async () => {
    if (cart.length === 0) return;

    try {
      setPlacing(true);

      const payload = {
        table,
        items: cart.map((item) => ({
          itemId: item.id,
          size: item.size,
          choice: item.choice,
          quantity: item.quantity,
        })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setSuccessOrderId(data.orderId);
      setOrderItems(data.items);
      setGrandTotal(data.grandTotal);
      setOrderStatus(data.status ?? "PLACED");

      playPlaceOrderNotificationSound();
      toast.success(
        data.appended
          ? "Items added to your order"
          : "Order placed successfully"
      );

      setPlaceSuccess(true);
      clearCart();
    } catch {
      toast.error("Failed to place order");
    } finally {
      setPlacing(false);
    }
  };

  /* ===============================================================
     ORDER SUMMARY (LIVE STATUS)
     =============================================================== */
  if (cart.length === 0 && placeSuccess) {
    return (
      <div className="bg-neutral-950 min-h-screen p-4">
        <div className="max-w-lg mx-auto border border-neutral-800 rounded p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-accent font-semibold">
              Order #{successOrderId}
            </h1>
            <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
              {orderStatus}
            </span>
          </div>

          <p className="text-accent text-sm">Table {table}</p>

          {/* ITEMS WITH LIVE STATUS */}
          <div className="space-y-2">
            {orderItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.choice}`}
                className="flex justify-between items-center bg-neutral-900 rounded px-3 py-2"
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
                <span
                  className={`text-xs px-2 py-1 rounded ${item.status === "READY"
                      ? "bg-green-600/20 text-green-400"
                      : item.status === "SERVED"
                        ? "bg-blue-600/20 text-blue-400"
                        : "bg-yellow-600/20 text-yellow-400"
                    }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold text-accent">
            <span>Grand Total</span>
            <span>₹ {grandTotal}</span>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push(`/ordering/${table}`)}
          >
            + Add More Items
          </Button>
        </div>
      </div>
    );
  }

  /* ===============================================================
     NORMAL CART VIEW (UNCHANGED)
     =============================================================== */
  return (
    <div className="p-4 bg-neutral-950 min-h-screen space-y-4">
      <h1 className="text-xl font-semibold text-accent">
        Your Cart
      </h1>

      {cart.map((item) => (
        <div
          key={`${item.id}-${item.size}-${item.choice}`}
          className="flex gap-3 border border-neutral-800 p-3 rounded"
        >
          <div className="relative w-16 h-16 rounded overflow-hidden">
            <Image src={item.image} alt={item.name} fill />
          </div>

          <div className="flex-1">
            <p className="font-medium text-accent">
              {item.name}
            </p>
            <p className="text-sm text-gray-400">
              {item.size}
              {item.choice && ` • ${item.choice}`}
            </p>
            <p className="text-sm text-accent">
              ₹ {item.unitPrice} × {item.quantity}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-400 hover:text-red-600 text-xl"
          >
            ✕
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="flex justify-between font-semibold text-accent">
            <span>Total</span>
            <span>₹ {displayTotal}</span>
          </div>

          <Button
            className="w-full bg-green-600"
            onClick={placeOrder}
            disabled={placing}
          >
            {placing ? "Placing…" : "Place Order"}
          </Button>
        </>
      )}
    </div>
  );
}
