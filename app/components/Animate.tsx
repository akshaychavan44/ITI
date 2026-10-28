"use client";

import { useEffect } from "react";

/** Adds .inview to each animated block as it enters the viewport, which
 *  is what starts the bounceUp entrances. Transform/opacity only, so a
 *  revealing element can never hide itself from its own observer. */
export function Animate() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(
      ".animated-text, .animated-block",
    );

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("inview"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("inview");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return null;
}
