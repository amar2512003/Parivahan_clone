import bcrypt from "bcryptjs";
import db from "./connection.js";
import { fileURLToPath } from "url";

export function seedDatabase({ log = true } = {}) {
  if (log) console.log("Setting up schema...");

  db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  mobile TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driving_licenses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  dl_number TEXT UNIQUE NOT NULL,
  holder_name TEXT NOT NULL,
  dob TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  valid_till TEXT NOT NULL,
  vehicle_classes TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  registration_number TEXT UNIQUE NOT NULL,
  owner_name TEXT NOT NULL,
  vehicle_class TEXT NOT NULL,
  maker_model TEXT NOT NULL,
  registration_date TEXT NOT NULL,
  fitness_valid_till TEXT NOT NULL,
  insurance_valid_till TEXT NOT NULL,
  puc_valid_till TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  service_slug TEXT NOT NULL,
  service_name TEXT NOT NULL,
  status TEXT DEFAULT 'SUBMITTED',
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`);

  if (log) console.log("Schema ready. Seeding dummy data...");

  const insertUser = db.prepare(`
  INSERT INTO users (full_name, mobile, username, password_hash)
  VALUES (@full_name, @mobile, @username, @password_hash)
  ON CONFLICT(username) DO UPDATE SET
    full_name = excluded.full_name,
    mobile = excluded.mobile,
    password_hash = excluded.password_hash
`);

  const dummyUsers = [
  {
    full_name: "Amar Sinha",
    mobile: "9999999999",
    username: "demo",
    password_hash: bcrypt.hashSync("demo1234", 10),
  },
  {
    full_name: "Test Citizen",
    mobile: "8888888888",
    username: "citizen",
    password_hash: bcrypt.hashSync("citizen123", 10),
  },
];

  for (const u of dummyUsers) insertUser.run(u);

  const getUserId = db.prepare("SELECT id FROM users WHERE username = ?");
  const demoId = getUserId.get("demo").id;
  const citizenId = getUserId.get("citizen").id;

  db.prepare(`
  INSERT OR IGNORE INTO driving_licenses
  (user_id, dl_number, holder_name, dob, issue_date, valid_till, vehicle_classes, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(demoId, "WB0620230012345", "Amar Sinha", "2003-05-14", "2023-06-01", "2043-05-31", "MCWG, LMV", "ACTIVE");

  db.prepare(`
  INSERT OR IGNORE INTO driving_licenses
  (user_id, dl_number, holder_name, dob, issue_date, valid_till, vehicle_classes, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(citizenId, "DL0420190098765", "Test Citizen", "1998-11-02", "2019-03-15", "2039-03-14", "LMV", "ACTIVE");

  db.prepare(`
  INSERT OR IGNORE INTO vehicles
  (user_id, registration_number, owner_name, vehicle_class, maker_model, registration_date, fitness_valid_till, insurance_valid_till, puc_valid_till)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(demoId, "WB06AB1234", "Amar Sinha", "Motor Car", "Maruti Suzuki Swift", "2022-01-10", "2037-01-09", "2026-12-31", "2026-11-30");

  db.prepare(`
  INSERT OR IGNORE INTO applications (user_id, service_slug, service_name, status)
  VALUES (?, ?, ?, ?)
`).run(demoId, "dl-renewal", "Driving Licence Renewal", "IN_PROGRESS");

  if (log) {
    console.log("Seed complete.");
    console.log("Dummy credentials -> username: demo / password: demo1234");
    console.log("Dummy credentials -> username: citizen / password: citizen123");
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  seedDatabase();
}
