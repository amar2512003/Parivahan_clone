import { useEffect, useRef, useState } from "react";

/**
 * TrafficAnimation
 * A genuine dot-matrix LED bus-destination-board: every letter and
 * icon is drawn dot-by-dot on a <canvas>, exactly like a real
 * amber LED sign, scrolling continuously right -> left through six
 * road-safety rules with simple pixel-icon glyphs.
 *
 * Drop <TrafficAnimation /> anywhere — no props required.
 */

// ---------- 5x7 dot-matrix font (uppercase, space, hyphen) ----------
const F = (rows) => rows.map((r) => r.split("").map((c) => (c === "#" ? 1 : 0)));

const CHARS = {
  A: F([".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"]),
  B: F(["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."]),
  C: F([".####", "#....", "#....", "#....", "#....", "#....", ".####"]),
  D: F(["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."]),
  E: F(["#####", "#....", "#....", "####.", "#....", "#....", "#####"]),
  F: F(["#####", "#....", "#....", "####.", "#....", "#....", "#...."]),
  G: F([".####", "#....", "#....", "#.###", "#...#", "#...#", ".####"]),
  H: F(["#...#", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"]),
  I: F(["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"]),
  J: F(["..###", "...#.", "...#.", "...#.", "...#.", "#..#.", ".##.."]),
  K: F(["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"]),
  L: F(["#....", "#....", "#....", "#....", "#....", "#....", "#####"]),
  M: F(["#...#", "##.##", "#.#.#", "#...#", "#...#", "#...#", "#...#"]),
  N: F(["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"]),
  O: F([".###.", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."]),
  P: F(["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."]),
  Q: F([".###.", "#...#", "#...#", "#...#", "#.#.#", "#..#.", ".##.#"]),
  R: F(["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"]),
  S: F([".####", "#....", "#....", ".###.", "....#", "....#", "####."]),
  T: F(["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."]),
  U: F(["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."]),
  V: F(["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."]),
  W: F(["#...#", "#...#", "#...#", "#.#.#", "#.#.#", "#.#.#", ".#.#."]),
  X: F(["#...#", "#...#", ".#.#.", "..#..", ".#.#.", "#...#", "#...#"]),
  Y: F(["#...#", "#...#", ".#.#.", "..#..", "..#..", "..#..", "..#.."]),
  Z: F(["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"]),
  " ": F([".", ".", ".", ".", ".", ".", "."]),
  "-": F([".....", ".....", ".....", "#####", ".....", ".....", "....."]),
};

// ---------- 7x7 pixel icon glyphs ----------
const ICONS = {
  no: F([".#####.", "#.....#", "#....#.", "#...#..", "#..#...", "#.#....", ".#####."]),
  speed: F([".#####.", "#....##", "#...#.#", "#..#..#", "#.#...#", "#.....#", ".#####."]),
  phone: F(["..###..", ".#...#.", ".#.#.#.", ".#..#..", ".#.#.#.", ".#...#.", "..###.."]),
  belt: F(["..###..", ".#####.", "#.#.#.#", "#######", "..#.#..", "..#.#..", "..###.."]),
  arrow: F(["..#....", ".##....", "######.", ".##....", "..#....", ".......", "......."]),
  cross: F([".......", "...#...", "...#...", ".#####.", "...#...", "...#...", "......."]),
  sep: F([".......", "...#...", "..###..", ".#####.", "..###..", "...#...", "......."]),
};

const RULES = [
  { icon: "no", text: "DO NOT DRINK AND DRIVE" },
  { icon: "speed", text: "ALWAYS DRIVE WITHIN THE SPEED LIMIT" },
  { icon: "phone", text: "DO NOT USE MOBILE PHONES WHILE DRIVING" },
  { icon: "belt", text: "WEAR SEATBELTS - HELMETS ON TWO-WHEELERS" },
  { icon: "arrow", text: "USE INDICATORS BEFORE CHANGING LANES" },
  { icon: "cross", text: "MOVE ASIDE IMMEDIATELY FOR AMBULANCES" },
  { icon: null, text: "BUILD WHAT MOVES INDIA" },
];

// Build one long bitmap (7 rows tall) for the full looping message
function buildMatrix() {
  const rows = [[], [], [], [], [], [], []];
  const pushGlyph = (glyph) => {
    const w = glyph[0].length;
    for (let r = 0; r < 7; r++) rows[r].push(...glyph[r]);
    for (let r = 0; r < 7; r++) rows[r].push(0); // 1-col gap
    return w + 1;
  };

  RULES.forEach((rule) => {
    if (rule.icon) {
      pushGlyph(ICONS[rule.icon]);
      pushGlyph(CHARS[" "]);
    }
    for (const ch of rule.text) pushGlyph(CHARS[ch] || CHARS[" "]);
    pushGlyph(CHARS[" "]);
    pushGlyph(ICONS.sep);
    pushGlyph(CHARS[" "]);
  });

  return rows; // rows[r] is an array of 0/1, all same length = totalCols
}

const MATRIX = buildMatrix();
const TOTAL_COLS = MATRIX[0].length;
const PITCH = 6; // px between dot centers
const DOT_RADIUS = 2;
const COLS_PER_SEC = 32;

export default function TrafficAnimation() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    let cssWidth = 0;
    let colsAcross = 0;

    const resize = () => {
      cssWidth = container.clientWidth;
      const cssHeight = PITCH * 7 + PITCH;
      colsAcross = Math.ceil(cssWidth / PITCH) + 1;
      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawFrame = (startCol) => {
      const w = cssWidth;
      const h = PITCH * 7 + PITCH;
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      const baseCol = Math.floor(startCol);
      for (let x = 0; x < colsAcross; x++) {
        const col = (baseCol + x) % TOTAL_COLS;
        for (let row = 0; row < 7; row++) {
          const on = MATRIX[row][col] === 1;
          const cx = x * PITCH + PITCH / 2 + PITCH / 2;
          const cy = row * PITCH + PITCH / 2 + PITCH / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, DOT_RADIUS, 0, Math.PI * 2);
          if (on) {
            ctx.fillStyle = "#ffb800";
            ctx.shadowColor = "rgba(255,184,0,0.85)";
            ctx.shadowBlur = 3;
          } else {
            ctx.fillStyle = "rgba(255,255,255,0.05)";
            ctx.shadowBlur = 0;
          }
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
    };

    if (reduceMotion) {
      drawFrame(0);
      return () => window.removeEventListener("resize", resize);
    }

    let raf;
    let last = performance.now();
    let col = 0;
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      col = (col + COLS_PER_SEC * dt) % TOTAL_COLS;
      drawFrame(col);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-md border-4 overflow-hidden"
      style={{
        background: "#050505",
        borderColor: "#1a1a1a",
        boxShadow: "inset 0 0 18px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.4)",
      }}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}