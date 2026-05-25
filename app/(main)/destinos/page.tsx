import { ArrowRight, MapPin, Calendar, Plane } from "lucide-react"
import Link from "next/link"

const allDestinations = [
  {
    id: 1,
    city: "Nueva York",
    country: "Estados Unidos",
    airport: "JFK",
    price: 459,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    region: "Norteamérica",
    flightTime: "8h 30m"
  },
  {
    id: 2,
    city: "París",
    country: "Francia",
    airport: "CDG",
    price: 329,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    region: "Europa",
    flightTime: "2h 15m"
  },
  {
    id: 3,
    city: "Tokio",
    country: "Japón",
    airport: "NRT",
    price: 789,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop",
    region: "Asia",
    flightTime: "14h 00m"
  },
  {
    id: 4,
    city: "Londres",
    country: "Reino Unido",
    airport: "LHR",
    price: 299,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
    region: "Europa",
    flightTime: "2h 30m"
  },
  {
    id: 5,
    city: "Dubai",
    country: "Emiratos Árabes",
    airport: "DXB",
    price: 549,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    region: "Oriente Medio",
    flightTime: "6h 45m"
  },
  {
    id: 6,
    city: "Cancún",
    country: "México",
    airport: "CUN",
    price: 399,
    image: "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070&auto=format&fit=crop",
    region: "Caribe",
    flightTime: "10h 30m"
  },
  {
    id: 7,
    city: "Roma",
    country: "Italia",
    airport: "FCO",
    price: 279,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
    region: "Europa",
    flightTime: "2h 30m"
  },
  {
    id: 8,
    city: "Bangkok",
    country: "Tailandia",
    airport: "BKK",
    price: 689,
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2050&auto=format&fit=crop",
    region: "Asia",
    flightTime: "12h 15m"
  },
  {
    id: 9,
    city: "Sydney",
    country: "Australia",
    airport: "SYD",
    price: 1199,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
    region: "Oceanía",
    flightTime: "22h 00m"
  },
  {
    id: 10,
    city: "Miami",
    country: "Estados Unidos",
    airport: "MIA",
    price: 489,
    image: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?q=80&w=2070&auto=format&fit=crop",
    region: "Norteamérica",
    flightTime: "9h 45m"
  },
  {
    id: 11,
    city: "Ámsterdam",
    country: "Países Bajos",
    airport: "AMS",
    price: 259,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=2070&auto=format&fit=crop",
    region: "Europa",
    flightTime: "2h 45m"
  },
  {
    id: 12,
    city: "São Paulo",
    country: "Brasil",
    airport: "GRU",
    price: 699,
    image: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?q=80&w=2074&auto=format&fit=crop",
    region: "Sudamérica",
    flightTime: "11h 30m"
  }
]

const regions = ["Todos", "Europa", "Norteamérica", "Asia", "Caribe", "Oriente Medio", "Oceanía", "Sudamérica"]

export default function DestinosPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Nuestros destinos</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Explora más de 150 destinos en todo el mundo. Encuentra tu próxima aventura con Atlantic Airlines.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-[#dcdcdc] sticky top-[104px] z-40">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {regions.map((region) => (
              <button
                key={region}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  region === "Todos"
                    ? "bg-[#05164d] text-white"
                    : "bg-[#f5f5f5] text-[#333333] hover:bg-[#dcdcdc]"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allDestinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinos/${dest.city.toLowerCase().replace(/\s+/g, '-')}`}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={`${dest.city}, ${dest.country}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-[#ffad00] text-[#05164d] text-xs font-bold px-2 py-1 rounded">
                    {dest.airport}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#05164d] mb-1">{dest.city}</h3>
                  <p className="text-[#666666] text-sm mb-3">{dest.country}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-[#666666] mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {dest.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <Plane className="w-3 h-3" />
                      {dest.flightTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#666666]">desde</span>
                      <span className="text-xl font-bold text-[#05164d] ml-1">{dest.price}€</span>
                    </div>
                    <span className="text-[#ffad00] font-medium text-sm group-hover:underline flex items-center gap-1">
                      Ver vuelos
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
