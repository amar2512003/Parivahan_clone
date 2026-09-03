import { Router } from "express";
import pool from "../db/connection.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/mine", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM vehicles WHERE user_id = $1",
      [req.user.id]
    );

    res.json({ vehicles: rows });
  } catch (err) {
    next(err);
  }
});

router.post("/lookup", async (req, res, next) => {
  try {
    const { registration_number } = req.body;

    if (!registration_number) {
      return res.status(400).json({
        error: "Registration number is required.",
      });
    }

    const { rows } = await pool.query(
      `SELECT registration_number, owner_name, vehicle_class,
              maker_model, fitness_valid_till,
              insurance_valid_till, puc_valid_till
       FROM vehicles
       WHERE registration_number = $1`,
      [registration_number.trim().toUpperCase()]
    );

    if (!rows[0]) {
      return res.status(404).json({
        error: "No record found for this registration number.",
      });
    }

    res.json({ vehicle: rows[0] });
  } catch (err) {
    next(err);
  }
});

// POST /api/vehicles/apply/:slug
// Submit a dummy application for any vehicle-related service
router.post("/apply/:slug", requireAuth, async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { serviceName, registration_number } = req.body;

    const name = registration_number
      ? `${serviceName || slug} — ${registration_number}`
      : serviceName || slug;

    const { rows } = await pool.query(
      `INSERT INTO applications
       (user_id, service_slug, service_name, status)
       VALUES ($1, $2, $3, 'SUBMITTED')
       RETURNING id`,
      [req.user.id, slug, name]
    );

    res.status(201).json({
      message:
        "Application submitted successfully (dummy data — no real vehicle action is performed).",
      applicationId: rows[0].id,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
