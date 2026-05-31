import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) throw new Error("MONGODB_URI no está definida en las variables de entorno");

if (process.env.NODE_ENV === "development") {
  // En desarrollo, reutiliza la conexión entre hot-reloads
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // En producción, crea una conexión nueva
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;