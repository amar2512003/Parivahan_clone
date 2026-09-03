import { Router } from "express";
import pool from "../db/connection.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/dl/mine - the logged-in user's driving licence record (dummy data)
router.get("/mine", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM driving_licenses WHERE user_id = $1",
      [req.user.id]
    );

    if (!rows[0]) {
      return res.status(404).json({ error: "No driving licence found for this account." });
    }
    res.json({ license: rows[0] });
  } catch (err) {
    next(err);
  }
});

// POST /api/dl/lookup - public "know your licence" style lookup by DL number
router.post("/lookup", async (req, res, next) => {
  try {
    const { dl_number } = req.body;
    if (!dl_number) {
      return res.status(400).json({ error: "Driving licence number is required." });
    }

    const { rows } = await pool.query(
      `SELECT dl_number, holder_name, status, valid_till, vehicle_classes
       FROM driving_licenses WHERE dl_number = $1`,
      [dl_number.trim()]
    );

    if (!rows[0]) {
      return res.status(404).json({ error: "No record found for this licence number." });
    }
    res.json({ license: rows[0] });
  } catch (err) {
    next(err);
  }
});

// POST /api/dl/apply/:slug - submit a dummy application for any DL-related service
router.post("/apply/:slug", requireAuth, async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { serviceName } = req.body;

    const { rows } = await pool.query(
      `INSERT INTO applications (user_id, service_slug, service_name, status)
       VALUES ($1, $2, $3, 'SUBMITTED')
       RETURNING id`,
      [req.user.id, slug, serviceName || slug]
    );

    res.status(201).json({
      message: "Application submitted successfully (dummy data — no real DL is issued).",
      applicationId: rows[0].id,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
