import { Shield, Clock, Award, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Reserva segura",
    description: "Pago protegido y cancelación flexible en todas nuestras tarifas"
  },
  {
    icon: Clock,
    title: "Puntualidad garantizada",
    description: "95% de nuestros vuelos llegan a tiempo a su destino"
  },
  {
    icon: Award,
    title: "Atlantic Plus",
    description: "Acumula millas y disfruta de beneficios exclusivos"
  },
  {
    icon: Headphones,
    title: "Atención 24/7",
    description: "Nuestro equipo está disponible para ayudarte en cualquier momento"
  }
]

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-20 bg-[#05164d] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Por qué elegir <span className="text-[#ffad00]">Atlantic Airlines</span>?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Más de 50 años conectando personas y destinos con seguridad, 
            confort y el mejor servicio
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#ffad00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-[#05164d]" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t border-[#414e63]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-[#ffad00]">200+</p>
              <p className="text-white/70 mt-2">Destinos</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-[#ffad00]">50M</p>
              <p className="text-white/70 mt-2">Pasajeros al año</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-[#ffad00]">150</p>
              <p className="text-white/70 mt-2">Aviones en flota</p>
            </div>
            <div>
              <p className="text-4xl lg:text-5xl font-bold text-[#ffad00]">95%</p>
              <p className="text-white/70 mt-2">Puntualidad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
