import { getMongoClientSafe } from "@/lib/mongodb";
import Link from "next/link";

async function getStats() {
  try {
    const client = await getMongoClientSafe();
    if (!client) return { ok: false };
    const db = client.db("atlantic_airlines");
    const [aeropuertos, vuelos, billetes, clientes] = await Promise.all([
      db.collection("aeropuertos").countDocuments(),
      db.collection("vuelos").countDocuments(),
      db.collection("billetes").countDocuments(),
      db.collection("clientes").countDocuments(),
    ]);
    return { aeropuertos, vuelos, billetes, clientes, ok: true };
  } catch {
    return { ok: false };
  }
}

export async function DatabaseStatus() {
  const stats = await getStats();

  if (!stats.ok) return null;

  return (
    <div className="bg-[#0a1a3a] border-b border-[#ffad00]/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
            <span className="text-green-400 font-medium">Conectado a MongoDB Atlas</span>
          </div>
          <div className="flex items-center gap-4 text-[#8899aa]">
            <span>🛫 {stats.aeropuertos} aeropuertos</span>
            <span>✈️ {stats.vuelos} vuelos</span>
            <span>🎫 {stats.billetes} billetes</span>
            <span>👤 {stats.clientes} clientes</span>
            <Link
              href="/vuelos"
              className="text-[#ffad00] hover:underline font-medium"
            >
              Explorar vuelos →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
