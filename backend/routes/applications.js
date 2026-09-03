import { Router } from "express";
import pool from "../db/connection.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/mine", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM applications WHERE user_id = $1 ORDER BY submitted_at DESC",
      [req.user.id]
    );
    res.json({ applications: rows });
  } catch (err) {
    next(err);
  }
});

export default router;
