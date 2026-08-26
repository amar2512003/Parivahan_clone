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
    return res.status(400).json({ error: "Registration number is required." });
  }

  const vehicle = db
    .prepare(
      "SELECT registration_number, owner_name, vehicle_class, maker_model, fitness_valid_till, insurance_valid_till, puc_valid_till FROM vehicles WHERE registration_number = ?"
    )
    .get(registration_number.trim().toUpperCase());

  if (!vehicle) {
    return res.status(404).json({ error: "No record found for this registration number." });
  }
  res.json({ vehicle });
});

export default router;
