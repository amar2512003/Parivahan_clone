import { Router } from "express";
import db from "../db/connection.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/dl/mine - the logged-in user's driving licence record (dummy data)
router.get("/mine", requireAuth, (req, res) => {
  const dl = db
    .prepare("SELECT * FROM driving_licenses WHERE user_id = ?")
    .get(req.user.id);

  if (!dl) {
    return res.status(404).json({ error: "No driving licence found for this account." });
  }
  res.json({ license: dl });
});

// POST /api/dl/lookup - public "know your licence" style lookup by DL number
router.post("/lookup", (req, res) => {
  const { dl_number } = req.body;
  if (!dl_number) {
    return res.status(400).json({ error: "Driving licence number is required." });
  }

  const dl = db
    .prepare("SELECT dl_number, holder_name, status, valid_till, vehicle_classes FROM driving_licenses WHERE dl_number = ?")
    .get(dl_number.trim());

  if (!dl) {
    return res.status(404).json({ error: "No record found for this licence number." });
  }
  res.json({ license: dl });
});

// POST /api/dl/apply/:slug - submit a dummy application for any DL-related service
router.post("/apply/:slug", requireAuth, (req, res) => {
  const { slug } = req.params;
  const { serviceName } = req.body;

  const result = db
    .prepare(
      "INSERT INTO applications (user_id, service_slug, service_name, status) VALUES (?, ?, ?, 'SUBMITTED')"
    )
    .run(req.user.id, slug, serviceName || slug);

  res.status(201).json({
    message: "Application submitted successfully (dummy data — no real DL is issued).",
    applicationId: result.lastInsertRowid,
  });
});

export default router;
