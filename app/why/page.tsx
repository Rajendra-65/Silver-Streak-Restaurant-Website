"use client";
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation";

interface Feature {
  title: string
  description: string
  icon: string
}

const features: Feature[] = [
  {
    title: "Authentic Recipes",
    description:
      "Traditional Chinese recipes passed down through generations, maintaining the true essence of authentic cuisine.",
    icon: "🍜",
  },
  {
    title: "Premium Ingredients",
    description:
      "We source only the finest ingredients from trusted suppliers to ensure exceptional quality in every dish.",
    icon: "🌾",
  },
  {
    title: "Expert Chefs",
    description:
      "Our experienced chefs trained in China bring decades of expertise to craft authentic culinary masterpieces.",
    icon: "👨‍🍳",
  },
  {
    title: "Exceptional Service",
    description:
      "Dedicated staff committed to providing warm hospitality and ensuring an unforgettable dining experience.",
    icon: "⭐",
  },
  {
    title: "Family Atmosphere",
    description:
      "A welcoming environment where families and friends gather to create lasting memories over great food.",
    icon: "❤️",
  },
  {
    title: "Fresh & Quick",
    description:
      "Every dish is prepared fresh to order. Fast service without compromising on quality and authenticity.",
    icon: "⚡",
  },
]

const testimonials = [
  {
    name: "Michael Johnson",
    role: "Regular Customer",
    text: "Favourite place for having Chinese food. Efu noodles must recommend",
    image: "/testimonial-michael.jpg",
  },
  {
    name: "Lisa Wang",
    role: "Food Critic",
    text: "An outstanding experience. The chef's expertise shines through in every dish. This is authentic Chinese cuisine done right.",
    image: "/testimonial-lisa.jpg",
  },
  {
    name: "David Martinez",
    role: "Business Owner",
    text: "We host client dinners here regularly. The consistently excellent food and impeccable service make it the perfect choice.",
    image: "/testimonial-david.jpg",
  },
]

export default function Page() {
  const router = useRouter()
  return (
    <>
      <main className="bg-neutral-950 text-foreground">
        {/* Hero Section */}
        <section className="relative w-full h-80 bg-linear-to-br from-neutral-800 to-neutral-900 overflow-hidden ">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-6xl font-bold text-text-balance mb-4 text-accent">
                Why Choose <span className="text-accent">Silver Streak</span>
              </h1>
              <p className="text-xl text-accent">Excellence, authenticity, and unforgettable experiences</p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-t-white">
          <h2 className="text-4xl font-bold mb-16 text-center text-accent">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-neutral-800 to-neutral-900 p-8 rounded-lg border border-border hover:border-accent transition-colors group"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-accent">{feature.title}</h3>
                <p className="leading-relaxed text-accent">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Promise Section */}
        <section className="py-20 px-4 md:px-8 bg-linear-to-br from-neutral-800 to-neutral-900 border-t border-t-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image src="/ingrediants/fresh-ingrediants.jpg" alt="Premium Quality Ingredients" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6 text-accent">Our Quality Promise</h2>
                <p className="text-lg text-accent mb-4 leading-relaxed">
                  At Silver Streak, quality is not negotiable. We believe that great food starts with great ingredients
                  and the skill to prepare them perfectly. That&apos;s why we:
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold mb-1 text-accent">Source Ethically</h4>
                      <p className="text-muted-foreground">
                        Partner with trusted suppliers who share our commitment to quality and sustainability.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold mb-1 text-accent">Cook with Passion</h4>
                      <p className="text-muted-foreground">
                        Our chefs prepare each dish with meticulous attention to detail and traditional techniques.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent text-xl mt-1">✓</span>
                    <div>
                      <h4 className="font-bold mb-1 text-accent">Serve Fresh</h4>
                      <p className="text-muted-foreground">
                        Every order is prepared fresh to ensure optimal flavor and nutritional value.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-t-white">
          <h2 className="text-4xl font-bold mb-16 text-center text-accent">What Our Guests Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-linear-to-br from-neutral-800 to-neutral-900 p-8 rounded-lg border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-accent">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="leading-relaxed italic text-accent">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-8 bg-linear-to-br from-neutral-800 to-neutral-900 text-primary-foreground border-t border-t-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience Silver Streak Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who have discovered authentic Chinese cuisine at its finest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-secondary text-secondary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
                onClick={()=>router.push('/menu')}
              >
                View Menu
              </Button>
              
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
