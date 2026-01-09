"use client";

import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  if (cart.length === 0) {
    return <div className="bg-neutral-950 h-full">
            <h1 className = "text-accent">Your cart is empty</h1>
        </div>;
  }

  return (
    <div className="p-4 space-y-4 bg-neutral-950">
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
            <p className="text-sm  text-accent">
              {item.size} {item.choice && `• ${item.choice}`}
            </p>
            <p className="text-sm text-accent">
              ₹ {item.unitPrice} × {item.quantity}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="flex justify-between font-semibold text-lg">
        <span className = "text-accent">Total</span>
        <span className = "text-accent">₹ {total}</span>
      </div>

      <Button className="w-full bg-green-600">
        Place Order
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={clearCart}
      >
        Clear Cart
      </Button>
    </div>
  );
}
