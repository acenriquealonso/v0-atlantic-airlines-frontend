"use client"

import { useState } from "react"
import { Search, Plane, Calendar, User, Ticket, Luggage } from "lucide-react"

type Billete = {
  _id: number
  vuelo: {
    _id: number
    ruta: string
    fecha_salida: string
  }
  cliente: {
    _id: number
    nombre: string
    apellidos: string
    dni: string
  }
  fecha_billete: string
  clase: string
  asiento: string
  equipaje_facturado: number
  precio: number
  estado: string
}

export default function CheckInPage() {
  const [searchType, setSearchType] = useState<"booking" | "dni">("dni")
  const [dni, setDni] = useState("")
  const [apellido, setApellido] = useState("")
  const [loading, setLoading] = useState(false)
  const [billetes, setBilletes] = useState<Billete[]>([])
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setBilletes([])

    try {
      const params = new URLSearchParams()
      if (dni) params.set("dni", dni.trim())
      if (apellido) params.set("apellido", apellido.trim())

      const res = await fetch(`/api/billetes?${params.toString()}`)
      const json = await res.json()

      if (json.ok) {
        setBilletes(json.data.billetes)
        if (json.data.billetes.length === 0) {
          setError("No se encontraron billetes con esos datos.")
        }
      } else {
        setError(json.error || "Error al buscar billetes")
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Check-in online</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Realiza el check-in desde 48 horas hasta 3 horas antes de tu vuelo y ahorra tiempo en el aeropuerto.
          </p>
        </div>
      </section>

      {/* Check-in Form + Results */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5]">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Tabs */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setSearchType("booking")}
                className={`flex-1 py-3 px-4 rounded font-medium transition-colors ${
                  searchType === "booking"
                    ? "bg-[#05164d] text-white"
                    : "bg-[#f5f5f5] text-[#333333] hover:bg-[#dcdcdc]"
                }`}
              >
                Código de reserva
              </button>
              <button
                onClick={() => setSearchType("dni")}
                className={`flex-1 py-3 px-4 rounded font-medium transition-colors ${
                  searchType === "dni"
                    ? "bg-[#05164d] text-white"
                    : "bg-[#f5f5f5] text-[#333333] hover:bg-[#dcdcdc]"
                }`}
              >
                Por DNI
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {searchType === "booking" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Nº de billete (ID)
                    </label>
                    <div className="relative">
                      <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                      <input
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        placeholder="Ej: 1, 2, 3..."
                        className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      DNI del pasajero
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                      <input
                        type="text"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        placeholder="Ej: 12345678A"
                        className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">
                      Apellido (opcional)
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
                      <input
                        type="text"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        placeholder="Para mayor precisión"
                        className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d]"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ffad00] text-[#05164d] py-4 rounded font-semibold hover:bg-[#ffbd32] transition-colors disabled:opacity-50"
              >
                {loading ? "Buscando..." : "Buscar mi reserva"}
              </button>
            </form>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Results */}
          {billetes.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-bold text-[#05164d]">
                {billetes.length} billete{billetes.length !== 1 ? "s" : ""} encontrado{billetes.length !== 1 ? "s" : ""}
              </h2>
              {billetes.map((b) => (
                <div key={b._id} className="bg-white rounded-lg shadow-sm p-6 border border-[#dcdcdc]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <p className="text-lg font-bold text-[#05164d]">
                        {b.cliente.nombre} {b.cliente.apellidos}
                      </p>
                      <p className="text-sm text-[#666666]">DNI: {b.cliente.dni}</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <Plane className="w-5 h-5 text-[#ffad00] mx-auto mb-1" />
                        <p className="font-semibold text-[#05164d]">{b.vuelo.ruta}</p>
                        <p className="text-[#666666] text-xs">{b.vuelo.fecha_salida}</p>
                      </div>
                      <div className="text-center">
                        <Calendar className="w-5 h-5 text-[#ffad00] mx-auto mb-1" />
                        <p className="font-semibold text-[#05164d]">{b.clase}</p>
                        <p className="text-[#666666] text-xs">Asiento {b.asiento}</p>
                      </div>
                      <div className="text-center">
                        <Luggage className="w-5 h-5 text-[#ffad00] mx-auto mb-1" />
                        <p className="font-semibold text-[#05164d]">{b.equipaje_facturado}kg</p>
                        <p className="text-[#666666] text-xs">{b.precio}€</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-[#05164d] mb-8 text-center">
            Ventajas del check-in online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#ffad00]" />
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Disponible 48h antes</h3>
              <p className="text-[#666666]">Realiza el check-in desde 48 horas hasta 3 horas antes del vuelo.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ffad00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Elige tu asiento</h3>
              <p className="text-[#666666]">Selecciona tu asiento preferido de forma gratuita durante el check-in.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#05164d] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ffad00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Tarjeta de embarque móvil</h3>
              <p className="text-[#666666]">Descarga tu tarjeta de embarque directamente en tu móvil.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
