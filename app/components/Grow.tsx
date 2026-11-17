"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Wave } from "./Wave";

/* A filmed sequence — a glowing granule settles into the soil, roots
   spread, and a crop grows up out of it — scrubbed by scroll while the
   stage is pinned, with one caption per stage of the film.

   The clips in /videos are encoded with a keyframe every 4 frames and no
   B-frames, so seeking backwards and forwards stays smooth. The portrait
   cut is used on tall screens so the plant isn't cropped away. */

const SRC_WIDE = "/videos/grow-scrub.mp4";
const SRC_TALL = "/videos/grow-scrub-portrait.mp4";
const POSTER_START = "/photos/grow-poster-start.webp";
const POSTER_END = "/photos/grow-poster-end.webp";

const STEPS = [
  {
    title: "One granule",
    body: "Living cultures, organic carbon and nutrients, packed into a single Bio Growth+ granule.",
  },
  {
    title: "Into the soil",
    body: "With the first irrigation or rain it breaks down, and the microbes wake up the root zone.",
  },
  {
    title: "Roots first",
    body: "Nutrients stay where the crop can reach them, so a deeper, denser root system forms.",
  },
  {
    title: "Then the crop",
    body: "Strong roots carry a crop that stands up green, healthy and even across the field.",
  },
];

/* Where each caption takes over, as a share of the film: the granule
   lands by ~1.5s, roots fill out by ~4.2s, the shoot is up by ~8.8s. */
const STEP_STARTS = [0, 0.11, 0.29, 0.6];
/* Hold the first and last frames for a moment at either end of the run. */
const FILM_IN = 0.03;
const FILM_OUT = 0.94;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

function stepAt(f: number) {
  let i = 0;
  while (i < STEP_STARTS.length - 1 && f >= STEP_STARTS[i + 1]) i++;
  return i;
}

export function Grow() {
  const stage = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = stage.current;
    const sec = section.current;
    const vid = video.current;
    if (!el || !sec || !vid) return;

    /* Scroll progress and film position both go onto the stage as
       custom properties; the captions and progress rail read them in CSS. */
    const paint = (p: number) => {
      const f = seg(p, FILM_IN, FILM_OUT);
      el.style.setProperty("--p", p.toFixed(4));
      STEP_STARTS.forEach((start, i) => {
        const end = STEP_STARTS[i + 1] ?? 1;
        el.style.setProperty(`--s${i}`, seg(f, start, end).toFixed(4));
      });
      el.style.setProperty("--end", seg(p, 0.9, 0.98).toFixed(4));
      el.dataset.step = String(stepAt(f));
      return f;
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      paint(1);
      el.dataset.step = "all";
      return;
    }

    const tall = window.matchMedia("(max-aspect-ratio: 1/1)");
    const pickSource = () => {
      const src = tall.matches ? SRC_TALL : SRC_WIDE;
      if (vid.getAttribute("src") !== src) {
        vid.src = src;
        vid.load();
      }
    };
    pickSource();
    tall.addEventListener("change", pickSource);

    /* iOS only decodes frames for seeking once playback has started. */
    const prime = () => {
      el.dataset.ready = "";
      vid.play().then(() => vid.pause()).catch(() => {});
    };
    vid.addEventListener("loadeddata", prime);

    let target = 0; // film position the scroll asks for, 0–1
    let shown = 0; // eased position actually on screen
    let frame = 0;
    let inView = false;

    const measure = () => {
      const box = sec.getBoundingClientRect();
      // how far the stage stays pinned: the section, less the wave strip
      // under it and the stage's own height
      const pad = parseFloat(getComputedStyle(sec).paddingBottom) || 0;
      const travel = Math.max(1, sec.offsetHeight - pad - el.offsetHeight);
      target = paint(clamp01(-box.top / travel));
    };

    // ease the film toward the scroll position so fast flicks don't
    // stutter, and only seek when the decoder is free
    const tick = () => {
      frame = 0;
      shown += (target - shown) * 0.2;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      const d = vid.duration;
      if (d && !vid.seeking) {
        const t = shown * (d - 0.05);
        if (Math.abs(vid.currentTime - t) > 1 / 60) vid.currentTime = t;
      }
      if (inView && shown !== target) frame = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!inView) return;
      measure();
      kick();
    };
    // a seek that was skipped while the decoder was busy catches up here
    vid.addEventListener("seeked", kick);
    vid.addEventListener("loadedmetadata", kick);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(sec);

    measure();
    shown = target;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      tall.removeEventListener("change", pickSource);
      vid.removeEventListener("loadeddata", prime);
      vid.removeEventListener("seeked", kick);
      vid.removeEventListener("loadedmetadata", kick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={section} id="how" className="grow" aria-labelledby="grow-title">
      <div ref={stage} className="grow-stage" data-step="0">
        {/* reduced motion: no film, just the grown crop */}
        <Image src={POSTER_END} alt="" fill sizes="100vw" className="grow-still" />
        <video
          ref={video}
          className="grow-film"
          poster={POSTER_START}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
        {/* warm sunlight from the top right, rising as the crop grows */}
        <div className="grow-sun" aria-hidden />
        <div className="grow-shade" aria-hidden />

        <div className="grow-copy shell">
          <div className="grow-panel">
            <p className="grow-eyebrow">
              <span className="grow-eyebrow-rule" aria-hidden />
              How Bio Growth+ works
            </p>
            <h2 id="grow-title" className="sr-only">
              How Bio Growth+ works, from one granule to a standing crop
            </h2>
            <ol className="grow-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grow-step" data-i={i}>
                  <p className="grow-num tabular-nums" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                    <span> / {String(STEPS.length).padStart(2, "0")}</span>
                  </p>
                  <p className="display grow-title">{s.title}</p>
                  <p className="grow-body">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="grow-rail" aria-hidden>
              {STEPS.map((s, i) => (
                <span key={s.title} className="grow-rail-seg" data-i={i}>
                  <span style={{ transform: `scaleX(var(--s${i}))` }} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <Image
          src="/brand/logo-bio-growth-light.png"
          alt=""
          width={225}
          height={182}
          className="grow-mark"
          aria-hidden
        />
      </div>

      <Wave fill="var(--mint)" shape={2} />
    </section>
  );
}
