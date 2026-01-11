"use client"

export default function AboutSection() {
  return (
    <section className="bg-neutral-900 py-20 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <div className="w-12 h-1 bg-red-700 mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-balance">About Silver Streak</h2>
        </div>

        <p className="text-lg text-neutral-300 leading-relaxed mb-6">
          For over  decades, Silver Streak has been a beacon of authentic Chinese cuisine in our community. Our
          commitment to excellence begins with the finest ingredients, sourced daily to ensure freshness and quality in
          every dish.
        </p>

        <p className="text-lg text-neutral-300 leading-relaxed mb-6">
          Our master chefs bring traditional cooking techniques passed down through generations, combined with a modern
          approach to presentation and service. Every plate that leaves our kitchen is a testament to our passion for
          authentic flavors.
        </p>

        <p className="text-lg text-neutral-300 leading-relaxed">
          From our family to yours, we invite you to experience the warmth, hospitality, and exceptional taste that
          makes Silver Streak special.
        </p>
      </div>
    </section>
  )
}
