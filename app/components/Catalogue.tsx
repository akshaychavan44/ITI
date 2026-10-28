import Image from "next/image";
import { CATALOGUE } from "../lib/content";
import { Wave } from "./Wave";
import { Words } from "./Words";

export function Catalogue() {
  return (
    <section
      id="catalogue"
      className="band-field relative overflow-hidden pt-[calc(clamp(56px,8vw,132px)+clamp(32px,4vw,64px))] pb-[clamp(120px,12vw,190px)]"
    >
      {/* seedling rows in tilled soil, under a forest wash */}
      <Image
        src="/photos/seedling-rows.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[center_60%]"
      />
      <div aria-hidden className="photo-shade" />
      <Wave fill="var(--page)" shape={2} edge="top" />

      <div className="shell relative">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
          <h2 className="display display-lg animated-text">
            <Words text="132 products," />
            <br />
            <Words text="one catalogue" base={0.18} />
          </h2>
          <p className="text-[18px] leading-[1.55] opacity-85 max-w-[40ch] lg:justify-self-end">
            Ninety of them sit under Bio Growth+. The rest are the nutrition
            lines Iti Biotech has been supplying for years.
          </p>
        </div>

        <div className="mt-[clamp(40px,5vw,72px)] grid sm:grid-cols-2 lg:grid-cols-4 animated-block stagger">
          {CATALOGUE.map((c, i) => (
            <article
              key={c.name}
              className={`stagger-item py-8 sm:px-8 border-t sm:border-t-0 ${
                i % 2 ? "sm:border-l" : "sm:pl-0"
              } ${i === 2 ? "lg:border-l lg:pl-8" : ""} ${i > 1 ? "sm:border-t lg:border-t-0" : ""}`}
              style={{
                borderColor: "color-mix(in srgb, currentColor 22%, transparent)",
                animationDelay: `${(0.15 + i * 0.07).toFixed(3)}s`,
              }}
            >
              <span
                className="inline-flex items-center h-8 px-3.5 rounded-full text-[13px] font-semibold uppercase tracking-[0.06em]"
                style={{ background: "color-mix(in srgb, currentColor 14%, transparent)" }}
              >
                {c.family}
              </span>
              <div
                className="display leading-[0.85] mt-6"
                style={{ color: "var(--num)", fontSize: "clamp(6rem, 11vw, 10.5rem)" }}
              >
                {c.n}
              </div>
              <h3 className="display text-[32px] mt-5">{c.name}</h3>
              <p className="mt-3 text-[16px] leading-[1.55] opacity-85 max-w-[30ch]">{c.body}</p>
            </article>
          ))}
        </div>
      </div>

      <Wave fill="var(--page)" shape={1} flip />
    </section>
  );
}
