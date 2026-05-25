import { ArrowRight, Clock, Tag, Plane } from "lucide-react"
import Link from "next/link"

const allOffers = [
  {
    id: 1,
    title: "Europa desde 199€",
    description: "Descubre las principales capitales europeas con tarifas especiales. Incluye equipaje de mano y selección de asiento.",
    validUntil: "30 Jun 2026",
    badge: "Oferta limitada",
    bgColor: "#05164d",
    destinations: ["París", "Roma", "Ámsterdam", "Berlín"],
    originalPrice: 299,
    discountedPrice: 199
  },
  {
    id: 2,
    title: "Business Class -30%",
    description: "Vuela en Business Class con un 30% de descuento en rutas seleccionadas. Disfruta de asientos-cama, acceso a lounge y menú gourmet.",
    validUntil: "15 Jul 2026",
    badge: "Premium",
    bgColor: "#47616c",
    destinations: ["Nueva York", "Miami", "Los Ángeles"],
    originalPrice: 2500,
    discountedPrice: 1750
  },
  {
    id: 3,
    title: "Doble millas Atlantic Plus",
    description: "Acumula el doble de millas en todos tus vuelos durante este mes. Válido para todos los miembros del programa.",
    validUntil: "31 May 2026",
    badge: "Solo miembros",
    bgColor: "#a54a4a",
    destinations: ["Todos los destinos"],
    originalPrice: null,
    discountedPrice: null
  },
  {
    id: 4,
    title: "Escapada a Tokio",
    description: "Vuelo + 3 noches de hotel en el centro de Tokio. Incluye traslados desde el aeropuerto.",
    validUntil: "30 Sep 2026",
    badge: "Paquete",
    bgColor: "#4c6e48",
    destinations: ["Tokio"],
    originalPrice: 1299,
    discountedPrice: 999
  },
  {
    id: 5,
    title: "Familia feliz",
    description: "Los niños menores de 12 años vuelan con un 50% de descuento en todas nuestras rutas europeas.",
    validUntil: "31 Ago 2026",
    badge: "Familias",
    bgColor: "#2c5744",
    destinations: ["Europa"],
    originalPrice: null,
    discountedPrice: null
  },
  {
    id: 6,
    title: "Cyber Monday",
    description: "Solo por 24 horas: 25% de descuento en todos los vuelos de larga distancia.",
    validUntil: "25 Nov 2026",
    badge: "Flash",
    bgColor: "#8b5a2b",
    destinations: ["Larga distancia"],
    originalPrice: null,
    discountedPrice: null
  }
]

export default function OfertasPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Ofertas especiales</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Descubre nuestras mejores promociones y vuela más por menos. Ofertas exclusivas actualizadas semanalmente.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {allOffers.map((offer) => (
              <div
                key={offer.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                {/* Color header */}
                <div 
                  className="p-6 text-white"
                  style={{ backgroundColor: offer.bgColor }}
                >
                  <span className="inline-block bg-[#ffad00] text-[#05164d] text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {offer.badge}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Válido hasta {offer.validUntil}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-[#666666] mb-4">{offer.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Plane className="w-4 h-4 text-[#ffad00]" />
                    <span className="text-sm text-[#333333]">
                      Destinos: {offer.destinations.join(", ")}
                    </span>
                  </div>
                  
                  {offer.originalPrice && (
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#666666] line-through">{offer.originalPrice}€</span>
                      <span className="text-2xl font-bold text-[#05164d]">{offer.discountedPrice}€</span>
                      <span className="bg-[#4c6e48] text-white text-xs px-2 py-1 rounded">
                        -{Math.round((1 - offer.discountedPrice / offer.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                  
                  <Link
                    href={`/ofertas/${offer.id}`}
                    className="inline-flex items-center gap-2 bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
                  >
                    Ver oferta
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <Tag className="w-12 h-12 text-[#ffad00] mx-auto mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold text-[#05164d] mb-4">
            No te pierdas ninguna oferta
          </h2>
          <p className="text-[#666666] mb-6">
            Suscríbete a nuestro newsletter y recibe las mejores ofertas directamente en tu correo.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
            />
            <button
              type="submit"
              className="bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
