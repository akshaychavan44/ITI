"use client";

import { useRef, useState } from "react";
import { JOURNEY_MARKS } from "../lib/content";
import "./journey-timeline.css";

export function JourneyTimeline() {
  const [preview, setPreview] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const dismissed = useRef<string | null>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());
  const active = pinned ?? preview;

  const close = (year: string) => {
    dismissed.current = year;
    setPreview(null);
    setPinned(null);
    triggers.current.get(year)?.focus({ preventScroll: true });
  };

  return <div className="journey-timeline mt-14">
    <ol className="animated-block rise">
      {JOURNEY_MARKS.map((milestone, index) => {
        const open = active === milestone.year;
        const id = `journey-${milestone.year}`;
        return <li key={milestone.year} className="journey-milestone" style={{ animationDelay: `${(0.15 + index * 0.06).toFixed(3)}s` }}
          onMouseEnter={() => { if (dismissed.current !== milestone.year) setPreview(milestone.year); }}
          onMouseLeave={() => { setPreview(null); dismissed.current = null; }}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setPreview(null); dismissed.current = null; } }}
          onKeyDown={(event) => { if (event.key === "Escape" && open) { event.preventDefault(); event.stopPropagation(); close(milestone.year); } }}>
          <button type="button" className="journey-milestone-trigger" id={`${id}-trigger`} aria-expanded={open} aria-controls={`${id}-panel`}
            ref={(element) => { if (element) triggers.current.set(milestone.year, element); else triggers.current.delete(milestone.year); }}
            onFocus={() => { if (dismissed.current !== milestone.year) setPreview(milestone.year); }}
            onClick={() => { dismissed.current = milestone.year; setPreview(null); setPinned(pinned === milestone.year ? null : milestone.year); }}>
            <span className="journey-milestone-year display">{milestone.year}</span>
            <span className="journey-milestone-label">{milestone.label}</span>
          </button>
          <div id={`${id}-panel`} hidden={!open} role="region" aria-labelledby={`${id}-heading`}>
            {open && <div className="journey-milestone-panel">
              <div className="journey-milestone-panel-heading"><h3 id={`${id}-heading`}>{milestone.year}</h3><button type="button" onClick={() => close(milestone.year)} aria-label={`Close ${milestone.year} details`}>×</button></div>
              <p>{milestone.label}</p>
            </div>}
          </div>
        </li>;
      })}
    </ol>
  </div>;
}
