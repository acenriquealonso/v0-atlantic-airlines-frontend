"use client"

import { useState } from "react"
import { Search, MapPin, Plane } from "lucide-react"
import { useRouter } from "next/navigation"

export function VuelosSearchForm({
  initialOrigen,
  initialDestino,
}: {
  initialOrigen?: string
  initialDestino?: string
}) {
  const router = useRouter()
  const [origen, setOrigen] = useState(initialOrigen || "")
  const [destino, setDestino] = useState(initialDestino || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (origen.trim()) params.set("origen", origen.trim().toUpperCase())
    if (destino.trim()) params.set("destino", destino.trim().toUpperCase())
    const qs = params.toString()
    router.push(qs ? `/vuelos?${qs}` : "/vuelos")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
        <input
          type="text"
          value={origen}
          onChange={(e) => setOrigen(e.target.value)}
          placeholder="Origen (IATA: MAD, BCN...)"
          className="w-full pl-9 pr-3 py-2 text-sm border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d]"
        />
      </div>
      <div className="relative flex-1">
        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
        <input
          type="text"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
          placeholder="Destino (IATA: BCN, MAD...)"
          className="w-full pl-9 pr-3 py-2 text-sm border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d]"
        />
      </div>
      <button
        type="submit"
        className="bg-[#ffad00] text-[#05164d] px-5 py-2 rounded font-semibold hover:bg-[#ffbd32] transition-colors flex items-center gap-2 justify-center"
      >
        <Search className="w-4 h-4" />
        Filtrar
      </button>
    </form>
  )
}
