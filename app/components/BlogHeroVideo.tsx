"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/blog-field-loop.mp4";

export function BlogHeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    const update = () => {
      if (motion.matches || document.hidden || !inView || manuallyPaused.current) {
        video.pause();
        if (motion.matches) delete video.dataset.playing;
        return;
      }
      if (!video.getAttribute("src")) video.src = VIDEO_SRC;
      void video.play().catch(() => { delete video.dataset.playing; });
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(video);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = ref.current;
    if (!video) return;
    if (!video.paused) {
      manuallyPaused.current = true;
      video.pause();
    } else {
      manuallyPaused.current = false;
      if (!video.getAttribute("src")) video.src = VIDEO_SRC;
      void video.play().catch(() => { delete video.dataset.playing; });
    }
  };

  return <>
    <div className="blog-hero-media" aria-hidden="true">
      <Image src="/photos/blog-field-poster.webp" alt="" fill priority sizes="100vw" className="blog-hero-photo" />
      <video ref={ref} className="blog-hero-video" muted loop playsInline preload="metadata" tabIndex={-1}
        onPlaying={(event) => { event.currentTarget.dataset.playing = ""; setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onError={(event) => { delete event.currentTarget.dataset.playing; setPlaying(false); }}
      />
    </div>
    <button type="button" className="blog-video-toggle" onClick={togglePlayback} aria-label={playing ? "Pause background video" : "Play background video"}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{playing ? <path d="M4 3h3v10H4zm5 0h3v10H9z" /> : <path d="m5 2 9 6-9 6z" />}</svg>
      <span>{playing ? "Pause" : "Play"}</span>
    </button>
  </>;
}
