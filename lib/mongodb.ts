import { MongoClient } from "mongodb";

let clientPromise: Promise<MongoClient>;

function getClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI no definida");
  const client = new MongoClient(uri);
  return client.connect();
}

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = getClientPromise();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = getClientPromise();
}

export default clientPromise;