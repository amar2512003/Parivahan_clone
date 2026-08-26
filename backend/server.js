import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import dlRoutes from "./routes/dl.js";
import vehicleRoutes from "./routes/vehicles.js";
import applicationRoutes from "./routes/applications.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://parivahan-clone.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);
      return callback(null, false);
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "parivahan-clone-backend",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/dl", dlRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/applications", applicationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found.",
  });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Something went wrong on the server.",
  });
});


export default app;