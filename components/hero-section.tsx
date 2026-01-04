"use client"

import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-neutral-950 overflow-hidden flex items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-700 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 text-balance">Silver Streak</h1>

        <p className="text-xl md:text-2xl text-yellow-400 font-light mb-12 text-balance">
          Authentic Chinese Flavors, Served Fresh
        </p>

        <p className="text-base md:text-lg text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
          Experience the art of traditional Chinese cuisine crafted with premium ingredients and generations of culinary
          expertise.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white text-base px-8">
            View Menu
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 text-base px-8 bg-transparent"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Scan QR & Order
          </Button>
        </div>
      </div>

      {/* Food imagery section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-neutral-900 to-transparent"></div>
    </section>
  )
}
