import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import Navbar from "@/components/navbar"
import { CartProvider } from "../context/cart-context"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "Silver Streak - Authentic Chinese Restaurant",
  description:
    "Experience authentic Chinese flavors at Silver Streak. Premium ingredients, traditional recipes, and exceptional service.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-neutral-950">
        
        {/* Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <CartProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" richColors />
        </CartProvider>

      </body>
    </html>
  )
}
