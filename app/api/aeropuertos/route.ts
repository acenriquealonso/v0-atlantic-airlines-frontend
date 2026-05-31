import { NextRequest } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ok, fail } from "@/lib/api-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "100"), 200);
    const page = Math.max(parseInt(searchParams.get("page") || "1"), 1);

    const client = await getMongoClient();
    const db = client.db("atlantic_airlines");

    const filter: Record<string, unknown> = {};
    if (search) {
      const re = new RegExp(search, "i");
      filter.$or = [
        { ciudad: re },
        { pais: re },
        { nombre: re },
        { codigo_iata: re },
        { codigo_icao: re },
      ];
    }

    const total = await db.collection("aeropuertos").countDocuments(filter);
    const docs = await db
      .collection("aeropuertos")
      .find(filter)
      .sort({ ciudad: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return ok({ aeropuertos: docs, total, page, limit });
  } catch (error) {
    return fail("Error al obtener aeropuertos: " + String(error), 500);
  }
}
