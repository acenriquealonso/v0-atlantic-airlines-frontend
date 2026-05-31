import { NextRequest } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ok, fail } from "@/lib/api-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ iata: string }> }
) {
  try {
    const { iata } = await params;
    const client = await getMongoClient();
    const db = client.db("atlantic_airlines");

    const doc = await db
      .collection("aeropuertos")
      .findOne({ codigo_iata: iata.toUpperCase() });

    if (!doc) return fail("Aeropuerto no encontrado", 404);

    return ok(doc);
  } catch (error) {
    return fail("Error: " + String(error), 500);
  }
}
