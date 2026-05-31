import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = await getMongoClient();
    await client.db().command({ ping: 1 });
    return NextResponse.json({ status: "✅ Conexión exitosa con MongoDB" });
  } catch (error) {
    return NextResponse.json({ status: "❌ Error de conexión", error: String(error) }, { status: 500 });
  }
}