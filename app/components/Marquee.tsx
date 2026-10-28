import { MARQUEE } from "../lib/content";
import { Wave } from "./Wave";

function PlusMark() {
  return (
    <svg viewBox="0 0 60 60" className="inline-block w-[0.62em] h-[0.62em] mx-[0.45em] align-[0.08em]" aria-hidden>
      <rect x="21" y="3" width="18" height="54" rx="9" fill="#5aa912" />
      <rect x="3" y="21" width="54" height="18" rx="9" fill="#8dc63f" />
    </svg>
  );
}

/** The field band under the story wave: the whole book, scrolling.
 *  Its wave runs into the sky of the pinned scene below. */
export function Marquee() {
  const run = [...MARQUEE, ...MARQUEE];
  return (
    <div className="band-field relative overflow-hidden pt-4 pb-[clamp(80px,9vw,140px)]">
      <div className="marquee" aria-hidden>
        {run.map((m, i) => (
          <span
            key={i}
            className="display whitespace-nowrap leading-none"
            style={{ fontSize: "clamp(3rem, 6.4vw, 6rem)" }}
          >
            {m}
            <PlusMark />
          </span>
        ))}
      </div>
      <span className="sr-only">{MARQUEE.join(", ")}</span>
      <Wave fill="var(--deep)" shape={2} />
    </div>
  );
}
