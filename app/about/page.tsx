import Footer from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <>
      <main className="bg-neutral-950 text-foreground">
        {/* Hero Section */}
        <section className="relative w-full h-96 bg-neutral-950 from-card to-background overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-6xl font-bold text-text-balance text-accent mb-4">
                Our <span className="text-accent">Story</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A legacy of authentic Chinese culinary excellence since 1995
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-accent">
                Crafted with <span className="text-accent">Tradition</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Silver Streak was founded with a singular mission: to bring authentic Chinese cuisine to our community
                while honoring centuries of culinary tradition. Every dish is prepared with the finest ingredients and
                time-honored techniques passed down through generations.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Our head chef trained in Beijing and brings over 25 years of experience, ensuring every bite delivers
                the true essence of Chinese cooking. We believe in excellence, authenticity, and creating unforgettable
                dining experiences.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden bg-linear-to-br from-neutral-800 to-neutral-900 border border-amber-400">
              <Image
                src="/authentic-chinese-restaurant-interior-with-red-lan.jpg"
                alt="Silver Streak Restaurant Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12 text-center text-accent">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-linear-to-br from-neutral-800 to-neutral-900 p-8 rounded-lg border border-border">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🌾</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Authentic</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We source premium ingredients and use traditional cooking methods to ensure every dish is genuinely
                  authentic.
                </p>
              </div>
              <div className="bg-linear-to-br from-neutral-800 to-neutral-900 p-8 rounded-lg border border-border">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Excellence</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From preparation to presentation, we maintain the highest standards in everything we do.
                </p>
              </div>
              <div className="bg-linear-to-br from-neutral-800 to-neutral-900 p-8 rounded-lg border border-border">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Community</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We&apos;re committed to serving our community and creating a welcoming space for all.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div>
            <h2 className="text-4xl font-bold mb-12 text-center text-accent">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 gap-12 ">
              <div className="text-center bg-linear-to-br from-neutral-800 to-neutral-900 border rounded-sm border-amber-400">
                <div className="relative h-64 mb-6 rounded-lg overflow-hidden ">
                  <Image src="/professional-headshot-of-asian-chef-in-white-chef-.jpg" alt="Head Chef" fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Chef Wei Ming</h3>
                <p className="text-accent font-semibold mb-3">Head Chef & Founder</p>
                <p className="text-muted-foreground">
                  With 25+ years of experience in authentic Chinese cuisine, Chef Wei brings traditional Beijing cooking
                  techniques to every dish.
                </p>
              </div>
              <div className="text-center bg-linear-to-br from-neutral-800 to-neutral-900 border rounded-sm border-amber-400">
                <div className="relative h-64 mb-6 rounded-lg overflow-hidden ">
                  <Image src="/professional-headshot-of-woman-in-restaurant-manag.jpg" alt="General Manager" fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Sarah Chen</h3>
                <p className="text-accent font-semibold mb-3">General Manager</p>
                <p className="text-muted-foreground">
                  Sarah ensures every guest receives exceptional service and creates an unforgettable dining experience
                  with her warm hospitality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
