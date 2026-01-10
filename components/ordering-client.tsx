"use client";

import { useMemo } from "react";
import { MenuItem } from "@/types/menu";
import { MenuItemCard } from "./menu-item-card";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
    table: string;
    menu: MenuItem[];
};

export default function OrderingClient({ table, menu }: Props) {
    const categories = useMemo(
        () => Array.from(new Set(menu.map((m) => m.category))),
        [menu]
    );

    return (
        <div className="bg-neutral-950 text-white">
            {/* CATEGORY BAR */}
            <div className="sticky top-0 z-50 bg-black p-3 flex gap-3 overflow-x-scroll">
                {categories.map((cat) => (
                    <a key={cat} href={`#${cat}`} className="text-sm whitespace-nowrap">
                        <Button>
                            {cat}
                        </Button>
                    </a>
                ))}
                
            </div>

            {/* ITEMS */}
            <div className="flex items-center justify-center mt-2 z-50 sticky top-18 bg-neutral-950">
                <Link
                    href={`/ordering/${table}/cart`}
                >
                    <Button
                        className="bg-amber-400 w-52 hover:bg-amber-700"
                    >
                        <h1>Visit Cart</h1>
                    </Button>
                </Link>
            </div>
            <div className="p-4 space-y-10">
                {categories.map((category) => (
                    <div key={category} id={category}>
                        <h2 className="text-lg font-semibold mb-20">{category}</h2>

                        <div className="space-y-4">
                            {menu
                                .filter((item) => item.category === category)
                                .map((item) => (
                                    <MenuItemCard key={item._id} item={item} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
