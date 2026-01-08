"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuItem, Variant } from "@/types/menu";

type Props = {
  item: MenuItem;
  table: string;
};

export default function OrderItem({ item, table }: Props) {
  const [size, setSize] = useState<Variant["size"]>(
    item.variants[0].size
  );

  const [choice, setChoice] = useState<string>(
    item.choices[0]?.name ?? ""
  );

  const totalPrice = useMemo(() => {
    const baseVariant = item.variants.find(
      (v) => v.size === size
    );

    if (!baseVariant) return 0;

    let price = baseVariant.price;

    const selectedChoice = item.choices.find(
      (c) => c.name === choice
    );

    if (!selectedChoice) return price;

    if (selectedChoice.extraPriceBySize) {
      price += selectedChoice.extraPriceBySize[size] ?? 0;
    } else if (selectedChoice.extraPrice) {
      price += selectedChoice.extraPrice;
    }

    return price;
  }, [item, size, choice]);

  return (
    <div className="relative pb-24">

      {/* 🔝 PRICE BAR */}
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex justify-between">
        <span className="font-semibold text-lg">₹ {totalPrice}</span>
        <span className="text-sm text-gray-500">Table {table}</span>
      </div>

      {/* 🍽 ITEM */}
      <div className="p-4 space-y-4">
        <div className="relative h-48 rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold">{item.name}</h1>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>

        {/* SIZE SELECT */}
        {item.variants.length > 1 && (
          <div>
            <p className="font-medium mb-2">Size</p>
            <div className="flex gap-2">
              {item.variants.map((v) => (
                <button
                  key={v.size}
                  onClick={() => setSize(v.size)}
                  className={`px-4 py-2 rounded border ${
                    size === v.size
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHOICE SELECT */}
        {item.choices.length > 0 && (
          <div>
            <p className="font-medium mb-2">Variant</p>
            <div className="flex flex-col gap-2">
              {item.choices.map((c) => (
                <label
                  key={c.name}
                  className="flex items-center gap-2"
                >
                  <input
                    type="radio"
                    name="choice"
                    checked={choice === c.name}
                    onChange={() => setChoice(c.name)}
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ➕ ADD TO CART */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button className="w-full">
          Add to Cart • ₹ {totalPrice}
        </Button>
      </div>
    </div>
  );
}
