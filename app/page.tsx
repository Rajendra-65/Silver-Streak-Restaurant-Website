"use client"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import PopularDishesSection from "@/components/popular-dishes-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import QROrderingSection from "@/components/qr-ordering-section"
import Footer from "@/components/footer"

export default function Home() {

  return (
    <>
      <main className="bg-background text-foreground">
        <HeroSection />
        <AboutSection />
        <PopularDishesSection />
        <WhyChooseUsSection />
        <QROrderingSection />
        <Footer />
      </main>
    </>
  )
}
