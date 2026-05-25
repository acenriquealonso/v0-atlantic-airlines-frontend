import { Plane, Wifi, Utensils, Armchair, Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const cabinClasses = [
  {
    id: "economy",
    name: "Economy",
    tagline: "Comodidad y valor para tu viaje",
    description: "Nuestra clase Economy ofrece todo lo que necesitas para un vuelo cómodo. Asientos ergonómicos diseñados para maximizar tu espacio personal, entretenimiento de última generación y servicio de comidas y bebidas incluido.",
    color: "#4c6e48",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    features: [
      "Asiento ergonómico con 79cm de espacio",
      "Pantalla táctil personal de 10 pulgadas",
      "Más de 100 películas y series",
      "Comida y bebidas incluidas",
      "Puerto USB y enchufe personal",
      "Equipaje de mano incluido (10kg)"
    ],
    icon: Plane
  },
  {
    id: "premium-economy",
    name: "Premium Economy",
    tagline: "Más espacio y servicios premium",
    description: "Un paso más en comodidad. Disfruta de asientos más amplios con mayor reclinación, embarque prioritario y una selección mejorada de comidas y bebidas premium.",
    color: "#2c5744",
    image: "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=2074&auto=format&fit=crop",
    features: [
      "Asiento extra ancho con 97cm de espacio",
      "Reclinación mejorada hasta 40°",
      "Pantalla táctil de 13 pulgadas",
      "Kit de amenidades incluido",
      "Embarque prioritario",
      "Equipaje facturado 23kg incluido",
      "Selección de menú premium",
      "Auriculares con cancelación de ruido"
    ],
    icon: Armchair
  },
  {
    id: "business",
    name: "Business Class",
    tagline: "Productividad y confort excepcional",
    description: "Trabaja o descansa como en casa. Asientos que se convierten en cama completamente horizontal, acceso a nuestros exclusivos lounges y conexión Wi-Fi de alta velocidad durante todo el vuelo.",
    color: "#47616c",
    image: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Asiento-cama totalmente horizontal (180°)",
      "Acceso a Atlantic Lounge",
      "Wi-Fi de alta velocidad gratuito",
      "Menú gourmet con carta de vinos",
      "Pantalla de 17 pulgadas",
      "Kit de pijama y amenidades de lujo",
      "Fast track en seguridad",
      "2 maletas de 32kg incluidas",
      "Servicio de limusina (rutas seleccionadas)"
    ],
    icon: Wifi
  },
  {
    id: "first",
    name: "First Class",
    tagline: "La experiencia más exclusiva",
    description: "El máximo lujo en los cielos. Tu propia suite privada con puertas correderas, servicio personalizado de mayordomo, la mejor gastronomía y transfer en limusina desde y hacia el aeropuerto.",
    color: "#a54a4a",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop",
    features: [
      "Suite privada con puertas correderas",
      "Cama de 2 metros de longitud",
      "Mayordomo personal dedicado",
      "Menú a la carta con champagne y caviar",
      "Acceso a First Class Lounge y Spa",
      "Wi-Fi ilimitado de alta velocidad",
      "Pijama de diseñador y neceser de lujo",
      "Transfer en limusina incluido",
      "Facturación privada en el aeropuerto",
      "3 maletas de 32kg incluidas"
    ],
    icon: Utensils
  }
]

export default function ExperienciaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Tu experiencia de vuelo</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Desde Economy hasta First Class, cada viaje con Atlantic Airlines está diseñado para superar tus expectativas.
          </p>
        </div>
      </section>

      {/* Cabin Classes */}
      <section className="py-12 lg:py-16">
        {cabinClasses.map((cabin, index) => {
          const Icon = cabin.icon
          const isReversed = index % 2 === 1
          
          return (
            <div 
              key={cabin.id}
              id={cabin.id}
              className={`py-12 lg:py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-[#f5f5f5]'}`}
            >
              <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={cabin.image}
                        alt={cabin.name}
                        className="w-full h-full object-cover"
                      />
                      <div 
                        className="absolute top-4 left-4 px-4 py-2 rounded text-white font-bold"
                        style={{ backgroundColor: cabin.color }}
                      >
                        {cabin.name}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${cabin.color}20` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: cabin.color }} />
                    </div>
                    
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#05164d] mb-2">
                      {cabin.name}
                    </h2>
                    <p className="text-lg mb-4" style={{ color: cabin.color }}>
                      {cabin.tagline}
                    </p>
                    <p className="text-[#666666] mb-6">
                      {cabin.description}
                    </p>
                    
                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {cabin.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check 
                            className="w-5 h-5 mt-0.5 flex-shrink-0" 
                            style={{ color: cabin.color }} 
                          />
                          <span className="text-[#333333]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      href={`/reservar?clase=${cabin.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: cabin.color }}
                    >
                      Reservar en {cabin.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Compare */}
      <section className="py-12 lg:py-16 bg-[#05164d] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            ¿No sabes qué clase elegir?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Compara todas nuestras clases y encuentra la que mejor se adapta a tus necesidades.
          </p>
          <Link
            href="/experiencia/comparar"
            className="inline-flex items-center gap-2 bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
          >
            Comparar clases
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
