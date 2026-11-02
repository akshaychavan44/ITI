"use client";

import { useEffect, useRef } from "react";

/** Connect the measured photo groups through section whitespace. */
export type BlogTrailStyle = "curve" | "rounded" | "wave" | "sweep";

export function BlogImageTrail({ variant = "rounded" }: { variant?: BlogTrailStyle }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    const article = svg?.parentElement;
    if (!svg || !article) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let segments: { path: SVGPathElement; dot: SVGCircleElement; start: number; end: number; progress: number }[] = [];

    const draw = (time: number) => {
      frame = 0;
      const delta = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      // Time-based easing keeps the same feel on 60 Hz and 120 Hz displays.
      const ease = 1 - Math.exp(-delta / 110);
      const top = article.getBoundingClientRect().top;
      const reveal = window.innerHeight * .78 - top;
      let settling = false;
      for (const segment of segments) {
        const target = motion.matches ? 1 : Math.max(0, Math.min(1, (reveal - segment.start) / Math.max(1, segment.end - segment.start)));
        segment.progress = motion.matches ? target : segment.progress + (target - segment.progress) * ease;
        if (Math.abs(target - segment.progress) < .0003) segment.progress = target;
        else settling = true;
        segment.path.style.strokeDashoffset = String(1 - segment.progress);
        segment.dot.style.opacity = String(Math.max(0, Math.min(1, (segment.progress - .9) / .1)));
      }
      if (settling) frame = requestAnimationFrame(draw);
      else lastTime = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const measure = () => {
      const root = article.getBoundingClientRect();
      const groups = Array.from(article.querySelectorAll<HTMLElement>(".blog-photo-composition"));
      const ns = "http://www.w3.org/2000/svg";
      const previous = segments;
      svg.replaceChildren();
      svg.setAttribute("viewBox", `0 0 ${root.width} ${article.offsetHeight}`);
      segments = groups.slice(0, -1).map((group, index) => {
        const a = group.getBoundingClientRect();
        const b = groups[index + 1].getBoundingClientRect();
        const mobile = window.innerWidth < 768;
        const x1 = mobile ? a.left - root.left + 8 : a.left - root.left + a.width / 2;
        const x2 = mobile ? b.left - root.left + 8 : b.left - root.left + b.width / 2;
        const y1 = a.bottom - root.top + 5;
        const y2 = b.top - root.top - 5;
        const owner = group.closest("header, section")?.getBoundingClientRect();
        const middle = Math.min(y2 - 14, Math.max(y1 + 14, (owner?.bottom ?? a.bottom) - root.top));
        const direction = x2 >= x1 ? 1 : -1;
        const radius = Math.min(24, Math.abs(x2 - x1) / 3, (middle - y1) / 2, (y2 - middle) / 2);
        const dx = x2 - x1;
        const midX = (x1 + x2) / 2;
        const band = Math.max(0, Math.min(20, middle - y1, y2 - middle));
        let d: string;
        if (mobile) {
          const gutter = variant === "rounded" ? -6 : -12;
          const midY = (y1 + y2) / 2;
          d = variant === "wave"
            ? `M ${x1} ${y1} C ${gutter} ${y1 + 24}, ${gutter} ${midY - 24}, -2 ${midY} S ${gutter} ${y2 - 24}, ${x2} ${y2}`
            : `M ${x1} ${y1} C ${gutter} ${y1 + 18}, ${gutter} ${y2 - 18}, ${x2} ${y2}`;
        } else if (variant === "curve") {
          d = `M ${x1} ${y1} L ${x1} ${middle - band} C ${x1} ${middle + band}, ${x2} ${middle - band}, ${x2} ${middle + band} L ${x2} ${y2}`;
        } else if (variant === "wave") {
          d = `M ${x1} ${y1} L ${x1} ${middle - band} C ${x1} ${middle + band}, ${x1 + dx * .25} ${middle + band}, ${midX} ${middle} S ${x2} ${middle - band}, ${x2} ${middle + band} L ${x2} ${y2}`;
        } else if (variant === "sweep") {
          d = `M ${x1} ${y1} L ${x1} ${middle - band} Q ${x1} ${middle + band}, ${midX} ${middle + band} Q ${x2} ${middle + band}, ${x2} ${middle - band} L ${x2} ${y2}`;
        } else {
          d = `M ${x1} ${y1} L ${x1} ${middle - radius} Q ${x1} ${middle}, ${x1 + direction * radius} ${middle} L ${x2 - direction * radius} ${middle} Q ${x2} ${middle}, ${x2} ${middle + radius} L ${x2} ${y2}`;
        }
        const path = document.createElementNS(ns, "path");
        path.setAttribute("d", d);
        path.setAttribute("pathLength", "1");
        path.setAttribute("class", "blog-trail-stroke");
        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("cx", String(x2));
        dot.setAttribute("cy", String(y2));
        dot.setAttribute("r", "5");
        svg.append(path, dot);
        return { path, dot, start: y1, end: y2, progress: previous[index]?.progress ?? 0 };
      });
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(article);
    article.querySelectorAll(".blog-photo-composition").forEach((group) => observer.observe(group));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", schedule);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", schedule);
    };
  }, [variant]);

  return <svg ref={ref} className="blog-image-trail" data-trail-style={variant} aria-hidden="true" focusable="false" />;
}
