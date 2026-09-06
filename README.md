# Parivahan Sewa — Reimagined

A redesigned, faster take on India's Parivahan Sewa portal, built for a hackathon "modify an existing website" problem statement. It rebuilds the vehicle/licence-services experience around clear, single-task flows instead of the dense, form-heavy layout of the original — driving licence services, vehicle registration, an RTO locator, and a chatbot assistant, all wrapped in a bilingual (English/Hindi) interface.

> ⚠️ **This is a demo, not a government service.** Every account, licence, vehicle record, and payment on this site is dummy data created for this project. Nothing here is connected to any real government system, and it is not affiliated with the Government of India in any way.

---

## What's in it

- **Driving Licence & Vehicle Registration** — apply, renew, and check status flows, plus a "know your licence/vehicle" lookup
- **Online Services** — eChallan, PUCC, permit applications, vehicle fitness testing, checkpost tax, national permit authorization, vehicle scrapping, and fancy-number booking
- **Mock payment gateway** — a Razorpay-style checkout for the paid-looking services above, with UPI (including a real-shaped, scannable QR code), card, and netbanking tabs. No real gateway is ever contacted and no money moves.
- **RTO Locator** — pick a state to see its RTO offices with address, phone, and an interactive Leaflet map, or share your location to find the nearest one. Seeded with real RTO jurisdiction codes and localities for several states.
- **AI chatbot** — a floating assistant (Groq-powered) that can answer questions about any service on the site
- **Accounts** — JWT-based signup/login backed by Postgres
- **Bilingual UI** — English and Hindi throughout, including the chatbot and RTO data

## Tech stack

**Frontend** — React + Vite, Tailwind CSS, React Router, react-i18next, react-leaflet, qrcode.react, lucide-react

**Backend** — Node.js + Express, PostgreSQL, JWT + bcrypt for auth

**AI** — Groq API (OpenAI-compatible chat completions)

## Project structure

```
parivahan-clone/
├── backend/                    Express API + PostgreSQL
│   ├── db/
│   │   ├── connection.js       Postgres pool setup
│   │   └── seed.js             Schema + dummy data (idempotent, runs on boot)
│   ├── middleware/
│   │   └── auth.js             JWT auth guard
│   └── routes/
│       ├── auth.js             Signup / login / me
│       ├── dl.js                Driving licence lookup & applications
│       ├── vehicles.js         Vehicle lookup & applications
│       ├── applications.js     A user's submitted applications
│       ├── services.js         Static bilingual service directory
│       └── chat.js             Proxies chat requests to Groq
│
└── frontend/                   React + Vite + Tailwind
    └── src/
        ├── components/         Header, Navbar, Footer, Chatbot, MockCheckout, IndiaMapStateSearch...
        ├── pages/               Home, Login, Signup, DrivingLicense, VehicleRegistration,
        │                        OnlineServices, RtoLocator...
        ├── data/                Static/seeded data (services directory, RTO offices, state maps)
        ├── context/             AuthContext (JWT session)
        └── locales/             en.json, hi.json
```

## Getting started

**Prerequisites:** Node 18+, and a PostgreSQL database (local, or a free hosted one — Neon, Supabase, and Vercel Postgres all work with just a connection string).

**Backend**

```bash
cd backend
npm install
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, and optionally GROQ_API_KEY
npm run dev
```

The schema and demo accounts are seeded automatically on startup — no separate migration step needed.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

**Demo login:** `demo` / `demo1234` (or `citizen` / `citizen123`)

## Environment variables (backend)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `JWT_SECRET` | Signing secret for auth tokens |
| `PORT` | Backend port (defaults to 5001) |
| `CORS_ORIGIN` | Allowed frontend origin |
| `GROQ_API_KEY` | Enables the chatbot; without it, the chat widget shows a "not configured" message instead of replying |

## Disclaimer

This project uses dummy application data, dummy credentials, and a mock payment gateway only. It is not connected to any real government system and is not affiliated with the Government of India. It was built for a hackathon and is intended for demonstration purposes only.
