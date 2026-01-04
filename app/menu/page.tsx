"use client"

import { useState } from "react"
import Footer from "@/components/footer"
import Image from "next/image"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  spicy: boolean
}

const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: "1",
    name: "Crispy Spring Rolls",
    description: "Golden-fried spring rolls filled with vegetables and shrimp. Served with sweet and sour sauce.",
    price: 8.99,
    category: "Appetizers",
    image: "/spring-rolls.jpg",
    spicy: false,
  },
  {
    id: "2",
    name: "Peking Duck Bites",
    description: "Tender duck with crispy skin served with plum sauce and thin pancakes.",
    price: 12.99,
    category: "Appetizers",
    image: "/peking-duck.jpg",
    spicy: false,
  },
  {
    id: "3",
    name: "Sizzling Shrimp Toast",
    description: "Shrimp paste on crispy toast, topped with sesame seeds. A signature starter.",
    price: 9.99,
    category: "Appetizers",
    image: "/shrimp-toast.jpg",
    spicy: false,
  },
  {
    id: "4",
    name: "Szechuan Chicken Wings",
    description: "Spicy wings coated in Szechuan sauce with numbing peppercorns. Bold and flavorful.",
    price: 10.99,
    category: "Appetizers",
    image: "/chicken-wings.jpg",
    spicy: true,
  },

  // Main Courses
  {
    id: "5",
    name: "Kung Pao Chicken",
    description: "Diced chicken with roasted peanuts, bell peppers, and dried chilies in a tangy sauce.",
    price: 14.99,
    category: "Main Courses",
    image: "/kung-pao-chicken.jpg",
    spicy: true,
  },
  {
    id: "6",
    name: "Mapo Tofu",
    description: "Silky tofu in a fiery Szechuan sauce with ground pork, served over steamed rice.",
    price: 13.99,
    category: "Main Courses",
    image: "/mapo-tofu.jpg",
    spicy: true,
  },
  {
    id: "7",
    name: "Beef with Broccoli",
    description: "Tender sliced beef stir-fried with fresh broccoli in a savory garlic sauce.",
    price: 15.99,
    category: "Main Courses",
    image: "/beef-broccoli.jpg",
    spicy: false,
  },
  {
    id: "8",
    name: "Sweet & Sour Fish",
    description: "Whole fish or fillet with vegetables in a sweet and tangy sauce. A classic favorite.",
    price: 16.99,
    category: "Main Courses",
    image: "/sweet-sour-fish.jpg",
    spicy: false,
  },
  {
    id: "9",
    name: "Singapore Mei Fun",
    description: "Thin rice noodles with shrimp, chicken, and vegetables in a curry-flavored sauce.",
    price: 13.99,
    category: "Main Courses",
    image: "/mei-fun.jpg",
    spicy: true,
  },
  {
    id: "10",
    name: "Chow Mein",
    description: "Crispy or soft noodles with your choice of protein and fresh vegetables.",
    price: 12.99,
    category: "Main Courses",
    image: "/chow-mein.jpg",
    spicy: false,
  },

  // Seafood
  {
    id: "11",
    name: "Salt & Pepper Squid",
    description: "Lightly battered squid with crispy salt and pepper seasoning. Addictively delicious.",
    price: 14.99,
    category: "Seafood",
    image: "/salt-pepper-squid.jpg",
    spicy: false,
  },
  {
    id: "12",
    name: "Shrimp with Garlic Sauce",
    description: "Succulent shrimp in a rich garlic and black bean sauce with peppers.",
    price: 15.99,
    category: "Seafood",
    image: "/garlic-shrimp.jpg",
    spicy: true,
  },
  {
    id: "13",
    name: "Lobster Cantonese Style",
    description: "Fresh lobster stir-fried with ginger, garlic, and scallions. Premium indulgence.",
    price: 24.99,
    category: "Seafood",
    image: "/lobster-cantonese.jpg",
    spicy: false,
  },

  // Soups
  {
    id: "14",
    name: "Hot & Sour Soup",
    description: "Tangy and spicy broth with tofu, mushrooms, and bamboo shoots.",
    price: 6.99,
    category: "Soups",
    image: "/hot-sour-soup.jpg",
    spicy: true,
  },
  {
    id: "15",
    name: "Wonton Soup",
    description: "Delicate wontons filled with shrimp and pork in a light chicken broth.",
    price: 6.99,
    category: "Soups",
    image: "/wonton-soup.jpg",
    spicy: false,
  },
]

const categories = ["All Items", ...Array.from(new Set(menuItems.map((item) => item.category)))]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Items")

  const filteredItems =
    selectedCategory === "All Items" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <>
      <main className="bg-neutral-950 text-foreground">
        {/* Hero Section */}
        <section className="relative w-full h-80 bg-linear-to-br from-neutral-800 to-neutral-900 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-6xl font-bold text-text-balance text-accent mb-4">
                Our <span className="text-accent">Menu</span>
              </h1>
              <p className="text-xl text-accent">
                Authentic Chinese cuisine crafted with premium ingredients
              </p>
            </div>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card text-foreground hover:bg-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-lg overflow-hidden border border-border hover:border-accent transition-colors group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden ">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {item.spicy && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      🌶️ Spicy
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-accent">{item.name}</h3>
                  <p className="text-accent text-sm mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">${item.price.toFixed(2)}</span>
                    <button className="bg-yellow-400 text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                      order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
