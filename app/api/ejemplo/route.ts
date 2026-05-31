import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("atlantic-airlines"); // nombre de tu DB
    const coleccion = db.collection("vuelos");
    const datos = await coleccion.find({}).limit(10).toArray();
    return NextResponse.json(datos);
  } catch (error) {
    return NextResponse.json({ error: "Error de conexión" }, { status: 500 });
  }
}