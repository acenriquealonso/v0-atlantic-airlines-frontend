"use client"

import { useState } from "react"
import { 
  Plane, 
  Calendar, 
  Users, 
  ArrowRightLeft, 
  Search,
  MapPin
} from "lucide-react"

type TripType = "roundtrip" | "oneway" | "multicity"

export function FlightSearch() {
  const [tripType, setTripType] = useState<TripType>("roundtrip")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [departDate, setDepartDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState("economy")

  const handleSwapCities = () => {
    const temp = origin
    setOrigin(destination)
    setDestination(temp)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (origin) params.set("origen", origin.toUpperCase().trim())
    if (destination) params.set("destino", destination.toUpperCase().trim())
    if (departDate) params.set("fecha", departDate)
    
    window.location.href = `/vuelos?${params.toString()}`
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8">
      {/* Trip type tabs */}
      <div className="flex flex-wrap gap-4 mb-6 border-b border-[#dcdcdc] pb-4">
        <button
          type="button"
          onClick={() => setTripType("roundtrip")}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            tripType === "roundtrip" 
              ? "bg-[#05164d] text-white" 
              : "text-[#05164d] hover:bg-[#f5f5f5]"
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          Ida y vuelta
        </button>
        <button
          type="button"
          onClick={() => setTripType("oneway")}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            tripType === "oneway" 
              ? "bg-[#05164d] text-white" 
              : "text-[#05164d] hover:bg-[#f5f5f5]"
          }`}
        >
          <Plane className="w-4 h-4" />
          Solo ida
        </button>
        <button
          type="button"
          onClick={() => setTripType("multicity")}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            tripType === "multicity" 
              ? "bg-[#05164d] text-white" 
              : "text-[#05164d] hover:bg-[#f5f5f5]"
          }`}
        >
          <MapPin className="w-4 h-4" />
          Multidestino
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Origin */}
          <div className="relative">
            <label className="block text-sm text-[#666666] mb-1">Origen</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Ciudad o aeropuerto"
                className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] text-[#05164d]"
              />
            </div>
          </div>

          {/* Swap button (mobile hidden, desktop visible) */}
          <button
            type="button"
            onClick={handleSwapCities}
            className="hidden md:flex absolute left-[calc(25%-12px)] top-[calc(50%+20px)] z-10 w-6 h-6 bg-white border border-[#dcdcdc] rounded-full items-center justify-center hover:bg-[#f5f5f5] transition-colors lg:left-[calc(25%-12px)]"
            style={{ display: 'none' }}
          >
            <ArrowRightLeft className="w-3 h-3 text-[#05164d]" />
          </button>

          {/* Destination */}
          <div className="relative">
            <label className="block text-sm text-[#666666] mb-1">Destino</label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Ciudad o aeropuerto"
                className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] text-[#05164d]"
              />
            </div>
          </div>

          {/* Departure date */}
          <div>
            <label className="block text-sm text-[#666666] mb-1">Fecha de ida</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] text-[#05164d]"
              />
            </div>
          </div>

          {/* Return date */}
          {tripType === "roundtrip" && (
            <div>
              <label className="block text-sm text-[#666666] mb-1">Fecha de vuelta</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] text-[#05164d]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Second row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Passengers */}
          <div>
            <label className="block text-sm text-[#666666] mb-1">Pasajeros</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] text-[#05164d] appearance-none bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "pasajero" : "pasajeros"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cabin class */}
          <div>
            <label className="block text-sm text-[#666666] mb-1">Clase</label>
            <select
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="w-full px-4 py-3 border border-[#dcdcdc] rounded focus:outline-none focus:border-[#05164d] focus:ring-1 focus:ring-[#05164d] text-[#05164d] appearance-none bg-white"
            >
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>

          {/* Search button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#ffad00] text-[#05164d] py-3 px-6 rounded font-semibold hover:bg-[#ffbd32] transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Buscar vuelos
            </button>
          </div>
        </div>
      </form>

      {/* Quick links */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-[#ebebeb] text-sm">
        <span className="text-[#666666]">Acceso rápido:</span>
        <a href="#" className="text-[#52627c] hover:text-[#05164d] hover:underline">
          Estado del vuelo
        </a>
        <a href="#" className="text-[#52627c] hover:text-[#05164d] hover:underline">
          Mis reservas
        </a>
        <a href="#" className="text-[#52627c] hover:text-[#05164d] hover:underline">
          Horarios
        </a>
      </div>
    </div>
  )
}
