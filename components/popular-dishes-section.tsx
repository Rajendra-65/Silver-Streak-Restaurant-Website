"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const dishes = [
  {
    id: 1,
    name: "Kung Pao Chicken",
    price: "$14.99",
    description: "Tender chicken with roasted peanuts and chilies",
  },
  {
    id: 2,
    name: "Mapo Tofu",
    price: "$12.99",
    description: "Silky tofu in spicy numbing sauce",
  },
  {
    id: 3,
    name: "Peking Duck",
    price: "$24.99",
    description: "Crispy skin with plum sauce and crepes",
  },
  {
    id: 4,
    name: "Lo Mein Noodles",
    price: "$11.99",
    description: "Stir-fried noodles with fresh vegetables",
  },
  {
    id: 5,
    name: "Shrimp Dumpling",
    price: "$9.99",
    description: "Handmade dumplings with shrimp and chives",
  },
  {
    id: 6,
    name: "Hot Pot Broth",
    price: "$19.99",
    description: "Customizable hot pot with premium meats",
  },
]

export default function PopularDishesSection() {
  return (
    <section className="bg-neutral-950 py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="w-12 h-1 bg-red-700 mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Popular Dishes</h2>
          <p className="text-neutral-400 text-lg">Discover our most beloved creations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <Card
              key={dish.id}
              className="bg-neutral-900 border-neutral-700 overflow-hidden hover:border-yellow-400 transition-colors"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-linear-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl mb-2">🥢</div>
                  <p className="text-neutral-500 text-sm">Chinese Dish</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{dish.name}</h3>
                <p className="text-neutral-400 text-sm mb-4">{dish.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-yellow-400">{dish.price}</span>
                  <Button size="sm" className="bg-red-700 hover:bg-red-800 text-white">
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
