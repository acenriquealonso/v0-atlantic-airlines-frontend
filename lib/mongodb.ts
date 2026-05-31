import { MongoClient } from "mongodb";

function createClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // Don't throw at module level — the env var might not be set during build
    return Promise.reject(new Error("MONGODB_URI no definida"));
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
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

// For Server Components: returns null if not configured (avoids build crashes)
export async function getMongoClientSafe() {
  if (!process.env.MONGODB_URI) return null;
  try {
    return await getMongoClient();
  } catch {
    return null;
  }
}
