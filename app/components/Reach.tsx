import Image from "next/image";
import { BAG, BRAND, PRODUCTS, REACH } from "../lib/content";
import { Btn } from "./Icons";
import { Wave } from "./Wave";
import { Words } from "./Words";

/* the hero and story already show the first three; fan the rest here */
const FAMILY = ["potash-plus", "phospho-gypsum", "jio-gypsum"].map(
  (id) => PRODUCTS.find((p) => p.id === id)!,
);
/* fanned like a hand of cards, centre bag forward */
const FAN = [
  { left: "0%", rot: -14, z: 1, w: "40%", top: "14%" },
  { left: "30%", rot: 2, z: 3, w: "44%", top: "0%" },
  { left: "62%", rot: 15, z: 2, w: "40%", top: "12%" },
];

export function Reach() {
  return (
    <section id="contact" className="band-field relative overflow-hidden pt-[clamp(40px,5vw,80px)]">
      <div className="shell relative grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10">
        <div className="pb-[clamp(60px,8vw,120px)]">
          <h2 className="display display-lg animated-text">
            <Words text="Ten lakh growers," />
            <br />
            <Words text="and the tenders" base={0.18} />
            <br />
            <Words text="in between" base={0.2} />
          </h2>

          <dl className="mt-10 max-w-[52ch] animated-block rise">
            {REACH.map((r, i) => (
              <div
                key={r.k}
                className="grid sm:grid-cols-[230px_1fr] gap-x-6 gap-y-1 py-4 border-t"
                style={{
                  borderColor: "color-mix(in srgb, currentColor 24%, transparent)",
                  animationDelay: `${(0.15 + i * 0.07).toFixed(3)}s`,
                }}
              >
                <dt className="display text-[24px]">{r.k}</dt>
                <dd className="opacity-85 text-[17px]">{r.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <Btn href={`tel:${BRAND.phone.replace(/\s/g, "")}`} variant="gold">
              {BRAND.phone}
            </Btn>
            <Btn href={`mailto:${BRAND.email}`} variant="white">
              Email us
            </Btn>
          </div>
        </div>

        {/* a grower in his paddy, the granular line fanned in front of
            the print and sinking into the footer wave */}
        <div className="relative mt-6 lg:mt-0 flex flex-col justify-end">
          <figure
            className="photo w-[calc(100%-16px)] aspect-[5/4] animated-block media"
            style={{ color: "var(--hi)" }}
          >
            <Image
              src="/photos/farmer-paddy.jpg"
              alt="A farmer standing waist-deep in his green paddy"
              fill
              sizes="(min-width: 1024px) 560px, 92vw"
              className="object-[62%_center]"
            />
          </figure>
          <div className="relative -mt-[16%] h-[clamp(300px,34vw,500px)]">
            {FAMILY.map((p, i) => (
              <div
                key={p.id}
                className="absolute"
                style={{ left: FAN[i].left, top: FAN[i].top, width: FAN[i].w, zIndex: FAN[i].z }}
              >
                <Image
                  src={p.cutout}
                  alt={`${p.name} pack`}
                  width={BAG.w}
                  height={BAG.h}
                  sizes="(min-width: 1024px) 260px, 40vw"
                  className="w-full h-auto drop-shadow-[0_30px_34px_rgba(0,0,0,0.35)]"
                  style={{ transform: `rotate(${FAN[i].rot}deg)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-[5]">
        <Wave fill="var(--deep)" shape={1} />
      </div>
    </section>
  );
}
