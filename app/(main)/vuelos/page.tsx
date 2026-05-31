import { Plane, Clock, Users, Calendar, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import { getMongoClient } from "@/lib/mongodb"
import { VuelosSearchForm } from "@/components/vuelos-search-form"

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
  fecha_llegada?: string
  estado: string
  tripulacion?: Array<{ empleado_id: number; nombre: string; puesto: string }>
  puerta_embarque?: string
}

async function searchVuelos(origen: string, destino: string, fecha: string): Promise<Vuelo[]> {
  try {
    const client = await getMongoClient()
    const db = client.db("atlantic_airlines")

    const filter: Record<string, unknown> = {}

    // Solo mostrar vuelos programados (reservables)
    filter.estado = "PROGRAMADO"

    if (origen) {
      const re = new RegExp(origen, "i")
      filter["ruta.origen.iata"] = re
    }
    if (destino) {
      const re = new RegExp(destino, "i")
      filter["ruta.destino.iata"] = re
    }
    if (fecha) {
      filter["fecha_salida"] = { $regex: `^${fecha}` }
    }

    const docs = await db
      .collection("vuelos")
      .find(filter)
      .sort({ fecha_salida: 1 })
      .limit(30)
      .toArray()

    return docs as unknown as Vuelo[]
  } catch {
    return []
  }
}

function formatFecha(fecha: string): string {
  try {
    const d = new Date(fecha.replace(" ", "T"))
    return d.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  } catch {
    return fecha
  }
}

function formatHora(fecha: string): string {
  try {
    const d = new Date(fecha.replace(" ", "T"))
    return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
  } catch {
    return ""
  }
}

function getEstadoColor(estado: string): string {
  switch (estado) {
    case "PROGRAMADO": return "bg-blue-100 text-blue-800"
    case "EN_VUELO": return "bg-green-100 text-green-800"
    case "COMPLETADO": return "bg-gray-100 text-gray-600"
    case "RETRASADO": return "bg-amber-100 text-amber-800"
    case "CANCELADO": return "bg-red-100 text-red-800"
    default: return "bg-gray-100 text-gray-600"
  }
}

export default async function VuelosPage({
  searchParams,
}: {
  searchParams: Promise<{ origen?: string; destino?: string; fecha?: string }>
}) {
  const params = await searchParams
  const origen = params.origen || ""
  const destino = params.destino || ""
  const fecha = params.fecha || ""

  const vuelos = await searchVuelos(origen, destino, fecha)

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Resultados de búsqueda</h1>
          <p className="text-white/80">
            {origen && destino
              ? `Vuelos de ${origen.toUpperCase()} a ${destino.toUpperCase()}`
              : origen
              ? `Vuelos desde ${origen.toUpperCase()}`
              : destino
              ? `Vuelos hacia ${destino.toUpperCase()}`
              : "Todos los vuelos disponibles"}
            {fecha && ` — ${formatFecha(fecha)}`}
          </p>
        </div>
      </section>

      {/* Quick search */}
      <section className="bg-white border-b border-[#dcdcdc] py-4">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <VuelosSearchForm initialOrigen={origen} initialDestino={destino} />
        </div>
      </section>

      {/* Results */}
      <section className="py-12 lg:py-16 bg-[#f5f5f5] min-h-[400px]">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          {vuelos.length === 0 ? (
            <div className="text-center py-16">
              <Plane className="w-16 h-16 text-[#dcdcdc] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#05164d] mb-2">No se encontraron vuelos</h2>
              <p className="text-[#666666] mb-6">
                Intenta con otros aeropuertos o fechas diferentes.
              </p>
              <Link
                href="/reservar"
                className="inline-flex items-center gap-2 bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors"
              >
                Nueva búsqueda
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[#666666] mb-4">
                {vuelos.length} vuelo{vuelos.length !== 1 ? "s" : ""} encontrado{vuelos.length !== 1 ? "s" : ""}
              </p>
              {vuelos.map((vuelo) => (
                <div
                  key={vuelo._id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Route info */}
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#05164d]">{vuelo.ruta.origen.iata}</p>
                        <p className="text-xs text-[#666666]">{vuelo.ruta.origen.ciudad}</p>
                        <p className="text-lg font-semibold text-[#05164d]">
                          {formatHora(vuelo.fecha_salida)}
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-[#666666]">
                          {vuelo.ruta.duracion_estimada}h
                        </span>
                        <div className="w-24 h-px bg-[#dcdcdc] relative">
                          <Plane className="absolute -top-2.5 right-0 w-4 h-4 text-[#ffad00]" />
                        </div>
                        <span className="text-[10px] text-[#999] uppercase">{vuelo.aerolinea.nombre}</span>
                      </div>

                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#05164d]">{vuelo.ruta.destino.iata}</p>
                        <p className="text-xs text-[#666666]">{vuelo.ruta.destino.ciudad}</p>
                        {vuelo.fecha_llegada && (
                          <p className="text-lg font-semibold text-[#05164d]">
                            {formatHora(vuelo.fecha_llegada)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#666666]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatFecha(vuelo.fecha_salida)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {vuelo.avion.modelo} ({vuelo.avion.asientos_operativos} asientos)
                      </span>
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${getEstadoColor(vuelo.estado)}`}>
                        {vuelo.estado.replace("_", " ")}
                      </span>
                      {vuelo.puerta_embarque && (
                        <span className="text-xs">Puerta: {vuelo.puerta_embarque}</span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/reservar/${vuelo._id}`}
                    className="mt-4 inline-flex items-center gap-2 bg-[#ffad00] text-[#05164d] px-5 py-2 rounded font-semibold hover:bg-[#ffbd32] transition-colors text-sm"
                  >
                    Reservar
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to search */}
      <section className="py-8 bg-white text-center">
        <Link
          href="/reservar"
          className="inline-flex items-center gap-2 text-[#05164d] font-medium hover:underline"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Volver a búsqueda
        </Link>
      </section>
    </main>
  )
}
