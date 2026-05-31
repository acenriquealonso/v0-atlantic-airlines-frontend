import { HeroSection } from "@/components/hero-section"
import { PopularDestinations } from "@/components/popular-destinations"
import { CabinClasses } from "@/components/cabin-classes"
import { WhyChooseUs } from "@/components/why-choose-us"
import { SpecialOffers } from "@/components/special-offers"
import { DatabaseStatus } from "@/components/database-status"

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      <DatabaseStatus />
      <HeroSection />
      <PopularDestinations />
      <CabinClasses />
      <WhyChooseUs />
      <SpecialOffers />
    </main>
  )
}
