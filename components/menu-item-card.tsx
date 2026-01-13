"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types/menu";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";

type MenuItemCardProps = {
    item: MenuItem;
    table: string;
    addedToCart: boolean;
    setAddedToCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MenuItemCard({ item, table, addedToCart, setAddedToCart }: MenuItemCardProps) {
    const [size, setSize] = useState<"Small" | "Regular">(
        item.variants?.[0]?.size ?? "Small"
    );

    const [choice, setChoice] = useState<string | undefined>(
        item.choices?.[0]?.name
    );

    const { cart, addToCart } = useCart();
    const router = useRouter()

    const alreadyInCart = cart.some(
        (c) =>
            c.id === item._id &&
            c.size === size &&
            c.choice === choice
    );

    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => setQuantity((q) => q + 1);

    const decreaseQty = () =>
        setQuantity((q) => (q > 1 ? q - 1 : 1));

    const price = useMemo(() => {
        const base =
            item.variants.find((v) => v.size === size)?.price ?? 0;

        const extra = item.choices.find((c) => c.name === choice);

        let final = base;

        if (extra?.extraPriceBySize) {
            final += extra.extraPriceBySize[size] ?? 0;
        } else if (extra?.extraPrice) {
            final += extra.extraPrice;
        }

        return final * quantity;
    }, [item, size, choice, quantity]);

    const handleAdd = () => {
        addToCart({
            id: item._id,
            name: item.name,
            image: item.image,
            size,
            choice,
            unitPrice: price / quantity,
            quantity,
        })

        setAddedToCart(true); // ✅ updates parent state
    };


    return (
        <div className="bg-neutral-900 rounded-lg p-3 flex gap-3">
            <div className="relative w-24 h-24 rounded overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>

            <div className="flex-1 space-y-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>

                {/* VARIANTS */}
                <div className="flex justify-between mt-2">
                    <div className="flex gap-2 ">
                        {item.variants.map((v) => (
                            <Button
                                key={v.size}
                                onClick={() => setSize(v.size)}
                                className={`px-2 py-1 text-xs rounded border ${size === v.size ? "bg-white text-black" : ""
                                    }`}
                            >
                                {v.size}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <h1>Quantity</h1>
                        <button
                            onClick={decreaseQty}
                            className="w-8 h-8 flex items-center justify-center rounded border"
                        >
                            -
                        </button>

                        <span className="w-6 text-center">{quantity}</span>

                        <button
                            onClick={increaseQty}
                            className="w-8 h-8 flex items-center justify-center rounded border"
                        >
                            +
                        </button>
                    </div>
                </div>



                {/* CHOICES */}
                {item.choices.length > 0 && (
                    <select
                        className="mt-2 bg-black border p-1 text-sm"
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)}
                    >
                        {item.choices.map((c) => (
                            <option key={c.name} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                )}

                {/* PRICE + ADD */}
                <div className="flex justify-between items-center mt-3">
                    <span className="font-semibold">₹ {price}</span>
                    {alreadyInCart ? (
                        <Button
                            variant="outline"
                            className="text-amber-800"
                            onClick={() => router.push(`/ordering/${table}/cart`)}
                        >
                            Go to Cart
                        </Button>
                    ) : (
                        <Button
                            className="bg-amber-700 border "
                            onClick={() => handleAdd()}
                        >Add To Cart</Button>
                    )}
                </div>
            </div>
        </div>
    );
}
