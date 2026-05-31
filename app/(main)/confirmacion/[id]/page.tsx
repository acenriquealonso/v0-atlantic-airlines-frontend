import Link from "next/link"
import { getMongoClientSafe } from "@/lib/mongodb"
import { Check, Plane, Calendar, User, Luggage, CreditCard } from "lucide-react"

type Billete = {
  _id: number
  vuelo: {
    _id: number
    ruta: string
    fecha_salida: string
  }
  cliente: {
    nombre: string
    apellidos: string
    dni: string
    email: string
  }
  fecha_billete: string
  clase: string
  asiento: string
  equipaje_facturado: number
  precio: number
  estado: string
}

async function getBillete(id: string): Promise<Billete | null> {
  try {
    const client = await getMongoClientSafe()
    if (!client) return null
    const db = client.db("atlantic_airlines")
    const doc = await db.collection("billetes").findOne({ _id: parseInt(id) })
    return doc as unknown as Billete | null
  } catch {
    return null
  }
}

function getClaseColor(clase: string): string {
  switch(clase) {
    case "TURISTA": return "#4c6e48"
    case "PREMIUM": return "#2c5744"
    case "BUSINESS": return "#47616c"
    case "PRIMERA": return "#a54a4a"
    default: return "#05164d"
  }
}

export default async function ConfirmacionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const billete = await getBillete(id)

  if (!billete) {
    return (
      <main className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#05164d] mb-2">Reserva no encontrada</p>
          <p className="text-[#666666] mb-6">El código de reserva no es válido.</p>
          <Link href="/vuelos" className="text-[#ffad00] font-medium hover:underline">
            Buscar vuelos →
          </Link>
        </div>
      </main>
    )
  }

  const claseColor = getClaseColor(billete.clase)

  return (
    <main className="min-h-screen">
      {/* Success banner */}
      <section className="bg-green-600 text-white py-8">
        <div className="max-w-3xl mx-auto px-4 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">¡Reserva confirmada!</h1>
          <p className="text-white/80 text-lg">
            Tu billete electrónico ha sido emitido correctamente.
          </p>
        </div>
      </section>

      {/* Ticket details */}
      <section className="py-8 lg:py-12 bg-[#f5f5f5]">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          {/* Ticket card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Color header */}
            <div className="h-2" style={{ backgroundColor: claseColor }} />

            <div className="p-6 lg:p-8">
              {/* Top: booking ref */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-xs text-[#666666] uppercase tracking-wide">Código de reserva</p>
                  <p className="text-2xl font-bold text-[#05164d] font-mono tracking-wider">
                    AA-{String(billete._id).padStart(5, "0")}
                  </p>
                </div>
                <div className={`px-4 py-1 rounded text-white text-sm font-semibold`}
                     style={{ backgroundColor: claseColor }}>
                  {billete.clase}
                </div>
              </div>

              {/* Flight route */}
              <div className="bg-[#f5f5f5] rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#05164d]">
                      {billete.vuelo.ruta.split("-")[0]}
                    </p>
                    <p className="text-xs text-[#666666] mt-1">Origen</p>
                  </div>
                  <div className="flex-1 mx-6">
                    <div className="flex items-center gap-2 justify-center">
                      <Plane className="w-5 h-5 text-[#ffad00]" />
                      <span className="text-sm text-[#666666]">{billete.vuelo.ruta}</span>
                    </div>
                    <div className="border-t border-dashed border-[#dcdcdc] my-2" />
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#05164d]">
                      {billete.vuelo.ruta.split("-")[1]}
                    </p>
                    <p className="text-xs text-[#666666] mt-1">Destino</p>
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div>
                  <Calendar className="w-4 h-4 text-[#ffad00] mb-1" />
                  <p className="text-xs text-[#666666]">Fecha</p>
                  <p className="font-semibold text-[#05164d] text-sm">{billete.vuelo.fecha_salida}</p>
                </div>
                <div>
                  <User className="w-4 h-4 text-[#ffad00] mb-1" />
                  <p className="text-xs text-[#666666]">Pasajero</p>
                  <p className="font-semibold text-[#05164d] text-sm">
                    {billete.cliente.nombre} {billete.cliente.apellidos}
                  </p>
                </div>
                <div>
                  <Plane className="w-4 h-4 text-[#ffad00] mb-1" />
                  <p className="text-xs text-[#666666]">Asiento</p>
                  <p className="font-semibold text-[#05164d] text-sm">{billete.asiento}</p>
                </div>
                <div>
                  <Luggage className="w-4 h-4 text-[#ffad00] mb-1" />
                  <p className="text-xs text-[#666666]">Equipaje</p>
                  <p className="font-semibold text-[#05164d] text-sm">{billete.equipaje_facturado} kg</p>
                </div>
              </div>

              {/* Price and status */}
              <div className="border-t border-[#dcdcdc] pt-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                    {billete.estado}
                  </span>
                  <span className="text-[#666666] text-sm">Emitido el {billete.fecha_billete}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#666666]">Total pagado</p>
                  <p className="text-xl font-bold text-[#05164d]">{billete.precio}€</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/check-in"
              className="bg-[#05164d] text-white px-6 py-3 rounded font-semibold hover:bg-[#0a1a3a] transition-colors text-center"
            >
              Ir a check-in
            </Link>
            <Link
              href="/vuelos"
              className="bg-[#ffad00] text-[#05164d] px-6 py-3 rounded font-semibold hover:bg-[#ffbd32] transition-colors text-center"
            >
              Buscar otro vuelo
            </Link>
          </div>

          {/* Check billete in DB */}
          <p className="text-center mt-6 text-xs text-[#666666]">
            Datos almacenados en MongoDB Atlas · ID interno: {billete._id}
          </p>
        </div>
      </section>
    </main>
  )
}
