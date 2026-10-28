"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Wave } from "./Wave";

/* Farm Minerals pins a scrubbed video of a tablet dropping into water.
   Ours is drawn: loose granules gather into one Bio Growth+ granule, it
   drops into a flooded paddy, dissolves into the soil, and a seedling
   comes up through the water with the logo's plus on top.

   Scroll writes a handful of phase values (0–1) onto the stage as
   custom properties; every shape below works out its own transform and
   opacity from them with calc(), so nothing re-renders while scrolling. */

const X = 960; // the plant's column, in viewBox units
const START = 236; // where the granule forms
const SURFACE = 384;
const SOIL = 624;
const SEED = 690;
const TIP = 232;

const STEPS = [
  {
    title: "One granule",
    body: "Living cultures, organic carbon and nutrients, packed into a single Bio Growth+ granule.",
  },
  {
    title: "Meets the water",
    body: "Irrigation or the first rain wets it through, and the granule starts to break down in the field.",
  },
  {
    title: "Feeds the soil",
    body: "Microbes and nutrients work down into the root zone — where the crop can actually reach them.",
  },
  {
    title: "Roots, then shoots",
    body: "A deeper root system first, then a crop that stands up strong and green.",
  },
];

/* Deterministic scatter, so the server and client draw the same field. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const r = rng(7);
const round = (v: number) => Math.round(v * 10) / 10;

const SPECKS = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 + r() * 0.4;
  const d = 90 + r() * 120;
  return { dx: round(Math.cos(a) * d), dy: round(Math.sin(a) * d * 0.7), size: round(5 + r() * 9) };
});
const DROPS = Array.from({ length: 10 }, (_, i) => {
  const side = i % 2 ? 1 : -1;
  const vy = 110 + r() * 130;
  return { dx: round(side * (30 + r() * 150)), vy: round(vy), g: round(vy * 1.15), size: round(3 + r() * 4) };
});
const BUBBLES = Array.from({ length: 13 }, () => ({
  dx: round(-46 + r() * 92),
  depth: round(40 + r() * 170),
  delay: round(r() * 0.55),
  size: round(2.5 + r() * 4.5),
}));
const NUTRIENTS = Array.from({ length: 28 }, (_, i) => ({
  tx: round(-240 + r() * 480),
  ty: round(60 + r() * 190),
  size: round(2.5 + r() * 3.5),
  fill: i % 3 ? "#f4d28f" : "#b6e06a",
}));
const STONES = Array.from({ length: 70 }, () => ({
  x: round(-200 + r() * 2400),
  y: round(SOIL + 18 + r() * 260),
  rx: round(4 + r() * 12),
  fill: r() > 0.5 ? "#5a3a20" : "#2f1d10",
}));
const ROOTS = [
  { d: `M${X},${SEED} C${X - 8},${SEED + 40} ${X - 40},${SEED + 70} ${X - 70},${SEED + 130}`, delay: 0 },
  { d: `M${X},${SEED} C${X + 6},${SEED + 50} ${X + 30},${SEED + 90} ${X + 64},${SEED + 140}`, delay: 0.05 },
  { d: `M${X},${SEED} C${X - 2},${SEED + 60} ${X + 4},${SEED + 110} ${X - 6},${SEED + 175}`, delay: 0.1 },
  { d: `M${X - 30},${SEED + 52} C${X - 60},${SEED + 64} ${X - 96},${SEED + 70} ${X - 132},${SEED + 96}`, delay: 0.35 },
  { d: `M${X + 26},${SEED + 56} C${X + 60},${SEED + 70} ${X + 92},${SEED + 82} ${X + 126},${SEED + 112}`, delay: 0.4 },
  { d: `M${X - 2},${SEED + 110} C${X - 26},${SEED + 126} ${X - 44},${SEED + 140} ${X - 60},${SEED + 168}`, delay: 0.55 },
  { d: `M${X + 2},${SEED + 120} C${X + 24},${SEED + 134} ${X + 38},${SEED + 150} ${X + 50},${SEED + 176}`, delay: 0.6 },
];
/** Blades along the stem: where they join, which way they lean, how long. */
const LEAVES = [
  { y: 404, side: -1, rot: 18, len: 1.15 },
  { y: 378, side: 1, rot: 10, len: 1.1 },
  { y: 336, side: -1, rot: -4, len: 1 },
  { y: 306, side: 1, rot: -10, len: 0.95 },
  { y: 270, side: -1, rot: -26, len: 0.72 },
  { y: 254, side: 1, rot: -32, len: 0.66 },
];
/** Blades straight off the base, so the crop reads as a paddy clump. */
const BLADES = [
  { dx: 6, side: 1, rot: -52, len: 2.1, at: 0.3 },
  { dx: -6, side: -1, rot: -50, len: 2.2, at: 0.34 },
  { dx: 10, side: 1, rot: -28, len: 1.7, at: 0.42 },
  { dx: -10, side: -1, rot: -26, len: 1.6, at: 0.46 },
];
const LEAF = "M0,0 C34,-24 96,-50 176,-66 C108,-28 50,-6 0,0 Z";
const LEAF_RIB = "M4,-2 C50,-22 110,-44 170,-63";
const STEM = `M${X},${SEED} C${X - 4},${SEED - 90} ${X + 6},${SEED - 170} ${X},${SEED - 250} C${X - 6},${SEED - 330} ${X + 4},${SEED - 390} ${X},${TIP}`;
const STEM_LEN = SEED - TIP;
const SWELL = "M-600,0 q50,-7 100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0 t100,0";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeIn = (t: number) => t * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const backOut = (t: number) => 1 + 2.7 * (t - 1) ** 3 + 1.7 * (t - 1) ** 2;

/** Every phase, from overall progress through the pinned section. */
function phases(p: number) {
  const t = seg(p, 0.27, 0.4);
  return {
    "--p": p,
    "--a": easeOut(seg(p, 0.02, 0.17)), // granules gather
    "--b": easeIn(seg(p, 0.18, 0.27)), // the drop
    "--t": t, // splash flight
    "--t2": t * t,
    "--c": seg(p, 0.27, 0.5), // ripples
    "--d": easeOut(seg(p, 0.28, 0.46)), // sinks and dissolves
    "--w": seg(p, 0.28, 0.56), // bubbles
    "--n": easeOut(seg(p, 0.36, 0.6)), // nutrients spread
    "--r": easeOut(seg(p, 0.48, 0.68)), // roots
    "--s": easeInOut(seg(p, 0.56, 0.86)), // stem
    "--x": backOut(seg(p, 0.86, 0.95)), // the plus
  };
}
const stepAt = (p: number) => (p < 0.26 ? 0 : p < 0.47 ? 1 : p < 0.66 ? 2 : 3);

type Vars = CSSProperties & Record<`--${string}`, string | number>;

export function Grow() {
  const stage = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onMq = () => setNarrow(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    const el = stage.current;
    const sec = section.current;
    if (!el || !sec) return;

    const paint = (p: number) => {
      for (const [k, v] of Object.entries(phases(p))) {
        el.style.setProperty(k, v.toFixed(4));
      }
      el.dataset.step = String(stepAt(p));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      paint(1);
      el.dataset.step = "all";
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const box = sec.getBoundingClientRect();
      if (box.bottom < -200 || box.top > window.innerHeight + 200) return;
      // how far the stage stays pinned: the section, less the wave strip
      // under it and the stage's own height
      const pad = parseFloat(getComputedStyle(sec).paddingBottom) || 0;
      const travel = Math.max(1, sec.offsetHeight - pad - el.offsetHeight);
      paint(clamp01(-box.top / travel));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={section} id="how" className="grow" aria-labelledby="grow-title">
      <div ref={stage} className="grow-stage" data-step="0" style={phases(0) as Vars}>
        <svg
          className="absolute inset-0 w-full h-full"
          // framed on the plant: right of centre on desktop, with the copy to
          // its left; on phones the copy sits over extra sky above
          viewBox={narrow ? `${X - 400} -150 800 1050` : `${X - 705} 150 1216 760`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0e2010" />
              <stop offset="1" stopColor="#21431a" />
            </linearGradient>
            <linearGradient id="g-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8dc63f" stopOpacity="0.32" />
              <stop offset="1" stopColor="#2b6410" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="g-soil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4a2f18" />
              <stop offset="1" stopColor="#2a1b10" />
            </linearGradient>
            <linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#2f6b0a" />
              <stop offset="0.6" stopColor="#5aa912" />
              <stop offset="1" stopColor="#8dc63f" />
            </linearGradient>
            <radialGradient id="g-glow">
              <stop offset="0" stopColor="#f4d28f" stopOpacity="0.5" />
              <stop offset="0.45" stopColor="#f4d28f" stopOpacity="0.2" />
              <stop offset="1" stopColor="#f4d28f" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g-granule" cx="0.35" cy="0.3" r="0.8">
              <stop offset="0" stopColor="#7d5532" />
              <stop offset="1" stopColor="#3f2512" />
            </radialGradient>
            <filter id="f-cloud" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="26" />
            </filter>
          </defs>

          {/* sky, water body, soil — wide enough for any crop of the slice */}
          <rect x="-1200" y="-200" width="3840" height={SURFACE + 200} fill="url(#g-sky)" />
          <rect x="-1200" y={SURFACE} width="3840" height={SOIL - SURFACE} fill="#173513" />
          <rect x="-1200" y={SOIL} width="3840" height={1400 - SOIL} fill="url(#g-soil)" />
          <path
            d={`M-1200,${SOIL + 6} Q-600,${SOIL - 10} 0,${SOIL + 4} T1200,${SOIL} T2640,${SOIL + 6} V${SOIL + 40} H-1200 Z`}
            fill="#5a3a20"
            opacity="0.7"
          />
          {STONES.map((s, i) => (
            <ellipse key={i} cx={s.x} cy={s.y} rx={s.rx} ry={s.rx * 0.62} fill={s.fill} opacity="0.75" />
          ))}

          {/* the warm light the plant grows into */}
          <circle
            cx={X}
            cy={300}
            r={400}
            fill="url(#g-glow)"
            style={{ opacity: "calc(var(--s) * 0.35 + var(--x) * 0.45)" }}
          />

          {/* nutrient cloud, then specks settling into the root zone */}
          <g transform={`translate(${X} ${SURFACE + 186})`}>
            {[
              { r: 90, fill: "#8dc63f", dx: -40 },
              { r: 120, fill: "#f4d28f", dx: 30 },
              { r: 70, fill: "#b6e06a", dx: 0 },
            ].map((c, i) => (
              <circle
                key={i}
                cx={c.dx}
                r={c.r}
                fill={c.fill}
                filter="url(#f-cloud)"
                style={{
                  transform: `translateY(calc(var(--n) * ${80 + i * 20}px)) scale(calc(0.15 + var(--n) * 1.1))`,
                  opacity: "calc(var(--n) * (0.3 - var(--s) * 0.16))",
                }}
              />
            ))}
            {NUTRIENTS.map((n, i) => (
              <circle
                key={i}
                r={n.size}
                fill={n.fill}
                style={{
                  transform: `translate(calc(var(--n) * ${n.tx}px), calc(var(--n) * ${n.ty}px))`,
                  opacity: "calc(min(1, var(--n) * 5) * (0.95 - var(--r) * 0.45))",
                }}
              />
            ))}
          </g>

          {/* seed and roots */}
          <ellipse cx={X} cy={SEED + 4} rx="15" ry="10" fill="#e8d3a8" style={{ opacity: "calc(1 - var(--s) * 0.6)" }} />
          {ROOTS.map((rt, i) => (
            <path
              key={i}
              d={rt.d}
              pathLength={1}
              fill="none"
              stroke="#ecdcb6"
              strokeWidth={i < 3 ? 3.4 : 2.2}
              strokeLinecap="round"
              strokeDasharray="1 1"
              style={{
                strokeDashoffset: `calc(1 - clamp(0, (var(--r) - ${rt.delay}) / ${1 - rt.delay}, 1))`,
              }}
            />
          ))}

          {/* stem: a dark core with a light edge, both drawn upwards */}
          <path
            d={STEM}
            pathLength={1}
            fill="none"
            stroke="#3f8a0f"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray="1 1"
            style={{ strokeDashoffset: "calc(1 - var(--s))" }}
          />
          <path
            d={STEM}
            pathLength={1}
            fill="none"
            stroke="#8dc63f"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 1"
            transform="translate(-2.5 0)"
            style={{ strokeDashoffset: "calc(1 - var(--s))" }}
          />

          {BLADES.map((b, i) => (
            <g key={i} transform={`translate(${X + b.dx} ${SOIL + 2}) scale(${b.side} 1) rotate(${b.rot})`}>
              <g className="grow-sway" style={{ animationDelay: `${-i * 1.1 - 0.4}s` }}>
                <g style={{ transform: `scale(calc(clamp(0, (var(--s) - ${b.at}) / 0.3, 1) * ${b.len}))` }}>
                  <path d={LEAF} fill="url(#g-leaf)" />
                  <path d={LEAF_RIB} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8" />
                </g>
              </g>
            </g>
          ))}

          {LEAVES.map((l, i) => {
            // the blade opens once the stem tip has passed where it joins
            const at = (SEED - l.y) / STEM_LEN - 0.02;
            return (
              <g key={i} transform={`translate(${X} ${l.y}) scale(${l.side} 1) rotate(${l.rot})`}>
                <g className="grow-sway" style={{ animationDelay: `${-i * 0.7}s` }}>
                  <g
                    style={{
                      transform: `scale(calc(clamp(0, (var(--s) - ${at.toFixed(3)}) / 0.2, 1) * ${l.len}))`,
                    }}
                  >
                    <path d={LEAF} fill="url(#g-leaf)" />
                    <path d={LEAF_RIB} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.4" />
                  </g>
                </g>
              </g>
            );
          })}

          {/* the logo's plus, opening at the tip */}
          <g transform={`translate(${X} ${TIP - 20})`}>
            <g style={{ transform: "scale(max(0.001, var(--x))) rotate(calc((1 - var(--x)) * -90deg))" }}>
              <rect x="-9" y="-28" width="18" height="56" rx="9" fill="#5aa912" />
              <rect x="-28" y="-9" width="56" height="18" rx="9" fill="#8dc63f" />
            </g>
          </g>

          {/* loose granules, pulled together */}
          <g transform={`translate(${X} ${START})`}>
            {SPECKS.map((s, i) => (
              <circle
                key={i}
                r={s.size}
                fill={i % 3 ? "#7d5532" : "#a67447"}
                style={{
                  transform: `translate(calc((1 - var(--a)) * ${s.dx}px), calc((1 - var(--a)) * ${s.dy}px))`,
                  opacity: "calc(1 - clamp(0, (var(--a) - 0.82) * 7, 1))",
                }}
              />
            ))}
          </g>

          {/* the granule: forms, drops, sinks, dissolves */}
          <g transform={`translate(${X} 0)`}>
            <g
              style={{
                transform: `translateY(calc(${START}px + var(--b) * ${SURFACE - START}px + var(--d) * 180px)) rotate(calc(var(--b) * 32deg + var(--d) * 28deg)) scale(calc(0.55 + clamp(0, (var(--a) - 0.78) * 5, 1) * 0.45 - var(--d) * 0.4))`,
                opacity: "min(clamp(0, (var(--a) - 0.76) * 6, 1), 1 - var(--d))",
              }}
            >
              <path
                d="M-26,-6 C-28,-22 -14,-28 2,-27 C20,-26 29,-16 28,0 C27,17 16,26 -2,26 C-18,26 -27,12 -26,-6 Z"
                fill="url(#g-granule)"
              />
              <rect x="-4" y="-13" width="8" height="26" rx="4" fill="#5aa912" />
              <rect x="-13" y="-4" width="26" height="8" rx="4" fill="#8dc63f" />
              <path d="M-16,-14 C-10,-21 0,-23 8,-21" fill="none" stroke="#c49466" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
            </g>
          </g>

          {/* bubbles off the sinking granule */}
          <g transform={`translate(${X} ${SURFACE})`}>
            {BUBBLES.map((b, i) => (
              <circle
                key={i}
                cx={b.dx}
                cy={b.depth}
                r={b.size}
                fill="none"
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="1.3"
                style={
                  {
                    "--u": `clamp(0, (var(--w) - ${b.delay}) / 0.4, 1)`,
                    transform: `translateY(calc(var(--u) * ${-b.depth + 6}px))`,
                    opacity: "calc(min(1, var(--u) * 10) * (1 - var(--u)))",
                  } as Vars
                }
              />
            ))}
          </g>

          {/* the water over everything below the surface */}
          <rect x="-1200" y={SURFACE} width="3840" height={SOIL - SURFACE} fill="url(#g-water)" />
          <g className="grow-caustics" opacity="0.12">
            <path d={SWELL} transform={`translate(0 ${SURFACE + 70})`} fill="none" stroke="#fff" strokeWidth="1.2" />
            <path d={SWELL} transform={`translate(-60 ${SURFACE + 150}) scale(1 1.6)`} fill="none" stroke="#fff" strokeWidth="1" />
          </g>

          {/* surface: a slow swell, then ripples and splash where it lands */}
          <g className="grow-swell">
            <path d={SWELL} transform={`translate(0 ${SURFACE})`} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" />
          </g>
          <g transform={`translate(${X} ${SURFACE})`}>
            {[0, 0.12, 0.24, 0.36].map((delay, i) => (
              <ellipse
                key={i}
                rx={430 - i * 40}
                ry={30 - i * 2}
                fill="none"
                stroke="#fff"
                strokeWidth="1.8"
                vectorEffect="non-scaling-stroke"
                style={
                  {
                    "--k": `clamp(0, (var(--c) - ${delay}) / 0.55, 1)`,
                    transform: "scale(max(0.001, var(--k)))",
                    opacity: "calc((1 - var(--k)) * min(1, var(--k) * 12) * 0.8)",
                  } as Vars
                }
              />
            ))}
            {DROPS.map((d, i) => (
              <circle
                key={i}
                r={d.size}
                fill="#d9eec0"
                style={{
                  transform: `translate(calc(var(--t) * ${d.dx}px), calc(var(--t2) * ${d.g}px - var(--t) * ${d.vy}px))`,
                  opacity: "calc(min(1, var(--t) * 30) * (1 - var(--t)))",
                }}
              />
            ))}
          </g>
        </svg>

        {/* captions: one at a time while scrolling */}
        <div className="grow-copy shell">
          <div className="grow-panel">
            <p className="grow-eyebrow">
              <span>How Bio Growth+ works</span>
              <span className="tabular-nums" aria-hidden>
                <span className="grow-count" /> / 04
              </span>
            </p>
            <h2 id="grow-title" className="sr-only">
              How Bio Growth+ works, from one granule to a standing crop
            </h2>
            <ol className="grow-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grow-step" data-i={i}>
                  <p className="display grow-title">{s.title}</p>
                  <p className="mt-4 text-[17px] lg:text-[19px] leading-[1.5] text-white/80 max-w-[34ch]">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>
            <div className="grow-bar" aria-hidden>
              <span />
            </div>
          </div>
        </div>
      </div>

      <Wave fill="var(--mint)" shape={2} />
    </section>
  );
}
