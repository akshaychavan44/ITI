"use client";

import Image from "next/image";
import { BAG, PRODUCTS, inkOf, type Product } from "../lib/content";
import { Bits } from "./Bits";
import { Wave } from "./Wave";
import { Words } from "./Words";

/* Wavy-sided card outline, like the reference's flavour cards, in
   objectBoundingBox units so one path fits every card. */
function scallop(n = 3, d = 0.03, rx = 0.08, ry = 0.064) {
  const f = (v: number) => +v.toFixed(4);
  const seg = (1 - 2 * ry) / (2 * n);
  let p = `M${rx},0 H${f(1 - rx)} Q1,0 1,${ry}`;
  for (let i = 0; i < 2 * n; i++) {
    const y0 = ry + i * seg;
    const y1 = y0 + seg;
    const x0 = i % 2 ? 1 - d : 1;
    const x1 = i % 2 ? 1 : 1 - d;
    p += ` C${f(x0)},${f(y0 + seg / 2)} ${f(x1)},${f(y1 - seg / 2)} ${f(x1)},${f(y1)}`;
  }
  p += ` Q1,1 ${f(1 - rx)},1 H${rx} Q0,1 0,${f(1 - ry)}`;
  for (let i = 0; i < 2 * n; i++) {
    const y0 = 1 - ry - i * seg;
    const y1 = y0 - seg;
    const x0 = i % 2 ? d : 0;
    const x1 = i % 2 ? 0 : d;
    p += ` C${f(x0)},${f(y0 - seg / 2)} ${f(x1)},${f(y1 + seg / 2)} ${f(x1)},${f(y1)}`;
  }
  return `${p} Q0,0 ${rx},0 Z`;
}
const SCALLOP = scallop();

/** The pack itself: the bag cut-out rendered from the final print. */
export function PackShot({
  p,
  className = "",
  sizes,
}: {
  p: Product;
  className?: string;
  sizes: string;
}) {
  return (
    <Image
      src={p.cutout}
      alt={`${p.name} pack`}
      width={BAG.w}
      height={BAG.h}
      sizes={sizes}
      className={`w-full h-auto drop-shadow-[0_26px_30px_rgba(0,0,0,0.28)] ${className}`}
    />
  );
}

function Card({
  p,
  i,
  on,
  onSelect,
}: {
  p: Product;
  i: number;
  on: boolean;
  onSelect: (id: string) => void;
}) {
  const hex = p.hex;
  const ink = inkOf(p);

  return (
    <a
      href="#spotlight"
      onClick={() => onSelect(p.id)}
      aria-label={`${p.name} — show details`}
      className="stagger-item group block"
      style={{ animationDelay: `${(0.15 + i * 0.07).toFixed(3)}s` }}
    >
      <div
        className="pack-card"
        style={{ background: `color-mix(in srgb, ${hex} 15%, #fff)` }}
      >
        <span className="tag absolute left-[7%] top-[5.5%] z-[3]">
          <span className="display text-[30px] leading-none" style={{ color: ink }}>
            {p.pack}
          </span>
        </span>

        {/* the name, huge and faded, behind the pack */}
        <span
          aria-hidden
          className="display absolute inset-x-0 bottom-[3%] text-center leading-[0.8] z-[1] whitespace-nowrap"
          style={{
            fontSize: `clamp(4rem, ${(50 / Math.max(p.ghost.length, 5)).toFixed(2)}vw, ${(17 / Math.max(p.ghost.length, 5)).toFixed(2)}rem)`,
            color: `color-mix(in srgb, ${hex} 42%, #fff)`,
          }}
        >
          {p.ghost}
        </span>

        <div
          className="pack-img absolute left-1/2 top-[13%] z-[2] w-[46%] -translate-x-1/2 rotate-[-6deg]"
        >
          <PackShot p={p} sizes="(min-width: 1024px) 220px, 45vw" />
        </div>
      </div>

      <div className="mt-4 px-1 flex items-start justify-between gap-3">
        <div>
          <h3 className="display text-[30px] leading-none">{p.name}</h3>
          <p className="mt-1.5 text-[15px] text-[#55554f]">
            <span className="deva text-[#333]">{p.hindi}</span> · {p.short}
          </p>
        </div>
        <span
          className="mt-1 shrink-0 w-9 h-9 rounded-full grid place-items-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: on ? ink : "transparent",
            boxShadow: on ? "none" : `inset 0 0 0 2px ${ink}`,
          }}
          aria-hidden
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: on ? "#fff" : ink }}
          />
        </span>
      </div>
    </a>
  );
}

/** The pack cards. Picking one opens it in the spotlight below. */
export function Range({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section id="range" className="band-mint relative overflow-hidden pt-[clamp(40px,5vw,80px)] pb-[clamp(120px,12vw,190px)]">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <clipPath id="scallop" clipPathUnits="objectBoundingBox">
          <path d={SCALLOP} />
        </clipPath>
      </svg>

      {/* two slices either side of the heading, as the reference does */}
      <Bits
        desk
        items={[
          { kind: "plus", x: 9, y: 6, size: 100, rotate: -16, blur: 3, speed: 0.3, bob: 8 },
          { kind: "leaf", x: 80, y: 4, size: 180, rotate: 158, blur: 2, speed: 0.25 },
        ]}
      />

      <div className="shell relative">
        <div className="text-center max-w-[900px] mx-auto">
          <h2 className="display display-lg animated-text" style={{ color: "var(--green-deep)" }}>
            <Words text="Choose what" />
            <br />
            <Words text="your soil needs" base={0.18} />
          </h2>
          <p className="mt-6 text-[18px] leading-[1.55] text-[#333] max-w-[48ch] mx-auto">
            Six packs from the Bio Growth+ granular line, each in its own
            colour. Tap one for the full spec.
          </p>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 animated-block stagger">
          {PRODUCTS.map((p, i) => (
            <Card key={p.id} p={p} i={i} on={p.id === selected} onSelect={onSelect} />
          ))}
        </div>
      </div>

      <Wave fill="var(--page)" shape={0} flip />
    </section>
  );
}
