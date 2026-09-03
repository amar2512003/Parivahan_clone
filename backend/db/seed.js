import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import pool from "./connection.js";

export async function seedDatabase({ log = true } = {}) {
  if (log) console.log("Setting up schema...");

  // node-postgres sends a parameter-less query string over the "simple"
  // query protocol, which (unlike the extended/prepared protocol used when
  // you pass params) is allowed to contain multiple ; separated statements
  // in one call - so this can stay one exec like the sqlite version.
  await pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  mobile TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driving_licenses (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  dl_number TEXT UNIQUE NOT NULL,
  holder_name TEXT NOT NULL,
  dob TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  valid_till TEXT NOT NULL,
  vehicle_classes TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE'
);

CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  registration_number TEXT UNIQUE NOT NULL,
  owner_name TEXT NOT NULL,
  vehicle_class TEXT NOT NULL,
  maker_model TEXT NOT NULL,
  registration_date TEXT NOT NULL,
  fitness_valid_till TEXT NOT NULL,
  insurance_valid_till TEXT NOT NULL,
  puc_valid_till TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_slug TEXT NOT NULL,
  service_name TEXT NOT NULL,
  status TEXT DEFAULT 'SUBMITTED',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

  if (log) console.log("Schema ready. Seeding dummy data...");

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

  for (const u of dummyUsers) {
    await pool.query(
      `INSERT INTO users (full_name, mobile, username, password_hash)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (username) DO UPDATE SET
         full_name = excluded.full_name,
         mobile = excluded.mobile,
         password_hash = excluded.password_hash`,
      [u.full_name, u.mobile, u.username, u.password_hash]
    );
  }

  const { rows: demoRows } = await pool.query(
    "SELECT id FROM users WHERE username = $1",
    ["demo"]
  );
  const { rows: citizenRows } = await pool.query(
    "SELECT id FROM users WHERE username = $1",
    ["citizen"]
  );
  const demoId = demoRows[0].id;
  const citizenId = citizenRows[0].id;

  await pool.query(
    `INSERT INTO driving_licenses
       (user_id, dl_number, holder_name, dob, issue_date, valid_till, vehicle_classes, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (dl_number) DO NOTHING`,
    [demoId, "WB0620230012345", "Amar Sinha", "2003-05-14", "2023-06-01", "2043-05-31", "MCWG, LMV", "ACTIVE"]
  );

  await pool.query(
    `INSERT INTO driving_licenses
       (user_id, dl_number, holder_name, dob, issue_date, valid_till, vehicle_classes, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (dl_number) DO NOTHING`,
    [citizenId, "DL0420190098765", "Test Citizen", "1998-11-02", "2019-03-15", "2039-03-14", "LMV", "ACTIVE"]
  );

  await pool.query(
    `INSERT INTO vehicles
       (user_id, registration_number, owner_name, vehicle_class, maker_model, registration_date, fitness_valid_till, insurance_valid_till, puc_valid_till)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (registration_number) DO NOTHING`,
    [demoId, "WB06AB1234", "Amar Sinha", "Motor Car", "Maruti Suzuki Swift", "2022-01-10", "2037-01-09", "2026-12-31", "2026-11-30"]
  );

  // applications has no unique constraint (mirrors the original
  // "INSERT OR IGNORE" here, which never actually had anything to
  // conflict on either) - guard on existence instead so re-seeding
  // doesn't pile up duplicate rows every restart.
  const { rows: existingApp } = await pool.query(
    "SELECT id FROM applications WHERE user_id = $1 AND service_slug = $2",
    [demoId, "dl-renewal"]
  );
  if (existingApp.length === 0) {
    await pool.query(
      `INSERT INTO applications (user_id, service_slug, service_name, status)
       VALUES ($1, $2, $3, $4)`,
      [demoId, "dl-renewal", "Driving Licence Renewal", "IN_PROGRESS"]
    );
  }

  if (log) {
    console.log("Seed complete.");
    console.log("Dummy credentials -> username: demo / password: demo1234");
    console.log("Dummy credentials -> username: citizen / password: citizen123");
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });
}
