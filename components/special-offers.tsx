import { ArrowRight } from "lucide-react"
import Link from "next/link"

const offers = [
  {
    id: 1,
    title: "Europa desde 199€",
    description: "Descubre las principales capitales europeas con tarifas especiales",
    validUntil: "30 Jun 2026",
    badge: "Oferta limitada",
    bgColor: "#05164d"
  },
  {
    id: 2,
    title: "Business Class -30%",
    description: "Vuela en Business Class con un 30% de descuento en rutas seleccionadas",
    validUntil: "15 Jul 2026",
    badge: "Premium",
    bgColor: "#47616c"
  },
  {
    id: 3,
    title: "Doble millas Atlantic Plus",
    description: "Acumula el doble de millas en todos tus vuelos durante este mes",
    validUntil: "31 May 2026",
    badge: "Solo miembros",
    bgColor: "#a54a4a"
  }
]

export function SpecialOffers() {
  return (
    <section className="py-16 lg:py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#05164d] mb-2">
              Ofertas especiales
            </h2>
            <p className="text-[#666666] text-lg">
              No te pierdas nuestras promociones exclusivas
            </p>
          </div>
          <Link 
            href="/ofertas"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-[#52627c] hover:text-[#05164d] font-medium transition-colors"
          >
            Ver todas las ofertas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Offers grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="group relative overflow-hidden rounded-lg text-white"
              style={{ backgroundColor: offer.bgColor }}
            >
              <div className="p-8">
                {/* Badge */}
                <span className="inline-block bg-[#ffad00] text-[#05164d] text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {offer.badge}
                </span>
                
                <h3 className="text-2xl font-bold mb-3">{offer.title}</h3>
                <p className="text-white/80 mb-6">{offer.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">
                    Válido hasta {offer.validUntil}
                  </span>
                  <Link
                    href={`/ofertas/${offer.id}`}
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded transition-colors"
                  >
                    Ver oferta
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full" />
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 bg-white rounded-lg p-8 lg:p-12 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#05164d] mb-2">
                Recibe ofertas exclusivas
              </h3>
              <p className="text-[#666666]">
                Suscríbete a nuestro newsletter y sé el primero en conocer nuestras promociones
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] text-[#05164d] w-full sm:w-72"
              />
              <button
                type="submit"
                className="bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
