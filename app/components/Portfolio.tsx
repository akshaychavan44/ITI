import { PORTFOLIO } from "../lib/content";
import { Wave } from "./Wave";
import { Words } from "./Words";

/* Stickers in field colours — leaf, wheat, soil, forest, the brand
   green and clay — slapped on at an angle. */
const SKINS = [
  { bg: "#2b6410", ink: "#f2f6e8" },
  { bg: "#f4d28f", ink: "#2a1b10" },
  { bg: "#6b4423", ink: "#f5ecdf" },
  { bg: "#5aa912", ink: "#0c1904" },
  { bg: "#fff", ink: "#141414" },
  { bg: "#0e2010", ink: "#edf1e4" },
  { bg: "#b5793f", ink: "#fff" },
];
const TILT = [-3, 2, -1.5, 3, -2.5, 1.5, -2, 2.5, -1];

export function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden pt-[clamp(40px,5vw,80px)] pb-[clamp(120px,12vw,190px)]"
    >

      <div className="shell relative">
        <div className="text-center">
          <h2
            className="display display-lg animated-text"
            style={{ color: "var(--deep)" }}
          >
            <Words text="Everything else" />
            <br />
            <Words text="we supply" base={0.18} />
          </h2>
          <p className="mt-6 text-[18px] leading-[1.55] text-[#333] max-w-[46ch] mx-auto">
            Bio Growth+ is the new range. It sits on top of a catalogue built
            over thirty-eight years.
          </p>
        </div>

        <ul className="mt-[clamp(40px,5vw,72px)] flex flex-wrap justify-center gap-x-3 gap-y-5 max-w-[1180px] mx-auto animated-block stagger">
          {PORTFOLIO.map((t, i) => {
            const s = SKINS[i % SKINS.length];
            return (
              <li
                key={t.name}
                className="stagger-item"
                style={{ animationDelay: `${(0.15 + i * 0.05).toFixed(3)}s` }}
              >
                <span
                  className="sticker"
                  style={{
                    background: s.bg,
                    color: s.ink,
                    transform: `rotate(${TILT[i % TILT.length]}deg)`,
                    boxShadow:
                      s.bg === "#fff"
                        ? "inset 0 0 0 2px #141414"
                        : "0 14px 24px -14px rgba(0,0,0,0.45)",
                  }}
                >
                  <span
                    className="display leading-none"
                    style={{ fontSize: "clamp(2rem, 3.8vw, 3.6rem)" }}
                  >
                    {t.name}
                  </span>
                  <span className="text-[14px] font-medium opacity-80 whitespace-nowrap">
                    {t.note}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <Wave fill="var(--soil-deep)" shape={2} lines lineColor="rgba(255,255,255,0.14)" />
    </section>
  );
}
