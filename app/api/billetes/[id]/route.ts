import { NextRequest } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ok, fail } from "@/lib/api-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numId = parseInt(id);
    if (isNaN(numId)) return fail("ID inválido", 400);

    const client = await getMongoClient();
    const db = client.db("atlantic_airlines");

    const doc = await db.collection("billetes").findOne({ _id: numId });

    if (!doc) return fail("Reserva no encontrada", 404);

    return ok(doc);
  } catch (error) {
    return fail("Error: " + String(error), 500);
  }
}
