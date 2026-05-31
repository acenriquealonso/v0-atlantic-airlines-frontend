import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI no definida");
}

function createClientPromise() {
  const client = new MongoClient(uri, {
    maxPoolSize: 10,
  });

  return client.connect();
}

type MongoCache = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as MongoCache;

export function getMongoClient() {
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = createClientPromise().catch((error) => {
      globalWithMongo._mongoClientPromise = undefined;
      throw error;
    });
  }

  return globalWithMongo._mongoClientPromise;
}