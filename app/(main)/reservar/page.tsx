import { FlightSearch } from "@/components/flight-search"

export default function ReservarPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#05164d] text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Reserva tu vuelo</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Encuentra las mejores tarifas para tu próximo viaje con Atlantic Airlines.
          </p>
        </div>
      </section>

      {/* Search Form */}
      <section className="bg-[#f5f5f5] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <FlightSearch />
        </div>
      </section>

      {/* Info cards */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-[#05164d] mb-8 text-center">
            ¿Por qué reservar con Atlantic Airlines?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#ffad00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ffad00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Mejor precio garantizado</h3>
              <p className="text-[#666666]">Si encuentras un precio mejor, te devolvemos la diferencia.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#ffad00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ffad00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Cambios flexibles</h3>
              <p className="text-[#666666]">Cambia tu vuelo sin penalización hasta 24h antes de la salida.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#ffad00]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#ffad00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#05164d] mb-2">Pago seguro</h3>
              <p className="text-[#666666]">Todas las transacciones están protegidas con encriptación SSL.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
