import { Plane, Wifi, Utensils, Armchair } from "lucide-react"
import Link from "next/link"

const cabinClasses = [
  {
    id: "economy",
    name: "Economy",
    color: "#4c6e48",
    description: "Comodidad y valor para tu viaje",
    features: ["Asiento ergonómico", "Entretenimiento personal", "Comida y bebidas incluidas"],
    icon: Plane
  },
  {
    id: "premium-economy",
    name: "Premium Economy",
    color: "#2c5744",
    description: "Más espacio y servicios premium",
    features: ["Mayor espacio para piernas", "Asientos reclinables mejorados", "Kit de amenidades", "Embarque prioritario"],
    icon: Armchair
  },
  {
    id: "business",
    name: "Business Class",
    color: "#47616c",
    description: "Productividad y confort excepcional",
    features: ["Asiento-cama 180°", "Acceso a lounge", "Wi-Fi de alta velocidad", "Menú gourmet"],
    icon: Wifi
  },
  {
    id: "first",
    name: "First Class",
    color: "#a54a4a",
    description: "La experiencia más exclusiva",
    features: ["Suite privada", "Servicio personalizado", "Champagne y caviar", "Transfer en limusina"],
    icon: Utensils
  }
]

export function CabinClasses() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#05164d] mb-4">
            Tu experiencia de vuelo
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Desde Economy hasta First Class, cada viaje con Atlantic Airlines 
            está diseñado para superar tus expectativas
          </p>
        </div>

        {/* Cabin classes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cabinClasses.map((cabin) => {
            const Icon = cabin.icon
            return (
              <div
                key={cabin.id}
                className="group relative bg-white border border-[#dcdcdc] rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Color bar */}
                <div 
                  className="h-2"
                  style={{ backgroundColor: cabin.color }}
                />
                
                {/* Content */}
                <div className="p-6">
                  {/* Icon */}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${cabin.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: cabin.color }} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#05164d] mb-2">
                    {cabin.name}
                  </h3>
                  <p className="text-[#666666] text-sm mb-4">
                    {cabin.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {cabin.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-[#333333]">
                        <div 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: cabin.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  {/* Link */}
                  <Link
                    href={`/experiencia/${cabin.id}`}
                    className="inline-block text-sm font-medium hover:underline"
                    style={{ color: cabin.color }}
                  >
                    Más información →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
