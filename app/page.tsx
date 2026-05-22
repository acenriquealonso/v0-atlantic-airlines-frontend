import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PopularDestinations } from "@/components/popular-destinations"
import { CabinClasses } from "@/components/cabin-classes"
import { WhyChooseUs } from "@/components/why-choose-us"
import { SpecialOffers } from "@/components/special-offers"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PopularDestinations />
      <CabinClasses />
      <WhyChooseUs />
      <SpecialOffers />
      <Footer />
    </main>
  )
}
