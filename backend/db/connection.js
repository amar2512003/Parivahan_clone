import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy backend/.env.example to backend/.env " +
      "and point DATABASE_URL at your Postgres instance (local, or a free " +
      "hosted one like Neon / Supabase / Vercel Postgres)."
  );
}

// Local Postgres (sandbox / docker / your own machine) almost never has SSL
// turned on, while every hosted provider we recommend (Neon, Supabase,
// Vercel Postgres) requires it. Rather than making everyone edit code to
// switch between the two, we auto-detect from the host and let DB_SSL
// override it explicitly when the guess is wrong.
function shouldUseSSL() {
  if (process.env.DB_SSL === "true") return true;
  if (process.env.DB_SSL === "false") return false;

  try {
    const { hostname } = new URL(connectionString);
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
    return !isLocal;
  } catch {
    return false;
  }
}

export const pool = new Pool({
  connectionString,
  ssl: shouldUseSSL() ? { rejectUnauthorized: false } : false,
});

pool.on("error", (err) => {
  // Fired for errors on idle clients in the pool (e.g. the connection was
  // dropped by the server) - log it instead of crashing the process.
  console.error("Unexpected error on idle Postgres client:", err);
});

/**
 * Thin query helper so route files can stay close to how they read before
 * (db.query(text, params) -> rows), instead of every call site having to
 * check out/release a client itself.
 */
export function query(text, params) {
  return pool.query(text, params);
}

export default pool;
