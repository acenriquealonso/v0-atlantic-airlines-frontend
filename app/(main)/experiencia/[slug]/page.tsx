import { notFound } from "next/navigation"
import { Check, ArrowRight, Plane, Wifi, Utensils, Armchair } from "lucide-react"
import Link from "next/link"

const cabinClasses: Record<string, {
  id: string
  name: string
  tagline: string
  description: string
  color: string
  image: string
  heroImage: string
  features: string[]
  amenities: { title: string; description: string }[]
  icon: typeof Plane
}> = {
  "economy": {
    id: "economy",
    name: "Economy",
    tagline: "Comodidad y valor para tu viaje",
    description: "Nuestra clase Economy ofrece todo lo que necesitas para un vuelo cómodo. Asientos ergonómicos diseñados para maximizar tu espacio personal, entretenimiento de última generación y servicio de comidas y bebidas incluido.",
    color: "#4c6e48",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Asiento ergonómico con 79cm de espacio",
      "Pantalla táctil personal de 10 pulgadas",
      "Más de 100 películas y series",
      "Comida y bebidas incluidas",
      "Puerto USB y enchufe personal",
      "Equipaje de mano incluido (10kg)"
    ],
    amenities: [
      { title: "Entretenimiento", description: "Sistema de entretenimiento con más de 100 películas, series, música y juegos" },
      { title: "Comida", description: "Menú de comida caliente con opción vegetariana y bebidas ilimitadas" },
      { title: "Conectividad", description: "Puerto USB y enchufe de corriente en cada asiento" },
      { title: "Equipaje", description: "1 equipaje de mano (10kg) y 1 artículo personal incluido" }
    ],
    icon: Plane
  },
  "premium-economy": {
    id: "premium-economy",
    name: "Premium Economy",
    tagline: "Más espacio y servicios premium",
    description: "Un paso más en comodidad. Disfruta de asientos más amplios con mayor reclinación, embarque prioritario y una selección mejorada de comidas y bebidas premium.",
    color: "#2c5744",
    image: "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=2074&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=2074&auto=format&fit=crop",
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
    amenities: [
      { title: "Asiento", description: "38% más espacio que Economy con reclinación mejorada y reposapiernas" },
      { title: "Comida", description: "Menú premium con selección de platos y carta de vinos" },
      { title: "Amenidades", description: "Kit de viaje con antifaz, calcetines y artículos de aseo" },
      { title: "Prioridad", description: "Embarque prioritario y equipaje con etiqueta prioritaria" }
    ],
    icon: Armchair
  },
  "business": {
    id: "business",
    name: "Business Class",
    tagline: "Productividad y confort excepcional",
    description: "Trabaja o descansa como en casa. Asientos que se convierten en cama completamente horizontal, acceso a nuestros exclusivos lounges y conexión Wi-Fi de alta velocidad durante todo el vuelo.",
    color: "#47616c",
    image: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?q=80&w=2070&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Asiento-cama totalmente horizontal (180°)",
      "Acceso a Atlantic Lounge",
      "Wi-Fi de alta velocidad gratuito",
      "Menú gourmet con carta de vinos",
      "Pantalla de 17 pulgadas",
      "Kit de pijama y amenidades de lujo",
      "Fast track en seguridad",
      "2 maletas de 32kg incluidas"
    ],
    amenities: [
      { title: "Asiento-cama", description: "Se convierte en cama horizontal de 1.98m con colchón y edredón" },
      { title: "Lounge", description: "Acceso a Atlantic Lounge con comida, bebidas y duchas" },
      { title: "Gastronomía", description: "Menú de 5 platos diseñado por chefs con estrellas Michelin" },
      { title: "Wi-Fi", description: "Conexión de alta velocidad gratuita durante todo el vuelo" }
    ],
    icon: Wifi
  },
  "first": {
    id: "first",
    name: "First Class",
    tagline: "La experiencia más exclusiva",
    description: "El máximo lujo en los cielos. Tu propia suite privada con puertas correderas, servicio personalizado de mayordomo, la mejor gastronomía y transfer en limusina desde y hacia el aeropuerto.",
    color: "#a54a4a",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop",
    features: [
      "Suite privada con puertas correderas",
      "Cama de 2 metros de longitud",
      "Mayordomo personal dedicado",
      "Menú a la carta con champagne y caviar",
      "Acceso a First Class Lounge y Spa",
      "Wi-Fi ilimitado de alta velocidad",
      "Pijama de diseñador y neceser de lujo",
      "Transfer en limusina incluido"
    ],
    amenities: [
      { title: "Suite privada", description: "Tu propio espacio con puertas correderas para máxima privacidad" },
      { title: "Mayordomo", description: "Servicio personalizado dedicado exclusivamente para ti" },
      { title: "Gastronomía", description: "Menú a la carta ilimitado con champagne Dom Pérignon y caviar" },
      { title: "Transfers", description: "Limusina privada desde tu casa al aeropuerto y viceversa" }
    ],
    icon: Utensils
  }
}

export function generateStaticParams() {
  return Object.keys(cabinClasses).map((slug) => ({ slug }))
}

export default async function CabinClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cabin = cabinClasses[slug]
  
  if (!cabin) {
    notFound()
  }
  
  const Icon = cabin.icon
  
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section 
        className="relative text-white py-24 lg:py-32"
        style={{ backgroundColor: cabin.color }}
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${cabin.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-white/20"
            >
              <Icon className="w-8 h-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{cabin.name}</h1>
            <p className="text-xl text-white/90">{cabin.tagline}</p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold text-[#05164d] mb-6">
                Una experiencia única
              </h2>
              <p className="text-[#666666] text-lg mb-8">
                {cabin.description}
              </p>
              <Link
                href={`/reservar?clase=${cabin.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: cabin.color }}
              >
                Reservar en {cabin.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src={cabin.image}
                alt={cabin.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-[#05164d] mb-10 text-center">
            Incluido en tu billete
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cabin.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-lg">
                <Check 
                  className="w-6 h-6 flex-shrink-0" 
                  style={{ color: cabin.color }} 
                />
                <span className="text-[#333333]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-[#05164d] mb-10 text-center">
            Servicios destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cabin.amenities.map((amenity, i) => (
              <div 
                key={i} 
                className="p-6 rounded-lg border-l-4"
                style={{ borderColor: cabin.color, backgroundColor: `${cabin.color}08` }}
              >
                <h3 className="text-xl font-bold text-[#05164d] mb-2">{amenity.title}</h3>
                <p className="text-[#666666]">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="py-12 lg:py-16 text-white text-center"
        style={{ backgroundColor: cabin.color }}
      >
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            ¿Listo para vivir la experiencia {cabin.name}?
          </h2>
          <p className="text-white/80 mb-8">
            Reserva ahora y disfruta de la mejor experiencia de vuelo.
          </p>
          <Link
            href={`/reservar?clase=${cabin.id}`}
            className="inline-flex items-center gap-2 bg-[#ffad00] text-[#05164d] px-8 py-4 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
          >
            Buscar vuelos en {cabin.name}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
