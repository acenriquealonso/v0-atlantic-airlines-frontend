"use client"

import { Phone, Mail, MapPin, Send } from "lucide-react"

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros y te responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Form */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-[#05164d] mb-6">Envíanos un mensaje</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#333333] mb-2">
                        Apellidos
                      </label>
                      <input
                        type="text"
                        placeholder="Tus apellidos"
                        className="w-full px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Asunto
                    </label>
                    <select className="w-full px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] bg-white">
                      <option value="">Selecciona un asunto</option>
                      <option value="reservas">Reservas y billetes</option>
                      <option value="equipaje">Equipaje</option>
                      <option value="atlantic-plus">Atlantic Plus</option>
                      <option value="reclamaciones">Reclamaciones</option>
                      <option value="sugerencias">Sugerencias</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Código de reserva (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: ABC123"
                      className="w-full px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] uppercase"
                      maxLength={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Mensaje
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Escribe tu mensaje aquí..."
                      className="w-full px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#ffad00] text-[#05164d] py-4 rounded font-semibold hover:bg-[#ffbd32] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:w-96">
              <div className="bg-[#05164d] rounded-lg text-white p-8 mb-6">
                <h3 className="text-xl font-bold mb-6">Información de contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#ffad00] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#05164d]" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Teléfono</p>
                      <p className="text-white/80">+34 900 123 456</p>
                      <p className="text-white/60 text-sm">Disponible 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#ffad00] rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#05164d]" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <p className="text-white/80">info@atlanticairlines.com</p>
                      <p className="text-white/60 text-sm">Respuesta en 24h</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#ffad00] rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#05164d]" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Oficinas centrales</p>
                      <p className="text-white/80">Aeropuerto Madrid-Barajas</p>
                      <p className="text-white/80">Terminal 4, 28042 Madrid</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-bold text-[#05164d] mb-3">Horario de atención</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Lunes - Viernes</span>
                    <span className="text-[#333333] font-medium">09:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Sábados</span>
                    <span className="text-[#333333] font-medium">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Domingos</span>
                    <span className="text-[#333333] font-medium">Cerrado</span>
                  </div>
                </div>
                <p className="text-xs text-[#666666] mt-4">
                  * Atención telefónica disponible 24/7 para emergencias
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
