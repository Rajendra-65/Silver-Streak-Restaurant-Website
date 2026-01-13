"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type MenuItem = {
  _id: string;
  name: string;
  category: string;
  isAvailable: boolean;
};

export default function Page() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/menu");
    const data = await res.json();
    setMenu(data.menu || []);
    setLoading(false);
  };
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!mounted) return;
      await fetchMenu();
    };

    load(); // initial fetch

    const interval = setInterval(() => {
      if (mounted) {
        fetchMenu();
      }
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const toggleAvailability = async (id: string) => {
    await fetch("/api/admin/menu/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    toast.success("Item updated");
    fetchMenu();
  };

  if (loading) {
    return (
      <div className="p-6 bg-neutral-950 min-h-screen text-accent">
        Loading menu…
      </div>
    );
  }

  return (
    <div className="p-6 bg-neutral-950 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-accent">
        Admin – Menu Management
      </h1>

      {/* GROUP BY CATEGORY */}
      {Object.entries(
        menu.reduce<Record<string, MenuItem[]>>((acc, item) => {
          acc[item.category] = acc[item.category] || [];
          acc[item.category].push(item);
          return acc;
        }, {})
      ).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h2 className="text-lg font-semibold text-accent">
            {category}
          </h2>

          <div className="border border-neutral-800 rounded divide-y divide-neutral-800">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center px-4 py-3"
              >
                <div>
                  <p className="text-accent font-medium">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.isAvailable ? "Available" : "Hidden"}
                  </p>
                </div>

                <Switch
                  checked={item.isAvailable}
                  onCheckedChange={() =>
                    toggleAvailability(item._id)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
