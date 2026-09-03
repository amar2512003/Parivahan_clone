import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db/connection.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function signToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, full_name: user.full_name },
    process.env.JWT_SECRET || "hackathon-dummy-secret-change-me",
    { expiresIn: "2h" }
  );
}

// POST /api/auth/signup  (dummy accounts - hackathon use)
router.post("/signup", async (req, res, next) => {
  try {
    const { full_name, mobile, username, password } = req.body;

    if (!full_name || !mobile || !username || !password) {
      return res.status(400).json({
        error: "Full name, mobile, username, and password are all required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    if (!/^\d{10}$/.test(mobile.trim())) {
      return res.status(400).json({ error: "Enter a valid 10-digit mobile number." });
    }

    // Usernames are stored lowercase/trimmed so login isn't case- or
    // whitespace-sensitive (mobile keyboards often auto-capitalize the
    // first letter, and autofill can leave trailing spaces).
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedMobile = mobile.trim();

    const { rows: existingRows } = await pool.query(
      "SELECT id FROM users WHERE username = $1 OR mobile = $2",
      [normalizedUsername, normalizedMobile]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({ error: "An account with this username or mobile number already exists." });
    }

    const password_hash = bcrypt.hashSync(password, 10);

    const { rows } = await pool.query(
      `INSERT INTO users (full_name, mobile, username, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [full_name.trim(), normalizedMobile, normalizedUsername, password_hash]
    );

    const user = {
      id: rows[0].id,
      username: normalizedUsername,
      full_name: full_name.trim(),
      mobile: normalizedMobile,
    };

    const token = signToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login  (dummy credentials only - hackathon use)
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const normalizedUsername = username.trim().toLowerCase();

    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [normalizedUsername]);
    const user = rows[0];

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = signToken(user);

    res.json({
      token,
      user: { id: user.id, username: user.username, full_name: user.full_name, mobile: user.mobile },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, full_name, username, mobile FROM users WHERE id = $1",
      [req.user.id]
    );
    res.json({ user: rows[0] });
  } catch (err) {
    next(err);
  }
});

export default router;
