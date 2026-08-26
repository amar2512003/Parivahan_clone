import { Router } from "express";
import db from "../db/connection.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/mine", requireAuth, (req, res) => {
  const apps = db
    .prepare("SELECT * FROM applications WHERE user_id = ? ORDER BY submitted_at DESC")
    .all(req.user.id);
  res.json({ applications: apps });
});

export default router;
