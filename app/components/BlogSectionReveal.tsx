"use client";

import { useEffect, useRef } from "react";

/** Animate existing content once, without hiding it when JavaScript is unavailable. */
export function BlogSectionReveal() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const article = ref.current?.parentElement;
    if (!article) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = Array.from(article.querySelectorAll<HTMLElement>("[data-photo-side]"));
    const pending = new Map<HTMLElement, Animation[]>();
    const sequences = new Map<HTMLElement, Animation[]>();
    const animations: Animation[] = [];
    const reveal = (section: HTMLElement) => {
      const sequence = pending.get(section);
      if (!sequence) return;
      sequence.forEach((animation) => animation.play());
      pending.delete(section);
      observer.unobserve(section);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target as HTMLElement);
      });
    }, { threshold: 0, rootMargin: "0px 0px -14% 0px" });

    const finishAll = () => {
      animations.forEach((animation) => animation.finish());
      pending.clear();
      observer.disconnect();
    };

    if (!motion.matches) {
      for (const section of sections) {
        const right = section.dataset.photoSide === "right";
        const sequence: Animation[] = [];
        const add = (element: Element, from: string, delay: number) => {
          const animation = element.animate([
            { opacity: 0, transform: from },
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
          ], { duration: 780, delay, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "both" });
          animation.pause();
          sequence.push(animation);
          animations.push(animation);
        };
        // Animate slots, not the measured photo-group wrapper used by the green trail.
        section.querySelectorAll(".blog-photo-slot").forEach((slot, index) => {
          add(slot, `translate3d(${right ? 42 : -42}px, 0, 0)`, index * 70);
        });
        section.querySelectorAll(".blog-visual-copy > .blog-eyebrow, .blog-article-title > .blog-eyebrow, h1, h2").forEach((heading, index) => {
          add(heading, "translate3d(0, -22px, 0)", 130 + index * 60);
        });
        section.querySelectorAll(".blog-visual-points li, .blog-article-intro, .blog-article-title > .blog-story-link, .blog-visual-takeaway").forEach((text, index) => {
          add(text, `translate3d(${right ? -30 : 30}px, 0, 0)`, 290 + index * 90);
        });
        pending.set(section, sequence);
        sequences.set(section, sequence);
        observer.observe(section);
      }
    }

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const section = event.target.closest<HTMLElement>("[data-photo-side]");
      if (!section) return;
      // Keyboard navigation always exposes a focused link immediately.
      const sequence = sequences.get(section);
      if (sequence) sequence.forEach((animation) => animation.finish());
      pending.delete(section);
      observer.unobserve(section);
    };
    const onMotion = () => { if (motion.matches) finishAll(); };
    article.addEventListener("focusin", onFocus);
    motion.addEventListener("change", onMotion);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      article.removeEventListener("focusin", onFocus);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return <span ref={ref} hidden aria-hidden="true" />;
}
