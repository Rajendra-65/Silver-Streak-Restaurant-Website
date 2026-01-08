"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Menu", href: "/menu" },
    { label: "Why Us", href: "/why" },
    { label: "Ordering", href: "/ordering/t5" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950 border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold text-accent">Silver</span>
            <span className="text-2xl font-bold text-accent">Streak</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#ordering"
              className="px-6 py-2 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition-colors"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6 text-accent" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-accent/20">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="#ordering"
                className="px-4 py-2 bg-accent text-primary font-medium rounded-lg hover:bg-accent/90 transition-colors text-center text-sm"
                onClick={() => setIsOpen(false)}
              >
                Order Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
