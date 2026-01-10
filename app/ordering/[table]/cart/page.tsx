"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CartItem } from "@/types/cart";

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const params = useParams();
  const [placeSuccess, setPlaceSuccess] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState();
  const { table } = params;
  const router = useRouter()

  // ⚠️ UI-ONLY total (NOT trusted)
  const displayTotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const placeOrder = async () => {
    const payload = {
      items: cart.map((item) => ({
        itemId: item.id,
        size: item.size,
        choice: item.choice,
        quantity: item.quantity,
      })),
      table: table
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });




    if (res.ok) {
      const data = await res.json();
      setSuccessOrderId(data.orderId);
      setOrderItems(data.items)
      setGrandTotal(data.grandTotal)
      alert("Order placed successfully");
      setPlaceSuccess(true);
      clearCart();
    } else {
      alert("Failed to place order");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-neutral-950 min-h-screen p-4">
        {
          placeSuccess ? <></> : <h1 className="text-accent">Your cart is empty</h1>
        }
        {
          placeSuccess ? <div className="flex border w-full p-4 rounded-sm">
            <div className="p-2">
              <h1 className="text-accent">#{successOrderId}</h1>
              <h1 className="text-accent">Table No: {table}</h1>

              <div className="space-y-2 mt-4">
                {orderItems.map((item: CartItem) => (
                  <div
                    key={`${item.id}-${item.size}-${item.choice}`}
                    className="grid grid-cols-6 gap-2 text-sm text-accent bg-neutral-900 rounded px-2 py-2"
                  >
                    <span className="font-medium truncate">{item.name}</span>
                    <span>{item.size}</span>
                    <span className="text-gray-400">{item.choice || "-"}</span>
                    <span className="text-center">{item.quantity}</span>
                    <span className="text-right">₹ {item.unitPrice}</span>
                    <span className="text-right font-semibold">₹ {item.totalPrice}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4 font-semibold text-accent">
                Grand Total: ₹ {grandTotal}
              </div>

              {/* STATUS */}
              <div className="text-center mt-8">
                <p className="text-yellow-400 font-semibold">
                  Waiting for waiter confirmation…
                </p>
                <p className="text-sm text-gray-400">
                  You will be notified once confirmed
                </p>
              </div>
            </div>

          </div> : <h1>You haven&apos;t place any order Yet</h1>
        }
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-neutral-950 min-h-screen">
      <h1 className="text-xl font-semibold text-accent">Your Order</h1>

      {cart.map((item) => (
        <div
          key={`${item.id}-${item.size}-${item.choice}`}
          className="flex gap-3 border p-3 rounded"
        >
          <div className="relative w-16 h-16">
            <Image src={item.image} alt={item.name} fill />
          </div>

          <div className="flex-1">
            <p className="font-medium text-accent">{item.name}</p>
            <p className="text-sm text-accent">
              {item.size} {item.choice && `• ${item.choice}`}
            </p>
            <p className="text-sm text-accent">
              ₹ {item.unitPrice} × {item.quantity}
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-between font-semibold text-lg">
        <span className="text-accent">Total</span>
        <span className="text-accent">₹ {displayTotal}</span>
      </div>

      <Button className="w-full bg-green-600" onClick={placeOrder}>
        Place Order
      </Button>
    </div>
  );
}
