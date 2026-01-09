"use client";

import { createContext, useContext, useState } from "react";
import { CartItem } from "@/types/cart";

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === item.id &&
          i.size === item.size &&
          i.choice === item.choice
      );

      if (existing) {
        return prev.map((i) =>
          i === existing
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
