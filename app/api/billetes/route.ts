import { NextRequest } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ok, fail } from "@/lib/api-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const codigo = searchParams.get("codigo") || "";
    const apellido = searchParams.get("apellido") || "";
    const dni = searchParams.get("dni") || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);

    if (!codigo && !dni) {
      return fail("Debes proporcionar código de reserva o DNI", 400);
    }

    const client = await getMongoClient();
    const db = client.db("atlantic_airlines");

    const filter: Record<string, unknown> = {};

    // Billetes use _id as numeric code — but we don't have booking codes.
    // We'll search by cliente info embedded in the document.
    if (dni) {
      filter["cliente.dni"] = dni;
    }
    if (apellido) {
      filter["cliente.apellidos"] = new RegExp(apellido, "i");
    }

    // If codigo is provided, treat it as billete _id
    if (codigo && !dni) {
      const numId = parseInt(codigo);
      if (!isNaN(numId)) {
        filter._id = numId;
      }
    }

    const docs = await db
      .collection("billetes")
      .find(filter)
      .limit(limit)
      .toArray();

    return ok({ billetes: docs, total: docs.length });
  } catch (error) {
    return fail("Error al buscar billete: " + String(error), 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vuelo_id, nombre, apellidos, email, dni, clase, equipaje, telefono } = body;

    if (!vuelo_id || !nombre || !apellidos || !dni) {
      return fail("Faltan campos obligatorios: vuelo_id, nombre, apellidos, dni", 400);
    }

    const client = await getMongoClient();
    const db = client.db("atlantic_airlines");

    // Fetch the vuelo to get flight details
    const vuelo = await db.collection("vuelos").findOne({ _id: parseInt(vuelo_id) });
    if (!vuelo) {
      return fail("Vuelo no encontrado", 404);
    }

    // Get next billete ID
    const last = await db
      .collection("billetes")
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    const nextId = last.length > 0 ? last[0]._id + 1 : 20006;

    // Assign a seat (simple: row + letter based on count)
    const claseReal = clase || "TURISTA";
    const seatRow = Math.floor(Math.random() * 30) + 1;
    const seatLetter = String.fromCharCode(65 + Math.floor(Math.random() * 6));
    const equipajeNum = parseInt(equipaje) || 15;
    const precioBase = claseReal === "TURISTA" ? 89.99 : claseReal === "PREMIUM" ? 199.99 : claseReal === "BUSINESS" ? 499.99 : 1299.99;

    const billete = {
      _id: nextId,
      vuelo: {
        _id: vuelo._id,
        ruta: vuelo.ruta?.nombre || `${vuelo.ruta?.origen?.iata || ""}-${vuelo.ruta?.destino?.iata || ""}`,
        fecha_salida: vuelo.fecha_salida,
      },
      cliente: {
        _id: nextId, // placeholder — we could link to clientes collection
        nombre,
        apellidos,
        dni,
        email: email || "",
        telefono: telefono || "",
      },
      fecha_billete: new Date().toISOString().split("T")[0],
      clase: claseReal,
      asiento: `${seatRow}${seatLetter}`,
      equipaje_facturado: equipajeNum,
      precio: precioBase,
      estado: "EMITIDO",
      creado_en: new Date().toISOString(),
    };

    await db.collection("billetes").insertOne(billete);

    return ok({ billete }, 201);
  } catch (error) {
    return fail("Error al crear reserva: " + String(error), 500);
  }
}
