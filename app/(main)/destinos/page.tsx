import { ArrowRight, MapPin, Plane, Building2 } from "lucide-react"
import Link from "next/link"
import { getMongoClient } from "@/lib/mongodb"

type Airport = {
  _id: number
  nombre: string
  codigo_iata: string
  codigo_icao: string
  ciudad: string
  pais: string
  capacidad: number
  tipoaeropuerto: string
}

async function getAirports(): Promise<Airport[]> {
  try {
    const client = await getMongoClient()
    const db = client.db("atlantic_airlines")
    const docs = await db
      .collection("aeropuertos")
      .find({})
      .sort({ ciudad: 1 })
      .toArray()
    return docs as unknown as Airport[]
  } catch (e) {
    console.error("Error fetching airports:", e)
    return []
  }
}

// Images for visual decoration — shuffled based on airport ID
const heroImages = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2050&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?q=80&w=2070&auto=format&fit=crop",
]

function getImage(id: number): string {
  return heroImages[id % heroImages.length]
}

function formatCapacidad(cap: number): string {
  if (cap >= 1_000_000) return `${(cap / 1_000_000).toFixed(1)}M`
  if (cap >= 1_000) return `${(cap / 1_000).toFixed(0)}K`
  return String(cap)
}

function getTypeBadge(type: string): { label: string; color: string } {
  switch (type) {
    case "INTERNACIONAL": return { label: "Internacional", color: "bg-[#05164d] text-white" }
    case "NACIONAL": return { label: "Nacional", color: "bg-[#4c6e48] text-white" }
    case "REGIONAL": return { label: "Regional", color: "bg-[#8b5a2b] text-white" }
    default: return { label: type, color: "bg-[#666666] text-white" }
  }
}

const regions = ["Todos", "Europa", "Norteamérica", "Asia", "Caribe", "Oriente Medio", "Oceanía", "Sudamérica"]

export default async function DestinosPage() {
  const airports = await getAirports()

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Nuestros destinos</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            {airports.length > 0
              ? `Explora más de ${airports.length} aeropuertos en todo el mundo con Atlantic Airlines.`
              : "Cargando destinos..."}
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
            {airports.map((apt) => {
              const badge = getTypeBadge(apt.tipoaeropuerto)
              return (
                <Link
                  key={apt._id}
                  href={`/vuelos?origen=${apt.codigo_iata}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={getImage(apt._id)}
                      alt={`${apt.ciudad}, ${apt.pais}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-[#ffad00] text-[#05164d] text-xs font-bold px-2 py-1 rounded">
                      {apt.codigo_iata}
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#05164d] mb-1">{apt.ciudad}</h3>
                    <p className="text-[#666666] text-sm mb-3">{apt.pais}</p>

                    <div className="flex items-center gap-4 text-xs text-[#666666] mb-4">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {apt.nombre}
                      </span>
                      <span className="flex items-center gap-1">
                        <Plane className="w-3 h-3" />
                        {apt.codigo_icao}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#dcdcdc]">
                      <div className="flex items-center gap-1 text-xs text-[#666666]">
                        <MapPin className="w-3 h-3" />
                        <span>Capacidad: {formatCapacidad(apt.capacidad)} pax/año</span>
                      </div>
                      <span className="text-[#ffad00] font-medium text-sm group-hover:underline flex items-center gap-1">
                        Ver vuelos
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {airports.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#666666] text-lg">No se pudieron cargar los destinos.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
