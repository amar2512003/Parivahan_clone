import { Router } from "express";
import db from "../db/connection.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/mine", requireAuth, (req, res) => {
  const vehicles = db
    .prepare("SELECT * FROM vehicles WHERE user_id = ?")
    .all(req.user.id);

  res.json({ vehicles });
});

router.post("/lookup", (req, res) => {
  const { registration_number } = req.body;

  if (!registration_number) {
    return res.status(400).json({
      error: "Registration number is required.",
    });
  }

  const vehicle = db
    .prepare(
      `SELECT registration_number, owner_name, vehicle_class,
              maker_model, fitness_valid_till,
              insurance_valid_till, puc_valid_till
       FROM vehicles
       WHERE registration_number = ?`
    )
    .get(registration_number.trim().toUpperCase());

  if (!vehicle) {
    return res.status(404).json({
      error: "No record found for this registration number.",
    });
  }

  res.json({ vehicle });
});


// POST /api/vehicles/apply/:slug
// Submit a dummy application for any vehicle-related service
router.post("/apply/:slug", requireAuth, (req, res) => {
  const { slug } = req.params;
  const { serviceName, registration_number } = req.body;

  const name = registration_number
    ? `${serviceName || slug} — ${registration_number}`
    : serviceName || slug;

  const result = db
    .prepare(
      `INSERT INTO applications
       (user_id, service_slug, service_name, status)
       VALUES (?, ?, ?, 'SUBMITTED')`
    )
    .run(req.user.id, slug, name);

  res.status(201).json({
    message:
      "Application submitted successfully (dummy data — no real vehicle action is performed).",
    applicationId: result.lastInsertRowid,
  });
});


export default router;