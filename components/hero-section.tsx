import { FlightSearch } from "./flight-search"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] bg-[#05164d]">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#05164d]/70 via-[#05164d]/50 to-[#05164d]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 pt-12 lg:pt-20 pb-16">
        {/* Hero text */}
        <div className="text-white text-center mb-10 lg:mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 tracking-tight">
            Tu próxima aventura
            <span className="text-[#ffad00]"> comienza aquí</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
            Descubre más de 85 aeropuertos en todo el mundo con Atlantic Airlines. 
            Reserva hoy y vuela con la mejor experiencia.
          </p>
        </div>

        {/* Flight search form */}
        <FlightSearch />
      </div>
    </section>
  )
}
