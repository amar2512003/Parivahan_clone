import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/connection.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// POST /api/auth/login  (dummy credentials only - hackathon use)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, full_name: user.full_name },
    process.env.JWT_SECRET || "hackathon-dummy-secret-change-me",
    { expiresIn: "2h" }
  );

  res.json({
    token,
    user: { id: user.id, username: user.username, full_name: user.full_name, mobile: user.mobile },
  });
});

// GET /api/auth/me
router.get("/me", requireAuth, (req, res) => {
  const user = db
    .prepare("SELECT id, full_name, username, mobile FROM users WHERE id = ?")
    .get(req.user.id);
  res.json({ user });
});

export default router;
