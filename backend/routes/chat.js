import { Router } from "express";

const router = Router();

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
// llama-3.3-70b-versatile was decommissioned by Groq on Aug 16, 2026.
// gpt-oss-120b is Groq's recommended replacement — fast, strong quality,
// and (like the old default) overridable via GROQ_MODEL without touching
// this file.
const DEFAULT_MODEL = "openai/gpt-oss-120b";

// Keep only the last few turns — enough context for a follow-up question,
// small enough to keep cost/latency predictable for a demo widget.
const MAX_HISTORY_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;

const SYSTEM_PROMPT = `You are the in-app help assistant for "Parivahan Sewa (Reimagined)" — a
hackathon clone of India's Parivahan vehicle/licence portal. Everything on
this site is DEMO DATA: no real government records, no real payments, no
real DL/RC is ever issued. Always be upfront about that if someone asks
whether something is real.

You help visitors find their way around the site's services:
- Driving Licence: learner's licence, DL renewal, duplicate licence,
  international driving permit, addition of vehicle class, know-your-licence
  lookup.
- Vehicle Registration: new registration, RC renewal, transfer of ownership,
  change of address, duplicate RC, know-your-vehicle lookup.
- Online Services: eChallan, PUCC (pollution certificate), permit-related
  services, vehicle fitness testing, checkpost tax, national permit
  authorization, vehicle scrapping, fancy number booking.
- A demo payment/checkout flow (UPI, card, netbanking) used by these
  services — it is a fully fake gateway, no money moves.
- Login / Sign Up for a personal dashboard showing a demo DL and vehicle.

Answer concisely (2–4 sentences unless the person clearly wants more detail
or asked for a step-by-step). Reply in the same language the user writes in
(English or Hindi) — if they haven't given you any signal, reply in the
language noted below. If asked something unrelated to this site or to
Indian vehicle/licence topics in general, answer briefly and steer back to
how you can help here. Never invent a licence/vehicle/application status —
you have no access to the database; point the person to the relevant page
or their dashboard instead.`;

function buildMessages({ message, history, lang }) {
  const trimmedHistory = Array.isArray(history)
    ? history.slice(-MAX_HISTORY_MESSAGES).filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string"
      )
    : [];

  return [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}\n\nPreferred reply language if the user gives no signal: ${
        lang === "hi" ? "Hindi" : "English"
      }.`,
    },
    ...trimmedHistory.map((m) => ({
      role: m.role,
      content: m.content.slice(0, MAX_MESSAGE_LENGTH),
    })),
    { role: "user", content: message },
  ];
}

// POST /api/chat
router.post("/", async (req, res, next) => {
  try {
    const { message, history, lang } = req.body || {};

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters).`,
      });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      // Not a server error — the operator just hasn't added a key yet.
      // 503 lets the frontend show a friendly "not configured" bubble
      // instead of a generic failure.
      return res.status(503).json({
        error: "not_configured",
        message:
          "The chat assistant isn't configured yet. Add GROQ_API_KEY to backend/.env to enable it.",
      });
    }

    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || DEFAULT_MODEL,
        messages: buildMessages({
          message: message.trim(),
          history,
          lang: lang === "hi" ? "hi" : "en",
        }),
        temperature: 0.4,
        max_tokens: 400,
      }),
    });

    if (!groqRes.ok) {
      const detail = await groqRes.text().catch(() => "");
      console.error("Groq API error:", groqRes.status, detail);
      return res.status(502).json({
        error: "upstream_error",
        message: "The chat assistant is temporarily unavailable. Please try again.",
      });
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({
        error: "upstream_error",
        message: "The chat assistant is temporarily unavailable. Please try again.",
      });
    }

    res.json({ reply });
  } catch (err) {
    next(err);
  }
});

export default router;