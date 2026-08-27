/**
 * backend/routes/vehicleLookup.js
 *
 * Port of the Python/Selenium scraper (Cars.ipynb) to Node/Puppeteer.
 *
 * carinfo.app is a Next.js site — the vehicle data isn't in the raw HTML,
 * it's fetched client-side and painted in by React. So like the notebook,
 * we run a real (headless) browser, wait for the fields to render, then
 * read the plain text off the page.
 *
 * DEPLOYMENT: Vercel serverless functions — uses puppeteer-core +
 * @sparticuz/chromium (a Chromium build sized to fit the function bundle).
 *   npm install puppeteer-core @sparticuz/chromium
 *
 * vercel.json also needs a longer timeout/more memory for this route —
 * see the note shared alongside this file. Requires a Pro plan if you're
 * currently on Hobby (10s / low memory won't be enough for a real browser
 * launch + page render).
 *
 * LEGAL/PRIVACY NOTE:
 * carinfo.app's ToS may restrict automated scraping — check before running
 * this in production, and keep doing what your notebook already did:
 * never surface the owner's name. Only expose make/model, RTO, and state.
 */

import express from "express";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

const router = express.Router();

const BASE_URL =
  "https://www.carinfo.app/rto-vehicle-registration-detail/rto-details/";

// Basic Indian plate format check before we ever launch a browser
const PLATE_REGEX = /^[A-Z]{2}\d{1,2}[A-Z]{0,3}\d{4}$/;

function extractField(text, label, nextLabel) {
  const pattern = new RegExp(
    `${escapeRegex(label)}\\s*\\n\\s*(.+?)\\s*\\n\\s*${escapeRegex(nextLabel)}`,
    "s"
  );
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function launchBrowser() {
  return puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    defaultViewport: { width: 1920, height: 1080 },
  });
}

async function scrapeVehicleDetails(regNumber) {
  const url = `${BASE_URL}${regNumber}`;
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

    // Wait until the "Make & Model" label has actually rendered
    await page.waitForFunction(
      () => document.body.innerText.includes("Make & Model"),
      { timeout: 20000 }
    );

    // Give React a brief extra moment to finish painting all fields
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const pageText = await page.evaluate(() => document.body.innerText);

    return {
      registration_number: regNumber,
      make_model: extractField(pageText, "Make & Model", "Owner Name"),
      // owner_name intentionally never extracted/returned — privacy
      state: extractField(pageText, "State", "RTO Phone number"),
      rto_office: extractField(pageText, "Registered RTO", "State"),
      // rto_phone intentionally omitted from the public response too;
      // uncomment if you have a legitimate reason to expose it:
      // rto_phone: extractField(pageText, "RTO Phone number", "Website"),
    };
  } finally {
    await browser.close();
  }
}

/**
 * GET /api/vehicle-lookup/:regNumber
 */
router.get("/:regNumber", async (req, res) => {
  const regNumber = (req.params.regNumber || "").toUpperCase().trim();

  if (!PLATE_REGEX.test(regNumber)) {
    return res.status(400).json({ error: "Enter a valid registration number." });
  }

  try {
    const details = await scrapeVehicleDetails(regNumber);

    if (!details.make_model) {
      return res
        .status(404)
        .json({ error: "No record found for that registration number." });
    }

    res.json({ vehicle: details });
  } catch (err) {
    console.error("Vehicle lookup failed:", err.message);
    res
      .status(502)
      .json({ error: "Couldn't fetch vehicle details right now. Try again." });
  }
});

export default router;