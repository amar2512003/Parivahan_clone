import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isVercel = Boolean(process.env.VERCEL);

const dbPath = isVercel
  ? "/tmp/parivahan.sqlite"
  : process.env.DB_PATH
    ? path.resolve(__dirname, "..", process.env.DB_PATH)
    : path.resolve(__dirname, "parivahan.sqlite");

// Ensure folder exists
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export default db;