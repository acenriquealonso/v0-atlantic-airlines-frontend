import { NextRequest } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ok, fail } from "@/lib/api-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origen = searchParams.get("origen") || "";
    const destino = searchParams.get("destino") || "";
    const fecha = searchParams.get("fecha") || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);

    const client = await getMongoClient();
    const db = client.db("atlantic_airlines");

    // Build filter based on available params
    const filter: Record<string, unknown> = {};

    // Solo vuelos programados (reservables)
    filter.estado = "PROGRAMADO";

    if (origen) {
      const re = new RegExp(origen, "i");
      filter["ruta.origen.iata"] = re;
    }

    if (destino) {
      const re = new RegExp(destino, "i");
      filter["ruta.destino.iata"] = re;
    }

    if (fecha) {
      // Support partial date match (YYYY-MM-DD or YYYY-MM)
      filter["fecha_salida"] = { $regex: `^${fecha}` };
    }

    const total = await db.collection("vuelos").countDocuments(filter);
    const docs = await db
      .collection("vuelos")
      .find(filter)
      .sort({ fecha_salida: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return ok({ vuelos: docs, total, page, limit, filter });
  } catch (error) {
    return fail("Error al buscar vuelos: " + String(error), 500);
  }
}
