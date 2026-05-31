"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plane, User, Mail, Phone, CreditCard, Luggage, ArrowRight } from "lucide-react"
import Link from "next/link"

type Vuelo = {
  _id: number
  aerolinea: { _id: number; nombre: string }
  ruta: {
    _id: number
    nombre: string
    origen: { ciudad: string; iata: string }
    destino: { ciudad: string; iata: string }
    duracion_estimada: number
  }
  avion: { _id: number; matricula: string; modelo: string; asientos_operativos: number }
  fecha_salida: string
  estado: string
}

const clases = [
  { id: "TURISTA", name: "Turista", price: 89.99, desc: "Económica", color: "#4c6e48" },
  { id: "PREMIUM", name: "Premium", price: 199.99, desc: "Más espacio", color: "#2c5744" },
  { id: "BUSINESS", name: "Business", price: 499.99, desc: "Asiento-cama", color: "#47616c" },
  { id: "PRIMERA", name: "Primera", price: 1299.99, desc: "Suite privada", color: "#a54a4a" },
]

export default function ReservarVueloPage() {
  const params = useParams()
  const router = useRouter()
  const vueloId = params.id as string

  const [vuelo, setVuelo] = useState<Vuelo | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Form fields
  const [nombre, setNombre] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [email, setEmail] = useState("")
  const [dni, setDni] = useState("")
  const [telefono, setTelefono] = useState("")
  const [clase, setClase] = useState("TURISTA")
  const [equipaje, setEquipaje] = useState("15")

  useEffect(() => {
    async function loadVuelo() {
      try {
        const res = await fetch(`/api/vuelos?limit=100`)
        const json = await res.json()
        if (json.ok) {
          const found = json.data.vuelos.find((v: Vuelo) => v._id === parseInt(vueloId))
          if (found) {
            setVuelo(found)
            setLoading(false)
            return
          }
        }
        setError("Vuelo no encontrado")
        setLoading(false)
      } catch {
        setError("Error al cargar el vuelo")
        setLoading(false)
      }
    }
    loadVuelo()
  }, [vueloId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/billetes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vuelo_id: vueloId,
          nombre,
          apellidos,
          email,
          dni,
          telefono,
          clase,
          equipaje,
        }),
      })

      const json = await res.json()

      if (json.ok) {
        router.push(`/confirmacion/${json.data.billete._id}`)
      } else {
        setError(json.error || "Error al crear la reserva")
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <p className="text-[#666666]">Cargando vuelo...</p>
      </main>
    )
  }

  if (!vuelo) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-[#666666] mb-4">{error || "Vuelo no disponible"}</p>
          <Link href="/vuelos" className="text-[#05164d] hover:underline">← Volver a vuelos</Link>
        </div>
      </main>
    )
  }

  const selectedClase = clases.find((c) => c.id === clase) || clases[0]

  return (
    <main className="min-h-screen">
      {/* Flight summary */}
      <section className="bg-[#05164d] text-white py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Link href="/vuelos" className="text-white/60 hover:text-white text-sm mb-4 inline-block">
            ← Volver a resultados
          </Link>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Reservar vuelo</h1>
          <div className="flex items-center gap-4 text-lg">
            <span className="font-bold">{vuelo.ruta.origen.iata}</span>
            <span className="text-white/60">
              {vuelo.ruta.origen.ciudad} → {vuelo.ruta.destino.ciudad}
            </span>
            <span className="font-bold">{vuelo.ruta.destino.iata}</span>
          </div>
          <p className="text-white/70 text-sm mt-1">
            {vuelo.aerolinea.nombre} · {vuelo.fecha_salida} · {vuelo.ruta.duracion_estimada}h · {vuelo.avion.modelo}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-8 lg:py-12 bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Passenger details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#05164d] mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#ffad00]" />
                  Datos del pasajero
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">Nombre *</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d]"
                      placeholder="Ej: Juan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">Apellidos *</label>
                    <input
                      type="text"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d]"
                      placeholder="Ej: García López"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">DNI *</label>
                    <input
                      type="text"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d]"
                      placeholder="Ej: 12345678A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d]"
                      placeholder="ejemplo@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-1">Teléfono</label>
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full px-3 py-2 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d]"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>
              </div>

              {/* Extras */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#05164d] mb-6 flex items-center gap-2">
                  <Luggage className="w-5 h-5 text-[#ffad00]" />
                  Equipaje
                </h2>
                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-1">
                    Equipaje facturado (kg)
                  </label>
                  <select
                    value={equipaje}
                    onChange={(e) => setEquipaje(e.target.value)}
                    className="w-full px-3 py-2 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] bg-white"
                  >
                    <option value="0">Solo equipaje de mano</option>
                    <option value="15">15 kg (+15€)</option>
                    <option value="23">23 kg (+25€)</option>
                    <option value="32">32 kg (+40€)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sidebar - class + price */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#05164d] mb-4 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-[#ffad00]" />
                  Clase
                </h2>
                <div className="space-y-3">
                  {clases.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setClase(c.id)}
                      className={`w-full text-left p-3 rounded border-2 transition-all ${
                        clase === c.id
                          ? "border-[#05164d] bg-[#05164d] text-white"
                          : "border-[#dcdcdc] hover:border-[#666]"
                      }`}
                    >
                      <p className="font-semibold">{c.name}</p>
                      <p className={`text-sm ${clase === c.id ? "text-white/70" : "text-[#666666]"}`}>
                        {c.desc}
                      </p>
                      <p className={`font-bold ${clase === c.id ? "text-[#ffad00]" : "text-[#05164d]"}`}>
                        {c.price}€
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold text-[#05164d] mb-4">Resumen</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Vuelo</span>
                    <span>{vuelo.ruta.nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Clase</span>
                    <span>{selectedClase.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666666]">Asiento</span>
                    <span>A confirmar</span>
                  </div>
                  <div className="border-t border-[#dcdcdc] pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-[#05164d]">{selectedClase.price}€</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 bg-[#ffad00] text-[#05164d] py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? "Procesando..." : "Confirmar reserva"}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {error && (
                  <p className="mt-3 text-red-600 text-sm">{error}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
