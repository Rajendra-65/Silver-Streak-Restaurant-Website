"use client"

import { Card } from "@/components/ui/card"

export default function QROrderingSection() {
  return (
    <section className="bg-neutral-950 py-20 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-1 bg-red-700 mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">Order at Your Table</h2>
            <p className="text-lg text-neutral-300 mb-6 leading-relaxed">
              Experience the convenience of our modern ordering system. Simply scan the QR code at your table and place
              your order instantly from your phone.
            </p>
            <ul className="space-y-4 text-neutral-300">
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold mt-1">✓</span>
                <span>Seamless digital ordering experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold mt-1">✓</span>
                <span>Real-time kitchen updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold mt-1">✓</span>
                <span>Multiple payment options</span>
              </li>
            </ul>
          </div>

          <Card className="bg-neutral-900 border-yellow-400/30 p-12 aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-neutral-400">QR Code Placeholder</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
