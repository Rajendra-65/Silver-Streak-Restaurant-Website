"use client"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import PopularDishesSection from "@/components/popular-dishes-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import QROrderingSection from "@/components/qr-ordering-section"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { pushToDb } from "@/service/push-to-db/send-data"

export default function Home() {

  return (
    <>
      <main className="bg-background text-foreground">
        <Button
          variant="destructive"
          onClick = {() =>{pushToDb()}}
        >
          Push To Db
        </Button>
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
