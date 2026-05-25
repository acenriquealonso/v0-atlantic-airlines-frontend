import { Phone, Mail, MapPin, Clock, MessageCircle, HelpCircle, FileText, Plane } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    icon: Plane,
    title: "Reservas y billetes",
    questions: [
      "¿Cómo puedo cambiar mi reserva?",
      "¿Cuál es la política de cancelación?",
      "¿Cómo añado equipaje adicional?"
    ]
  },
  {
    icon: FileText,
    title: "Check-in y embarque",
    questions: [
      "¿Cuándo puedo hacer el check-in?",
      "¿Cómo obtengo mi tarjeta de embarque?",
      "¿Qué documentos necesito para viajar?"
    ]
  },
  {
    icon: HelpCircle,
    title: "Atlantic Plus",
    questions: [
      "¿Cómo acumulo millas?",
      "¿Cuándo caducan mis millas?",
      "¿Cómo canjeo mis millas?"
    ]
  }
]

export default function AyudaPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Centro de ayuda</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Encuentra respuestas a tus preguntas o ponte en contacto con nuestro equipo de atención al cliente.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b border-[#dcdcdc]">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Busca en nuestras preguntas frecuentes..."
              className="w-full px-6 py-4 pr-12 border border-[#dcdcdc] rounded-lg focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] text-lg"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#ffad00] text-[#05164d] px-4 py-2 rounded font-medium hover:bg-[#ffbd32] transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-[#05164d] mb-8">Preguntas frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqCategories.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.title} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#05164d] rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#ffad00]" />
                    </div>
                    <h3 className="font-bold text-[#05164d]">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.questions.map((question) => (
                      <li key={question}>
                        <Link 
                          href="#" 
                          className="text-[#666666] hover:text-[#05164d] hover:underline text-sm"
                        >
                          {question}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="#" 
                    className="inline-block mt-4 text-[#ffad00] font-medium text-sm hover:underline"
                  >
                    Ver todas →
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-[#05164d] mb-8 text-center">
            ¿Necesitas más ayuda?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-[#dcdcdc] rounded-lg hover:border-[#ffad00] transition-colors">
              <div className="w-16 h-16 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[#ffad00]" />
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Llámanos</h3>
              <p className="text-[#666666] mb-4">Atención telefónica 24/7</p>
              <a href="tel:+34900123456" className="text-xl font-bold text-[#05164d]">
                +34 900 123 456
              </a>
            </div>
            <div className="text-center p-6 border border-[#dcdcdc] rounded-lg hover:border-[#ffad00] transition-colors">
              <div className="w-16 h-16 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-[#ffad00]" />
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Chat en vivo</h3>
              <p className="text-[#666666] mb-4">Habla con un agente ahora</p>
              <button className="bg-[#ffad00] text-[#05164d] px-6 py-2 rounded font-semibold hover:bg-[#ffbd32] transition-colors">
                Iniciar chat
              </button>
            </div>
            <div className="text-center p-6 border border-[#dcdcdc] rounded-lg hover:border-[#ffad00] transition-colors">
              <div className="w-16 h-16 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#ffad00]" />
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Email</h3>
              <p className="text-[#666666] mb-4">Te respondemos en 24h</p>
              <a href="mailto:ayuda@atlanticairlines.com" className="text-[#05164d] font-medium hover:underline">
                ayuda@atlanticairlines.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Office info */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-lg p-8 flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#05164d] mb-4">Oficinas centrales</h3>
              <div className="space-y-3 text-[#666666]">
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#ffad00]" />
                  Aeropuerto Madrid-Barajas, Terminal 4, 28042 Madrid
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#ffad00]" />
                  Lunes a Viernes: 09:00 - 20:00
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#ffad00]" />
                  +34 900 123 456
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3">
              <div className="bg-[#f5f5f5] rounded-lg h-48 flex items-center justify-center">
                <span className="text-[#666666]">Mapa de ubicación</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
