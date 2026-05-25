import { Star, Gift, Plane, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: "Blue",
    minMiles: 0,
    color: "#47616c",
    benefits: [
      "Acumula millas en cada vuelo",
      "Ofertas exclusivas para miembros",
      "Gestión online de tu cuenta"
    ]
  },
  {
    name: "Silver",
    minMiles: 25000,
    color: "#8b8b8b",
    benefits: [
      "Todo lo de Blue, más:",
      "Embarque prioritario",
      "1 maleta adicional gratis",
      "25% más millas en cada vuelo"
    ]
  },
  {
    name: "Gold",
    minMiles: 50000,
    color: "#ffad00",
    benefits: [
      "Todo lo de Silver, más:",
      "Acceso a Atlantic Lounge",
      "Fast track en seguridad",
      "50% más millas en cada vuelo",
      "Upgrade gratuito (sujeto a disponibilidad)"
    ]
  },
  {
    name: "Platinum",
    minMiles: 100000,
    color: "#05164d",
    benefits: [
      "Todo lo de Gold, más:",
      "Acceso a First Class Lounge",
      "Millas que nunca caducan",
      "100% más millas en cada vuelo",
      "Asiento garantizado en vuelos completos",
      "Línea de atención exclusiva 24/7"
    ]
  }
]

const partners = [
  { name: "Hoteles Atlantic", category: "Hoteles" },
  { name: "Rent a Car Plus", category: "Alquiler de coches" },
  { name: "Atlantic Card", category: "Tarjetas de crédito" },
  { name: "Shop & Fly", category: "Compras" }
]

export default function AtlanticPlusPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Star className="w-8 h-8 text-[#ffad00]" />
            <span className="text-[#ffad00] font-semibold">Programa de fidelidad</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Atlantic Plus</h1>
          <p className="text-xl text-white/80 max-w-2xl mb-8">
            Únete a nuestro programa de fidelidad y disfruta de beneficios exclusivos cada vez que vueles con nosotros.
          </p>
          <Link
            href="/atlantic-plus/registro"
            className="inline-flex items-center gap-2 bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
          >
            Únete gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-[#05164d] mb-10 text-center">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-6">
                <Plane className="w-10 h-10 text-[#ffad00]" />
              </div>
              <h3 className="text-xl font-bold text-[#05164d] mb-3">1. Vuela</h3>
              <p className="text-[#666666]">
                Acumula millas cada vez que vueles con Atlantic Airlines o nuestros partners.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-[#ffad00]" />
              </div>
              <h3 className="text-xl font-bold text-[#05164d] mb-3">2. Sube de nivel</h3>
              <p className="text-[#666666]">
                Cuantas más millas acumules, más beneficios exclusivos desbloquearás.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-10 h-10 text-[#ffad00]" />
              </div>
              <h3 className="text-xl font-bold text-[#05164d] mb-3">3. Canjea</h3>
              <p className="text-[#666666]">
                Usa tus millas para vuelos gratis, upgrades, hoteles y mucho más.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-[#05164d] mb-10 text-center">
            Niveles de membresía
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <div 
                  className="h-2"
                  style={{ backgroundColor: tier.color }}
                />
                <div className="p-6">
                  <h3 
                    className="text-2xl font-bold mb-2"
                    style={{ color: tier.color }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm text-[#666666] mb-4">
                    {tier.minMiles > 0 ? `Desde ${tier.minMiles.toLocaleString()} millas/año` : "Nivel inicial"}
                  </p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#333333]">
                        <div 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: tier.color }}
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-[#05164d] mb-4 text-center">
            Acumula millas con nuestros partners
          </h2>
          <p className="text-[#666666] text-center mb-10 max-w-2xl mx-auto">
            Gana millas no solo volando, sino también en hoteles, alquiler de coches y compras.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="bg-[#f5f5f5] rounded-lg p-6 text-center hover:bg-[#05164d] hover:text-white transition-colors group"
              >
                <CreditCard className="w-8 h-8 mx-auto mb-3 text-[#ffad00]" />
                <h4 className="font-bold text-[#05164d] group-hover:text-white">{partner.name}</h4>
                <p className="text-sm text-[#666666] group-hover:text-white/70">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-[#05164d] text-white text-center">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            ¿Aún no eres miembro?
          </h2>
          <p className="text-white/80 mb-8">
            Únete gratis a Atlantic Plus y empieza a acumular millas desde tu primer vuelo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/atlantic-plus/registro"
              className="inline-flex items-center justify-center gap-2 bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
            >
              Registrarse gratis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded font-semibold hover:bg-white/20 transition-colors"
            >
              Ya soy miembro
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
