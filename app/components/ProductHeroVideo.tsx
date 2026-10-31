"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function ProductHeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (reducedMotion.matches) {
        video.pause();
        delete video.dataset.playing;
        video.removeAttribute("src");
        video.load();
      } else {
        video.src = "/videos/products-sunrise-loop.mp4";
        void video.play().catch(() => { delete video.dataset.playing; });
      }
    };
    update();
    reducedMotion.addEventListener("change", update);
    return () => {
      reducedMotion.removeEventListener("change", update);
      video.pause();
    };
  }, []);

  return (
    <>
      <Image src="/photos/products-sunrise.webp" alt="" fill priority sizes="100vw" className="object-cover object-[center_45%]" />
      <video
        ref={ref}
        className="catalogue-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={(event) => { event.currentTarget.dataset.playing = ""; }}
        onError={(event) => { delete event.currentTarget.dataset.playing; }}
      />
    </>
  );
}
