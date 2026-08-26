import { useEffect, useRef, useState } from "react";

/**
 * TrafficAnimation
 * A decorative strip showing a stream of traffic — 3 variants each of
 * bus and car — driving left -> right along a road, obeying a traffic
 * light near the left third of the track (queue up + stop on
 * red/yellow, go on green).
 *
 * Drop <TrafficAnimation /> anywhere — no props required.
 * Pure CSS shapes + requestAnimationFrame, no external assets.
 */

const VEHICLES = [
  // --- buses ---
  { id: "bus-city",   type: "bus", variant: "city",   width: 108, height: 46, speed: 56, color: "#128807", accent: "#0d6b05", start: -80 },
  { id: "bus-school", type: "bus", variant: "school", width: 104, height: 44, speed: 60, color: "#facc15", accent: "#b45309", start: -260 },
  { id: "bus-double", type: "bus", variant: "double", width: 100, height: 54, speed: 50, color: "#dc2626", accent: "#7f1d1d", start: -440 },

  // --- cars ---
  { id: "car-sedan",  type: "car", variant: "sedan",  width: 66, height: 28, speed: 80,  color: "#FF9933", accent: "#e2851a", start: -620 },
  { id: "car-taxi",   type: "car", variant: "taxi",   width: 64, height: 27, speed: 86,  color: "#fde047", accent: "#111827", start: -740 },
  { id: "car-sport",  type: "car", variant: "sport",  width: 68, height: 24, speed: 100, color: "#e11d48", accent: "#7f1d1d", start: -860 },
];

const GAP = 14; // min gap between queued vehicles (px)
const STOP_LINE_PCT = 0.36; // where the signal sits, as a fraction of track width

export default function TrafficAnimation() {
  const containerRef = useRef(null);
  const vehicleRefs = useRef([]);
  const posRef = useRef(VEHICLES.map((v) => v.start));
  const widthRef = useRef(1000);
  const lightRef = useRef("green");
  const [light, setLight] = useState("green");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) widthRef.current = containerRef.current.offsetWidth;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Traffic light cycle: green -> yellow -> red -> green ...
  // Longer phases so a full cycle (and the resulting queue/release) plays out
  // more slowly, giving the whole strip a longer, more relaxed loop.
  useEffect(() => {
    if (reduceMotion) return;
    let timeout;
    const cycle = (color) => {
      lightRef.current = color;
      setLight(color);
      const duration = color === "green" ? 6000 : color === "yellow" ? 1100 : 5200;
      const next = color === "green" ? "yellow" : color === "yellow" ? "red" : "green";
      timeout = setTimeout(() => cycle(next), duration);
    };
    cycle("green");
    return () => clearTimeout(timeout);
  }, [reduceMotion]);

  // Motion loop — mutates DOM transforms directly via refs (no re-render per frame)
  useEffect(() => {
    if (reduceMotion) return;
    let raf;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const w = widthRef.current;
      const stopLine = w * STOP_LINE_PCT - 8;

      // Process most-advanced vehicle first so a queue forms behind it.
      const order = VEHICLES.map((_, i) => i).sort((a, b) => posRef.current[b] - posRef.current[a]);

      order.forEach((idx, orderPos) => {
        const v = VEHICLES[idx];
        let x = posRef.current[idx];
        let desired = x + v.speed * dt;

        if (orderPos > 0) {
          const aheadIdx = order[orderPos - 1];
          const maxBehindAhead = posRef.current[aheadIdx] - VEHICLES[aheadIdx].width - GAP;
          if (desired > maxBehindAhead) desired = maxBehindAhead;
        }

        const nose = x + v.width;
        if (lightRef.current !== "green" && nose <= stopLine + 4) {
          const maxAtLine = stopLine - v.width;
          if (desired > maxAtLine) desired = maxAtLine;
        }

        if (desired > w + 20) {
          desired = -v.width - 200 - Math.random() * 800;
        }

        posRef.current[idx] = desired;
        const el = vehicleRefs.current[idx];
        if (el) el.style.transform = `translateX(${desired}px)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
      style={{ background: "linear-gradient(180deg, #eaf2fb 0%, #dbe7f5 55%, #c9d8ea 100%)" }}
    >
      <div className="absolute left-8 top-5 w-16 h-6 rounded-full bg-white opacity-70" />
      <div className="absolute right-16 top-8 w-24 h-7 rounded-full bg-white opacity-60" />

      {/* road */}
      <div className="absolute bottom-0 left-0 w-full h-16" style={{ background: "#334155" }}>
        <div
          className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, #fbbf24 0px, #fbbf24 26px, transparent 26px, transparent 50px)",
          }}
        />
      </div>

      {/* traffic light */}
      <div className="absolute bottom-16 flex flex-col items-center" style={{ left: `${STOP_LINE_PCT * 100}%` }}>
        <div className="w-1 h-14" style={{ background: "#64748b" }} />
        <div className="w-6 rounded-md p-1 flex flex-col gap-1 items-center" style={{ background: "#1e293b" }}>
          <span
            className="block w-3.5 h-3.5 rounded-full"
            style={{
              background: light === "red" ? "#ef4444" : "#7f1d1d",
              boxShadow: light === "red" ? "0 0 8px 2px rgba(239,68,68,0.85)" : "none",
            }}
          />
          <span
            className="block w-3.5 h-3.5 rounded-full"
            style={{
              background: light === "yellow" ? "#facc15" : "#78350f",
              boxShadow: light === "yellow" ? "0 0 8px 2px rgba(250,204,21,0.85)" : "none",
            }}
          />
          <span
            className="block w-3.5 h-3.5 rounded-full"
            style={{
              background: light === "green" ? "#22c55e" : "#14532d",
              boxShadow: light === "green" ? "0 0 8px 2px rgba(34,197,94,0.85)" : "none",
            }}
          />
        </div>
      </div>

      {/* vehicles */}
      {VEHICLES.map((v, i) => (
        <div
          key={v.id}
          ref={(el) => (vehicleRefs.current[i] = el)}
          className="absolute"
          style={{
            bottom: 16,
            left: 0,
            transform: `translateX(${v.start}px)`,
            willChange: "transform",
          }}
        >
          <Vehicle type={v.type} variant={v.variant} width={v.width} height={v.height} color={v.color} accent={v.accent} />
        </div>
      ))}

      {reduceMotion && (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 bg-white/70">
          Motion paused (reduced motion enabled)
        </div>
      )}
    </div>
  );
}

function Vehicle({ type, variant, width, height, color, accent }) {
  const wheel = (leftPct) => (
    <span
      className="absolute rounded-full"
      style={{
        width: height * 0.4,
        height: height * 0.4,
        bottom: -height * 0.15,
        left: `${leftPct}%`,
        background: "#0f172a",
        border: "2px solid #94a3b8",
      }}
    />
  );

  // ---------------- car ----------------
  if (type === "car") {
    return (
      <div className="relative" style={{ width, height }}>
        <div className="absolute rounded-md" style={{ bottom: 8, left: 0, right: 0, height: 12, background: color }} />
        <div className="absolute rounded-t-lg" style={{ bottom: 16, left: 12, right: 12, height: 12, background: accent }} />
        <div className="absolute rounded-t-md" style={{ bottom: 16, left: 16, right: 32, height: 8, background: "#e0f2fe" }} />
        {variant === "taxi" && (
          <>
            <div className="absolute" style={{ bottom: 12, left: 8, right: 8, height: 3, background: "#111827" }} />
            <div className="absolute rounded-sm" style={{ bottom: 22, left: "50%", transform: "translateX(-50%)", width: 10, height: 4, background: "#111827" }} />
          </>
        )}
        {variant === "sport" && (
          <div className="absolute rounded-sm" style={{ bottom: 18, right: -2, width: 6, height: 8, background: accent }} />
        )}
        {wheel(8)}
        {wheel(68)}
      </div>
    );
  }

  // ---------------- bus ----------------
  if (type === "bus") {
    return (
      <div className="relative" style={{ width, height }}>
        <div className="absolute rounded-md" style={{ bottom: 4, left: 0, right: 0, height: height * 0.75, background: color }} />
        {variant === "double" && (
          <div className="absolute rounded-t-md" style={{ bottom: height * 0.62, left: 2, right: 2, height: height * 0.34, background: accent }} />
        )}
        {variant === "school" && (
          <div className="absolute" style={{ bottom: height * 0.28, left: 4, right: 4, height: 4, background: "#111827" }} />
        )}
        <div className="absolute flex gap-1" style={{ bottom: height * 0.32, left: 8, right: 8 }}>
          {[0, 1, 2, 3].map((n) => (
            <span key={n} style={{ height: 12, width: 16, borderRadius: 2, background: "#e0f2fe" }} />
          ))}
        </div>
        {variant === "double" && (
          <div className="absolute flex gap-1" style={{ bottom: height * 0.68, left: 8, right: 8 }}>
            {[0, 1, 2, 3].map((n) => (
              <span key={n} style={{ height: 10, width: 16, borderRadius: 2, background: "#e0f2fe" }} />
            ))}
          </div>
        )}
        {wheel(10)}
        {wheel(76)}
      </div>
    );
  }
}
