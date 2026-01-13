"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItem } from "@/types/cart";
import { toast } from "sonner";
import { playPlaceOrderNotificationSound } from "@/utils/playSound";

type OrderStatus = "PLACED" | "ACTIVE" | "PREPARING" | "COMPLETED";

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const { table } = useParams<{ table: string }>();
  const router = useRouter();

  const [placing, setPlacing] = useState(false);
  const [placeSuccess, setPlaceSuccess] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState<string>();
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("PLACED");

  const fetchOrderOfTheTable = async () => {
    const order = await fetch(`/api/orders/find-table/`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table }),
    });
    const data = await order.json();
    setOrderItems(data.items)
  }

  useEffect(()=>{
    fetchOrderOfTheTable()
  },[])

  const fetchOrderStatusOfTheTable = async () => {
    const order = await fetch(`/api/orders/table-status/`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table }),
    });
    const data = await order.json()
    setOrderStatus(data.status)
  }

  useEffect(()=>{
    const interval = setInterval(fetchOrderStatusOfTheTable, 5000); // refresh every 5s
    return () => clearInterval(interval);
  })

  /* ⚠️ UI ONLY (backend recalculates real price) */
  const displayTotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

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

      if (!res.ok) throw new Error("Order failed");

      const data = await res.json();

      setSuccessOrderId(data.orderId);
      setOrderItems(data.items);
      setGrandTotal(data.grandTotal);
      setOrderStatus(data.status ?? "PLACED");

      playPlaceOrderNotificationSound();
      toast.success(
        data.appended
          ? "Items added to existing order"
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

  /* ---------------- ORDER SUMMARY AFTER PLACING ---------------- */
  if (cart.length === 0 && placeSuccess) {
    return (
      <div className="bg-neutral-950 min-h-screen p-4">
        <div className="max-w-lg mx-auto border border-neutral-800 rounded p-4 space-y-4">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h1 className="text-accent font-semibold">
              Order #{successOrderId}
            </h1>
            <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400">
              {orderStatus}
            </span>
          </div>

          <p className="text-accent text-sm">
            Table {table}
          </p>

          {/* ITEMS */}
          <div className="space-y-2">
            {orderItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.choice}`}
                className="grid grid-cols-6 gap-2 text-sm text-accent bg-neutral-900 rounded px-2 py-2"
              >
                <span className="truncate col-span-2">
                  {item.name}
                </span>
                <span>{item.size}</span>
                <span>{item.choice || "-"}</span>
                <span className="text-center">
                  {item.quantity}
                </span>
                <span className="text-right col-span-2">
                  ₹ {item.totalPrice}
                </span>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="flex justify-between font-semibold text-accent">
            <span>Grand Total</span>
            <span>₹ {grandTotal}</span>
          </div>

          {/* ACTIONS */}
          <div className="text-center space-y-2 pt-2">
            {orderStatus === "PLACED" ? <p className="text-yellow-400 font-medium">
              Your Order Is Placed Successfully 
            </p> : <></>}
            {orderStatus === "ACTIVE"? <p className="text-yellow-400 font-medium">
              Your Order Is Active Will Be Prepared Soon...
            </p> : <></>}
            {orderStatus === "COMPLETED"? <p className="text-yellow-400 font-medium">
              Your Order Is Completed, Now you can make payment in counter or place new items...
            </p> : <></>}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/ordering/${table}`)}
            >
              + Add More Items
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- NORMAL CART VIEW ---------------- */
  return (
    <div className="p-4 bg-neutral-950 min-h-screen space-y-4">
      <h1 className="text-xl font-semibold text-accent">
        Your Cart
      </h1>

      {cart.length === 0 && (
        <p className="text-gray-400">
          Your cart is empty
        </p>
      )}

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
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <div className="flex justify-between font-semibold text-lg text-accent">
            <span>Total</span>
            <span>₹ {displayTotal}</span>
          </div>

          <Button
            className="w-full bg-green-600 disabled:opacity-50"
            onClick={placeOrder}
            disabled={placing}
          >
            {placing ? "Placing Order…" : "Place Order"}
          </Button>
        </>
      )}
    </div>
  );
}
