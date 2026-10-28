"use client";

import { useEffect } from "react";

/** Drifts every [data-speed] element against the scroll. Writes a single
 *  --py custom property, so the element's own bob animation (on its
 *  child) and rotation are left alone. */
export function Parallax() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-speed]"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      // a narrow column has no room to drift into, so phones get less
      const damp = window.innerWidth < 1024 ? 0.4 : 1;
      for (const el of els) {
        const speed = (Number(el.dataset.speed) || 0) * damp;
        const current = Number(el.dataset.py) || 0;
        const r = el.getBoundingClientRect();
        if (r.bottom < -400 || r.top > window.innerHeight + 400) continue;
        // position without our own offset, so it can't feed back on itself
        const centre = r.top - current + r.height / 2;
        const py = Math.round((centre - mid) * speed * -1 * 10) / 10;
        el.dataset.py = String(py);
        el.style.setProperty("--py", `${py}px`);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
