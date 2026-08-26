# Parivahan Sewa — Redesign (Hackathon Clone)

A restructured, modernized clone of the Parivahan Sewa portal UI/UX, built for
a hackathon "modify an existing website" problem statement. Uses **dummy
data and dummy credentials only** — this is not connected to any real
government system and is not affiliated with the Government of India.

## Structure

```
parivahan-clone/
├── backend/            Express API + SQLite database
│   ├── db/             connection.js, seed.js (schema + dummy data)
│   ├── middleware/      auth.js (JWT check)
│   ├── routes/          auth, services, dl, vehicles, applications
│   └── server.js
└── frontend/           React + Vite + Tailwind
    ├── src/components/  Header, Navbar (mega-menu), Footer
    ├── src/pages/       Home, Login, DrivingLicense, VehicleRegistration...
    ├── src/context/     AuthContext (JWT session)
    ├── src/locales/     en.json, hi.json (English/Hindi switch)
    └── src/api/         axios client
```

## Why these choices

- **SQLite** (`better-sqlite3`) — a real relational database with proper
  schema/foreign keys, but zero external setup (no server to install) so
  it runs anywhere instantly. Swap for Postgres/MySQL later by only
  touching `backend/db/connection.js`.
- **JWT auth** with bcrypt-hashed passwords — dummy accounts, but a real
  auth pattern, not a hardcoded "if password == 'admin'" check.
- **react-i18next** — clean English/Hindi toggle, stored in `localStorage`.
- **Separated frontend/backend** — talk over a JSON REST API
  (`/api/...`), so either side can be redeployed or replaced independently.

## Running locally

### 1. Backend

```bash
cd backend
npm install
npm run dev        # creates/updates demo data and starts API on http://localhost:5001
```

The API automatically creates the database schema and refreshes the supplied
dummy accounts at startup, so a separate seed step is not required.

Dummy login credentials (also printed by the seed script):

| Username | Password  |
|----------|-----------|
| demo     | demo1234  |
| citizen  | citizen123|

Demo lookup values (no login needed):
- Driving Licence number: `WB0620230012345`
- Vehicle registration number: `WB06AB1234`

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev        # starts on http://localhost:5173
```

Open http://localhost:5173 in your browser.

## What's implemented

- Header with reusable emblem/logo slot, portal name, and an English/Hindi
  language switch (`/frontend/src/components/Header.jsx`).
- Vehicle Related Services hub with eChallan, PUCC, permit, fitness, checkpost
  tax, National Permit, scrapping, and fancy number flows. The National Permit
  dashboard includes the supplied state-wise authorization figures.
- Mega-menu navigation for Driving Licence, Vehicle Registration, and
  Other Services, sourced from `GET /api/services/menu` (bilingual data).
- Clicking any Driving Licence menu item routes to
  `/driving-license/:slug` — a real client-side route, matching the
  "clicking DL items redirects to a different page" requirement.
- Login (dummy JWT-based), "My Licence" view, public "Know Your Licence"
  and "Know Your Vehicle" lookups, and a dummy "Submit Application" flow
  that writes a row into the `applications` table.
- Vehicle Registration section wired the same way, with one full lookup
  flow (`vehicle-status`) as the template for the rest.

## Extending it

- Add a new service: add it to `menu` in `backend/routes/services.js`,
  then add a matching case (or new page) on the frontend.
- Add a new page/route: create a file in `frontend/src/pages/`, wire it
  into `frontend/src/App.jsx`.
- Swap the placeholder emblem: replace `frontend/public/emblem.svg` with
  the official State Emblem / Digital India / NIC logo assets your team
  has permission to use for the hackathon submission.
