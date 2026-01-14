"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

const dishes = [
  {
    id: 1,
    name: "Crispy Szechuan Chicken",
    price: "₹171",
    description: "Crispy chicken tossed in spicy Szechuan sauce",
    image: "/menuImages/Chicken/sezuan-chicken.jpg"
  },
  {
    id: 2,
    name: "Roast Mongolian Chicken",
    price: "₹267",
    description: "Roasted chicken tossed in Mongolian sauce",
    image: "/menuImages/Non-Veg-Starter/roast-mongolian-chicken.jpg"
  },
  {
    id: 3,
    name: "Crispy Chicken Hong Kong Style",
    price: "₹171",
    description: "Crispy skin with plum sauce and crepes",
    image: "/menuImages/Non-Veg-Starter/crispy-chicken-hong-kong.jpg"
  },
  {
    id: 4,
    name: "E fu Noodles",
    price: "₹122",
    description: "Flat noodles cooked in traditional style",
    image: "/menuImages/Noodles/e-fu-noodles.jpg"
  },
  {
    id: 5,
    name: "Singapore Noodles",
    price: "₹120",
    description: "Handmade dumplings with shrimp and chives",
    image: "/menuImages/Noodles/singapore-noodles.jpg"
  },
  {
    id: 6,
    name: "Tripal Szechuan Rice",
    price: "₹120",
    description: "Triple Szechuan flavoured fried rice",
    image : "/menuImages/Rice/tripal-szechuan-rice.jpg"
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
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={dish.image as string}
                    alt={dish.name}
                    fill
                    className="object-cover"
                    priority
                  />
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
