import { ArrowRight } from "lucide-react"
import Link from "next/link"

const destinations = [
  {
    id: 1,
    city: "Nueva York",
    country: "Estados Unidos",
    airport: "JFK",
    price: 459,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    city: "París",
    country: "Francia",
    airport: "CDG",
    price: 329,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: 3,
    city: "Tokio",
    country: "Japón",
    airport: "NRT",
    price: 789,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop"
  },
  {
    id: 4,
    city: "Londres",
    country: "Reino Unido",
    airport: "LHR",
    price: 299,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    city: "Dubai",
    country: "Emiratos Árabes",
    airport: "DXB",
    price: 549,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    city: "Cancún",
    country: "México",
    airport: "CUN",
    price: 399,
    image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070&auto=format&fit=crop"
  }
]

export function PopularDestinations() {
  return (
    <section className="py-16 lg:py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#05164d] mb-2">
              Destinos populares
            </h2>
            <p className="text-[#666666] text-lg">
              Explora nuestros vuelos más solicitados
            </p>
          </div>
          <Link 
            href="/destinos"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#52627c] hover:text-[#05164d] font-medium transition-colors"
          >
            Ver todos los destinos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Destinations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinos/${dest.city.toLowerCase().replace(/\s+/g, '-')}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-[#05164d]"
            >
              {/* Image */}
              <img
                src={dest.image}
                alt={`${dest.city}, ${dest.country}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05164d]/90 via-[#05164d]/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[#ffad00] text-sm font-medium mb-1">{dest.airport}</p>
                    <h3 className="text-white text-2xl font-bold">{dest.city}</h3>
                    <p className="text-white/70">{dest.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/70 text-sm">desde</p>
                    <p className="text-white text-2xl font-bold">{dest.price}€</p>
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#ffad00] transition-colors rounded-lg" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
