import Image from "next/image";
import { BRAND, JOURNEY_COPY, JOURNEY_MARKS } from "../lib/content";
import { Wave } from "./Wave";
import { Words } from "./Words";

export function Journey() {
  return (
    <section
      id="journey"
      className="band-soil relative overflow-hidden pt-[clamp(40px,5vw,80px)] pb-[clamp(120px,12vw,190px)]"
    >
      <div aria-hidden className="plots opacity-60" />

      <div className="shell relative grid lg:grid-cols-[0.85fr_1.15fr] gap-14">
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <h2 className="display animated-text leading-[0.82]">
            <span className="block mb-[0.12em]" style={{ fontSize: "clamp(3rem, 5.6vw, 5.4rem)", lineHeight: 0.9 }}>
              <Words text="Since" />
            </span>
            <span
              className="block"
              style={{ color: "var(--hi)", fontSize: "clamp(8rem, 17vw, 16rem)" }}
            >
              <Words text={String(BRAND.founded)} base={0.17} />
            </span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-3 rounded-full bg-white pl-3 pr-5 py-2">
              <Image
                src="/brand/logo-iti.png"
                alt=""
                width={107}
                height={81}
                className="h-[42px] w-auto"
              />
              <span className="text-[16px] font-semibold text-black">Iti Biotech</span>
            </span>
            <span className="text-[16px] opacity-75">{BRAND.origin}, Betul</span>
          </div>

          <figure
            className="photo mt-12 aspect-[4/3] w-[calc(100%-16px)] max-w-[470px] animated-block media"
            style={{ color: "var(--hi)" }}
          >
            <Image
              src="/photos/tree-dusk.jpg"
              alt="A lone tree over a field of young crop at dusk"
              fill
              sizes="(min-width: 1024px) 470px, 90vw"
              className="object-center"
            />
          </figure>
        </div>

        <div>
          <div className="space-y-6 text-[19px] lg:text-[21px] leading-[1.6] max-w-[60ch]">
            {JOURNEY_COPY.map((p, i) => (
              <p key={i} className={i === 0 ? "" : "opacity-80"}>
                {p}
              </p>
            ))}
          </div>

          <ol className="mt-14 animated-block rise">
            {JOURNEY_MARKS.map((m, i) => (
              <li
                key={m.year}
                className="grid sm:grid-cols-[190px_1fr] items-baseline gap-x-8 gap-y-1 py-6 border-t"
                style={{
                  borderColor: "rgba(255,255,255,0.16)",
                  animationDelay: `${(0.15 + i * 0.06).toFixed(3)}s`,
                }}
              >
                <span
                  className="display leading-none"
                  style={{ color: "var(--hi)", fontSize: "clamp(3rem, 4.6vw, 4.4rem)" }}
                >
                  {m.year}
                </span>
                <span className="text-[18px] opacity-85">{m.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Wave fill="var(--field)" shape={0} />
    </section>
  );
}
