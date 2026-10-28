import Image from "next/image";
import { BAG, BRAND } from "../lib/content";
import { Bits, type BitSpec } from "./Bits";
import { Btn } from "./Icons";
import { Wave } from "./Wave";
import { Words } from "./Words";

/** Grid cells (col, row) that are lit behind the headline. */
const LIT = [
  [2, 1], [3, 1], [9, 2], [14, 1], [15, 4], [1, 5], [11, 6], [6, 7], [16, 7], [4, 9], [12, 9],
];

/** A few pieces around the bag — % of the bag's own box, so they travel
 *  with it. Kept sparse on purpose. */
const AROUND_BAG: BitSpec[] = [
  { kind: "leaf", x: 76, y: -8, size: 150, rotate: 200, z: 1, speed: 0.14, bob: 7 },
  { kind: "plus", x: -34, y: 22, size: 60, rotate: 14, speed: 0.25, bob: 8 },
  { kind: "granule", x: 108, y: 30, size: 32, v: 1, speed: 0.18, delay: 2 },
  { kind: "granule", x: -14, y: 74, size: 24, v: 2, speed: 0.22 },
  { kind: "granule", x: 86, y: 80, size: 64, v: 0, blur: 5, z: 5, speed: 0.4, bob: 8 },
];

export function Hero() {
  return (
    <section id="top" className="band-deep relative overflow-hidden">
      {/* Indian farmland, under a forest wash so the poster type holds */}
      <Image
        src="/photos/field-rows-india.jpg"
        alt=""
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover object-[center_40%]"
      />
      <div aria-hidden className="photo-shade" />
      <div aria-hidden className="plots" />
      {LIT.map(([c, r]) => (
        <span
          key={`${c}-${r}`}
          aria-hidden
          className="plot-lit"
          style={{ left: c * 80, top: r * 80 }}
        />
      ))}

      <div className="shell relative pt-[112px] lg:pt-[124px] pb-[clamp(96px,11vw,170px)]">
        <div className="relative">
          <h1 className="display hero-type animated-text relative z-[2]">
            <span style={{ color: "var(--hi)" }}>
              <Words text="Rooted in" />
            </span>
            <span className="text-right" style={{ color: "var(--field)" }}>
              <Words text="the soil" base={0.19} />
            </span>
          </h1>

          {/* the flagship bag, cutting through both lines */}
          <div className="relative z-[3] mx-auto -mt-[7vw] w-[52vw] max-w-[290px] lg:max-w-none lg:mt-0 lg:absolute lg:left-1/2 lg:top-[-7%] lg:w-[clamp(260px,24vw,350px)] lg:-translate-x-[38%]">
            <Bits items={AROUND_BAG} />
            <div className="bit !static" data-speed="0.06">
              <div style={{ "--bob": "7s" } as React.CSSProperties}>
                <Image
                  src="/brand/packs/growth-booster.png"
                  alt="Bio Growth+ Growth Booster, 50 kg bag"
                  width={BAG.w}
                  height={BAG.h}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 350px, 52vw"
                  className="relative z-[4] w-full h-auto rotate-[-8deg] drop-shadow-[0_40px_50px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          </div>

          {/* the reference's teaser card */}
          <aside className="animated-block pop relative z-[4] mt-10 mx-auto w-full max-w-[300px] lg:max-w-none lg:mt-0 lg:absolute lg:left-0 lg:bottom-[-2%] lg:w-[250px] rounded-[22px] p-2.5"
            style={{ background: "var(--hi)", color: "var(--deep)" }}
          >
            <div className="relative rounded-[16px] overflow-hidden bg-green aspect-[5/4]">
              <Image
                src="/brand/packs/bio-guard.png"
                alt="Bio Guard 10 bag"
                width={BAG.w}
                height={BAG.h}
                sizes="140px"
                className="absolute left-1/2 top-[9%] w-[48%] -translate-x-1/2 rotate-[9deg] drop-shadow-[0_14px_16px_rgba(0,0,0,0.35)]"
              />
            </div>
            <p className="display text-[21px] leading-[1.02] mt-3 px-1.5">
              New — ten strains in one pack, Bio Guard 10
            </p>
            <div className="mt-3 [&_.btn]:w-full [&_.btn>span:first-child]:flex-1">
              <Btn href="#range" size="sm">
                See the range
              </Btn>
            </div>
          </aside>
        </div>

        <div className="relative z-[4] mt-10 lg:mt-14 flex lg:justify-end animated-block soft">
          <p className="max-w-[40ch] text-[17px] lg:text-[18px] leading-[1.5] lg:text-right opacity-85">
            Ten bio fertilisers and eighty bio stimulants from {BRAND.name},
            Betul — made for Indian soil by a house that has supplied growers
            since {BRAND.founded}.
          </p>
        </div>
      </div>

      <Wave fill="var(--page)" shape={0} />
    </section>
  );
}
