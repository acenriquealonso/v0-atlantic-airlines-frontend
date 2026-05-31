import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });
    return NextResponse.json({ status: "✅ Conexión exitosa con MongoDB" });
  } catch (error) {
    return NextResponse.json({ status: "❌ Error de conexión", error: String(error) }, { status: 500 });
  }
}