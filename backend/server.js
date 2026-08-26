import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import dlRoutes from "./routes/dl.js";
import vehicleRoutes from "./routes/vehicles.js";
import applicationRoutes from "./routes/applications.js";
import { seedDatabase } from "./db/seed.js";

// The demo must be usable immediately after `npm run dev`; keep schema and
// sample accounts in sync whenever the API starts.
seedDatabase({ log: false });

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "parivahan-clone-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/dl", dlRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/applications", applicationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

app.listen(PORT, () => {
  console.log(`Parivahan-clone backend running on http://localhost:${PORT}`);
});
