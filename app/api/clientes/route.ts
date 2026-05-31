import { NextRequest } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { ok, fail } from "@/lib/api-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, action } = body;

    if (!email || !password) {
      return fail("Email y contraseña requeridos", 400);
    }

    const client = await getMongoClient();
    const db = client.db("atlantic_airlines");

    if (action === "register") {
      // Check if already exists
      const existing = await db.collection("clientes").findOne({ email });
      if (existing) {
        return fail("Ya existe una cuenta con ese email", 409);
      }

      // Get next ID
      const last = await db
        .collection("clientes")
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();
      const nextId = last.length > 0 ? last[0]._id + 1 : 1;

      const nuevo = {
        _id: nextId,
        nombre: body.nombre || "",
        apellidos: body.apellidos || "",
        email,
        telefono: body.telefono || "",
        password, // Simple — in production this would be hashed
        fecha_registro: new Date().toISOString().split("T")[0],
      };

      await db.collection("clientes").insertOne(nuevo);
      return ok({ cliente: { _id: nuevo._id, nombre: nuevo.nombre, email: nuevo.email } }, 201);
    }

    // Login action (default)
    // First try exact match (for registered users with password field)
    let cliente = await db.collection("clientes").findOne({ email, password });

    if (!cliente) {
      // For existing users without password field (imported data),
      // find by email only — any password works for demo
      cliente = await db.collection("clientes").findOne({
        email,
        password: { $exists: false },
      });
    }

    if (!cliente) {
      return fail("Email o contraseña incorrectos", 401);
    }

    return ok({
      cliente: {
        _id: cliente._id,
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        email: cliente.email,
      },
    });
  } catch (error) {
    return fail("Error: " + String(error), 500);
  }
}
