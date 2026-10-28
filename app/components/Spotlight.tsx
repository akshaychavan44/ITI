"use client";

import { PRODUCTS, inkOf } from "../lib/content";
import { Bits, type BitSpec } from "./Bits";
import { Btn } from "./Icons";
import { PackShot } from "./Range";

const AROUND: BitSpec[] = [
  { kind: "plus", x: 102, y: 30, size: 66, rotate: 20, speed: 0.3, bob: 7 },
  { kind: "leaf", x: -56, y: 42, size: 150, rotate: -18, speed: 0.15, z: 1 },
  { kind: "granule", x: -18, y: 80, size: 54, v: 2, blur: 4, z: 5, speed: 0.4 },
];

/** The reference's "Drink fresh" block: the product name as a poster in
 *  its pack colour, the pack cutting through it, a faded echo underneath. */
export function Spotlight({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  const p = PRODUCTS.find((x) => x.id === selected) ?? PRODUCTS[0];
  const len = p.name.length;
  // one line, as wide as the shell allows
  const giant = `clamp(3.4rem, ${(186 / len).toFixed(2)}vw, ${(166 / len).toFixed(2)}rem)`;

  return (
    <section
      id="spotlight"
      className="relative overflow-hidden pt-[clamp(40px,5vw,80px)] pb-[clamp(48px,5vw,80px)]"
    >
      <div className="shell relative">
        {/* above the giant name: Anton at this size hit-tests by its full
            ascent, which reaches up over this row */}
        <div className="relative z-[5] flex flex-wrap items-end justify-between gap-6">
          <div>
            <p
              className="display leading-[0.95]"
              style={{ color: "#1a1a1a", fontSize: "clamp(2rem, 3.6vw, 3.4rem)" }}
            >
              {p.short}
            </p>
            <p className="deva mt-2 text-[22px] text-[#444]">{p.hindi}</p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Product">
            {PRODUCTS.map((x) => {
              const on = x.id === p.id;
              const hex = inkOf(x);
              return (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onSelect(x.id)}
                  className="inline-flex items-center gap-2.5 h-11 pl-3 pr-4 rounded-full text-[15px] font-medium transition-colors"
                  style={{
                    background: on ? hex : "#fff",
                    color: on ? "#fff" : "#1c1c1c",
                    boxShadow: on ? "none" : "inset 0 0 0 1px rgba(0,0,0,0.12)",
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ background: on ? "#fff" : hex }}
                  />
                  {x.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-8 lg:mt-10">
          <p
            className="display whitespace-nowrap leading-[0.84]"
            style={{ color: inkOf(p), fontSize: giant }}
            aria-label={p.name}
          >
            {p.name}
          </p>
          <p
            aria-hidden
            className="display whitespace-nowrap leading-[0.84] ml-[26%]"
            style={{
              color: `color-mix(in srgb, ${p.hex} 11%, transparent)`,
              fontSize: giant,
            }}
          >
            {p.name}
          </p>

          {/* the pack, re-mounted per product so it swings in */}
          <div className="relative z-[3] mx-auto -mt-[16vw] w-[52vw] max-w-[270px] lg:max-w-none lg:mt-0 lg:absolute lg:left-1/2 lg:top-[-12%] lg:w-[clamp(230px,21vw,320px)] lg:-translate-x-1/2">
            <Bits items={AROUND} />
            <div key={p.id} className="swap-in relative z-[3]">
              <PackShot
                p={p}
                sizes="(min-width: 1024px) 320px, 52vw"
                className="rotate-[8deg]"
              />
            </div>
          </div>
        </div>

        <div className="relative z-[4] mt-12 lg:mt-16 grid lg:grid-cols-[1fr_minmax(0,380px)_1fr] gap-10 lg:gap-8">
          <div>
            <p className="text-[18px] leading-[1.55] text-[#333] max-w-[36ch]">
              {p.kind}
            </p>
            <ul className="mt-5 space-y-2">
              {p.spec.map((s) => (
                <li
                  key={s}
                  className="inline-block mr-2 rounded-lg px-3 py-1.5 text-[15px] font-medium"
                  style={{
                    background: `color-mix(in srgb, ${p.hex} 10%, #fff)`,
                    color: "#1a1a1a",
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid grid-cols-3 gap-4 max-w-[440px] border-t border-black/12 pt-5">
              {[
                ["Pack", p.pack],
                ["Dosage / acre", p.dosage.replace(" per acre", "")],
                ["Crops", "All crops"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[13px] uppercase tracking-[0.08em] text-[#77776f]">{k}</dt>
                  <dd className="display text-[28px] leading-tight mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div aria-hidden className="hidden lg:block" />

          <div>
            <ul className="space-y-3 text-[17px] leading-[1.45]">
              {p.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <svg viewBox="0 0 60 60" className="w-4 h-4 mt-[3px] shrink-0" aria-hidden>
                    <rect x="21" y="3" width="18" height="54" rx="9" fill="#5aa912" />
                    <rect x="3" y="21" width="54" height="18" rx="9" fill="#8dc63f" />
                  </svg>
                  <span className="text-[#262626]">{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Btn href="#contact">Ask for {p.name}</Btn>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
