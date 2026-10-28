import Image from "next/image";
import { BAG, HERO_STATS } from "../lib/content";
import { Bits, type BitSpec } from "./Bits";
import { Btn } from "./Icons";
import { Wave } from "./Wave";
import { Words } from "./Words";

const AROUND_PACK: BitSpec[] = [
  { kind: "plus", x: -26, y: 8, size: 64, rotate: -12, speed: 0.25, bob: 7, z: 4 },
];

export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden pt-[clamp(56px,7vw,110px)] pb-[clamp(130px,13vw,200px)]"
    >
      <div className="shell grid lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-6 items-center">
        <div className="lg:pl-[6%]">
          <h2 className="display display-lg animated-text" style={{ color: "var(--deep)" }}>
            <Words text="38 years in" />
            <br />
            <Words text="Indian fields" base={0.18} />
          </h2>
          <div className="animated-block rise">
            <p className="mt-7 text-[18px] leading-[1.6] max-w-[46ch] text-[#333]">
              Our journey began in 1988 with Shri Balaji Seeds Suppliers. Since
              then we have grown from a seeds and inputs counter into a supplier
              for farmers, growers, institutions and government initiatives
              across India.
            </p>
            <div className="mt-9" style={{ animationDelay: "0.2s" }}>
              <Btn href="#journey">Our journey</Btn>
            </div>
          </div>
        </div>

        {/* a grower in her field, the pack set down in front of the print */}
        <div className="relative lg:pl-[8%] pb-[clamp(56px,9vw,90px)] lg:pb-0">
          <figure
            className="photo aspect-[4/5] w-[88%] sm:w-[78%] lg:w-full max-w-[500px] ml-auto animated-block media"
            style={{ color: "var(--field)" }}
          >
            <Image
              src="/photos/farmer-wheat.jpg"
              alt="A woman farmer standing in her wheat field, holding a handful of the crop"
              fill
              sizes="(min-width: 1024px) 500px, 80vw"
              className="object-[36%_center]"
            />
          </figure>
          <div className="absolute left-0 lg:left-[-2%] bottom-0 lg:bottom-[-10%] z-[2] w-[46%] max-w-[250px]">
            <Bits items={AROUND_PACK} />
            <div className="relative z-[2] animated-block media">
              <Image
                src="/brand/packs/organic-phospho.png"
                alt="Bio Growth+ Organic Phospho, 50 kg bag"
                width={BAG.w}
                height={BAG.h}
                sizes="(min-width: 1024px) 250px, 46vw"
                className="w-full h-auto rotate-[7deg] drop-shadow-[0_34px_36px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* numbers, set like the reference's stat row */}
      <div className="shell mt-[clamp(56px,7vw,100px)]">
        <dl className="grid md:grid-cols-3 animated-block stagger">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.value}
              className={`stagger-item py-6 md:py-2 md:px-10 border-black/15 ${
                i ? "border-t md:border-t-0 md:border-l" : "md:pl-0"
              }`}
              style={{ animationDelay: `${(0.15 + i * 0.08).toFixed(2)}s` }}
            >
              <dt
                className="display leading-none"
                style={{ color: "var(--field)", fontSize: "clamp(4.2rem, 8vw, 7.5rem)" }}
              >
                {s.value}
              </dt>
              <dd className="mt-4 text-[18px] leading-[1.45] text-[#55554f] max-w-[30ch]">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Wave fill="var(--field)" shape={1} lines />
    </section>
  );
}
