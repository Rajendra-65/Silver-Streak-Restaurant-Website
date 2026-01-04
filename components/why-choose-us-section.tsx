"use client"

import { Card } from "@/components/ui/card"
import { Leaf, Flame, Zap } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "Daily sourced premium ingredients for authentic flavors",
  },
  {
    icon: Flame,
    title: "Authentic Recipes",
    description: "Traditional cooking techniques passed through generations",
  },
  {
    icon: Zap,
    title: "Quick Service",
    description: "Fast, efficient service without compromising quality",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="bg-neutral-900 py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="w-12 h-1 bg-red-700 mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">Why Choose Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-neutral-800 border-neutral-700 p-8 hover:border-yellow-400 transition-colors"
              >
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
