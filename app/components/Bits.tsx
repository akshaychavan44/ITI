import type { CSSProperties } from "react";

/* The reference throws fruit and splash around its cans. A fertiliser
   brand throws what's in the bag: granules, a cane leaf, and the plus
   from the logo. Drawn flat, to sit with the cartoon pack artwork. */

const GRANULES = [
  "M21 2c10 0 18 7 18 17 0 11-8 19-19 19S2 31 2 20 10 2 21 2z",
  "M18 3c11-1 20 6 20 16s-9 18-19 18C8 37 1 30 2 19 3 9 9 4 18 3z",
  "M22 3c9 1 16 9 15 18-1 10-10 17-19 16C8 36 2 28 3 18 4 9 12 2 22 3z",
];
const SOIL = ["#6b4423", "#7d5532", "#553419"];

function Granule({ v = 0 }: { v?: number }) {
  return (
    <svg viewBox="0 0 40 40">
      <path d={GRANULES[v % 3]} fill={SOIL[v % 3]} />
      <path
        d="M12 11c3-4 9-5 13-3-5 1-9 4-11 9-2-1-3-4-2-6z"
        fill="#a67447"
        opacity="0.85"
      />
    </svg>
  );
}

function Plus() {
  return (
    <svg viewBox="0 0 60 60">
      <rect x="21" y="3" width="18" height="54" rx="9" fill="#5aa912" />
      <rect x="3" y="21" width="54" height="18" rx="9" fill="#8dc63f" />
    </svg>
  );
}

function Leaf() {
  return (
    <svg viewBox="0 0 140 44">
      <path d="M3 40C34 10 88 1 137 5 97 12 52 26 3 40z" fill="#5aa912" />
      <path
        d="M10 36C44 16 92 7 130 6"
        stroke="#8dc63f"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export type BitSpec = {
  kind: "granule" | "plus" | "leaf";
  /** left / top, as percentages of the positioned parent */
  x: number;
  y: number;
  /** width in px at 1440 wide; scales down with the viewport */
  size: number;
  rotate?: number;
  /** depth-of-field blur, for the pieces "nearest the camera" */
  blur?: number;
  /** parallax factor; positive drifts up as you scroll */
  speed?: number;
  bob?: number;
  delay?: number;
  z?: number;
  v?: number;
  /** loose pieces that would land on text in a narrow column */
  desk?: boolean;
};

export function Bit({
  kind,
  x,
  y,
  size,
  rotate = 0,
  blur = 0,
  speed = 0.1,
  bob = 6,
  delay = 0,
  z = 3,
  v = 0,
  desk = false,
}: BitSpec) {
  const style = {
    left: `${x}%`,
    top: `${y}%`,
    width: `clamp(${Math.round(size * 0.5)}px, ${(size / 14.4).toFixed(2)}vw, ${size}px)`,
    zIndex: z,
    filter: blur ? `blur(${blur}px)` : undefined,
    "--bob": `${bob}s`,
    "--bob-delay": `${-delay}s`,
  } as CSSProperties;

  return (
    <span
      className={`bit ${desk ? "hidden lg:block" : ""}`}
      data-speed={speed}
      style={style}
      aria-hidden
    >
      <span>
        <span className="block" style={{ transform: `rotate(${rotate}deg)` }}>
          {kind === "granule" ? <Granule v={v} /> : kind === "plus" ? <Plus /> : <Leaf />}
        </span>
      </span>
    </span>
  );
}

export function Bits({ items, desk }: { items: BitSpec[]; desk?: boolean }) {
  return (
    <>
      {items.map((b, i) => (
        <Bit key={i} desk={desk} {...b} />
      ))}
    </>
  );
}
