
````markdown
# Parivahan Sewa — Redesign (Hackathon Clone)

A restructured, modernized redesign of the Parivahan Sewa portal UI/UX, built for
a hackathon "modify an existing website" problem statement.

The project focuses on creating a **faster, cleaner, and more user-friendly
one-stop experience** for accessing transport-related services.

This project uses **dummy application data, dummy credentials, and a mock
payment gateway only**. It is not connected to any real government system and
is not affiliated with the Government of India.

---

## Structure

```text
parivahan-clone/

├── backend/                  Express API + PostgreSQL database
│   ├── db/
│   │   ├── connection.js     PostgreSQL connection
│   │   └── seed.js           Schema + dummy data
│   ├── middleware/
│   │   └── auth.js           JWT authentication
│   ├── routes/
│   │   ├── auth.js
│   │   ├── services.js
│   │   ├── dl.js
│   │   ├── vehicles.js
│   │   └── applications.js
│   └── server.js
│
└── frontend/                 React + Vite + Tailwind
    ├── src/components/       Header, Navbar, Footer, Chatbot...
    ├── src/pages/            Home, Login, DrivingLicense,
    │                          VehicleRegistration, RTO Locator...
    ├── src/context/          AuthContext (JWT session)
    ├── src/locales/           en.json, hi.json
    └── src/api/              Axios client
````

---

## Why these choices

* **PostgreSQL** — a production-ready relational database used for users,
  driving licences, vehicles, and applications. The backend uses the
  `pg` package and parameterized SQL queries.

* **JWT authentication** — passwords are hashed using bcrypt and authenticated
  using JSON Web Tokens. This provides a realistic authentication flow instead
  of hardcoded credentials.

* **React + Vite + Tailwind CSS** — provides a fast development experience and
  a clean, responsive UI.

* **react-i18next** — provides English/Hindi language switching with language
  preference stored in `localStorage`.

* **Separated frontend/backend** — the React frontend communicates with the
  Express backend through a JSON REST API (`/api/...`), allowing both parts to
  be deployed independently.

* **AI-powered navigation** — a Groq-powered chatbot helps users discover
  services without having to manually search through multiple menus.

* **RTO Locator** — includes data for **731 actual RTO offices**, including
  their office addresses and geographic coordinates, allowing users to locate
  relevant RTO offices more easily.

---

## PostgreSQL Database

The project was migrated from SQLite to **PostgreSQL** to provide a more
production-oriented database setup.

The database contains the following main tables:

```text
users
driving_licenses
vehicles
applications
```

The database schema and demo data are automatically initialized using the
seed script.

### Environment variables

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
CORS_ORIGIN=http://localhost:5173
```

For production deployment, the PostgreSQL database can be hosted using a
managed PostgreSQL provider such as Supabase.

---

## Running locally

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

The backend starts the API on:

```text
http://localhost:5001
```

The database schema and supplied dummy data are initialized automatically.

### Dummy login credentials

| Username | Password   |
| -------- | ---------- |
| demo     | demo1234   |
| citizen  | citizen123 |

### Demo lookup values

**Driving Licence**

```text
WB0620230012345
```

**Vehicle Registration**

```text
WB06AB1234
```

---

### 2. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on:

```text
http://localhost:5173
```

Open the URL in your browser.

---

## What's implemented

### 1. Clean One-Stop Interface

The project redesigns the transport-service experience around a simpler
navigation structure.

The main navigation focuses on:

* Home
* Driving Licence
* Vehicle Services

The goal is to reduce unnecessary navigation and provide a faster,
more focused citizen experience.

---

### 2. Driving Licence Services

The Driving Licence section includes:

* Learner's Licence
* Renewal of Driving Licence
* Duplicate Licence
* International Driving Permit
* Addition of Vehicle Class
* Know Your Licence Details
* My Licence
* Submit Application

Clicking a Driving Licence service routes the user to a dedicated
client-side page:

```text
/driving-license/:slug
```

---

### 3. Vehicle Services

Vehicle-related services include:

* New Vehicle Registration
* Renewal of Registration
* Transfer of Ownership
* Change of Address
* Duplicate RC
* Know Your Vehicle Details
* eChallan
* PUCC
* Permit-related services
* Vehicle Fitness Testing
* Checkpost Tax
* National Permit Authorization
* Vehicle Scrapping
* Fancy Number Booking

---

### 4. RTO Locator

A dedicated **RTO Locator** was added to make finding transport offices
easier.

The locator contains information for **731 actual RTO offices**, including:

* RTO office names
* Office addresses
* Geographic coordinates
* Location-based discovery

The geographic coordinates were prepared from the actual RTO office
addresses so that the offices can be represented on the locator interface.

This avoids forcing users to manually search through external sources just
to identify their relevant RTO office.

---

### 5. AI Chatbot

The project includes an **AI-powered chatbot using Groq**.

Instead of requiring users to understand the website's navigation structure,
they can ask questions in natural language.

For example:

```text
How can I renew my driving licence?
```

The chatbot helps the user understand the relevant service and navigate
towards it.

This makes the portal more accessible for users who may not know which
menu or section contains the service they need.

---

### 6. Mock Payment Gateway

A **mock payment gateway** was implemented to demonstrate the complete
application journey.

The flow can be represented as:

```text
Find Service
     ↓
Select Service
     ↓
Authenticate
     ↓
Submit Application
     ↓
Mock Payment
     ↓
Payment Success
```

No real money or real government payment system is involved.

The mock gateway is intended only to demonstrate how a complete citizen
workflow could look inside a unified portal.

---

### 7. Authentication

Authentication is implemented using:

* JWT
* bcrypt password hashing
* Login
* Signup
* Protected routes
* User-specific information

Authenticated users can access their own:

* Driving Licence information
* Vehicle information
* Applications

---

### 8. Database-backed Applications

Service applications are stored in the PostgreSQL database.

For example, submitting a Driving Licence service creates an application
associated with the authenticated user.

This allows the project to demonstrate a realistic end-to-end workflow
rather than using only static frontend screens.

---

### 9. Multilingual Interface

The interface supports:

* English
* Hindi

Language selection is handled using `react-i18next` and the selected
language is persisted using `localStorage`.

---

### 10. Responsive UI

The frontend is designed to work across different screen sizes, including:

* Desktop
* Tablet
* Mobile

The UI focuses on reducing visual complexity while keeping important
transport services easy to discover.

---

## API Structure

The backend exposes REST APIs under `/api`.

```text
/api/auth
/api/services
/api/dl
/api/vehicles
/api/applications
```

Example:

```text
GET /api/services/menu
```

The frontend uses Axios to communicate with the backend.

---

## Deployment

The frontend and backend are deployed separately.

### Frontend

```text
Vite + React
```

### Backend

```text
Node.js + Express
```

### Database

```text
PostgreSQL
```

The production backend connects to the hosted PostgreSQL database through
the `DATABASE_URL` environment variable.

---

## Use of Codex

**Codex was used as a development assistant during the implementation of
the project.**

Two important areas where Codex helped were:

### 1. SQLite → PostgreSQL Migration

Codex helped migrate the backend database from **SQLite to PostgreSQL**.

This included assistance with:

* PostgreSQL database connection
* Schema conversion
* SQL query changes
* Parameterized queries
* Seed data
* Database initialization

The final database architecture uses PostgreSQL instead of the original
SQLite implementation.

### 2. RTO Office Coordinates

Codex also helped process the RTO data and find the **geographic coordinates
of the actual RTO office addresses**.

These coordinates were used to build the RTO Locator containing
**731 actual RTO office locations**.

Codex was used as a development and problem-solving assistant, while the
final architecture, feature decisions, integration, and implementation
were reviewed and completed as part of the project development.

---

## Extending the project

### Add a new service

Add the service to:

```text
backend/routes/services.js
```

Then add the corresponding frontend route/page.

### Add a new page

Create a page inside:

```text
frontend/src/pages/
```

Then register the route in:

```text
frontend/src/App.jsx
```

### Add a new API

Create or modify a route inside:

```text
backend/routes/
```

and connect it from the frontend using the Axios client.

---

## Disclaimer

This project is a **hackathon prototype / redesign concept**.

It does not connect to official Parivahan, Sarathi, RTO, payment, or other
Government of India systems.

All application records, credentials, transactions, and other transactional
data used by the prototype are for demonstration purposes only.

The project is **not affiliated with or endorsed by the Government of India**.

```

