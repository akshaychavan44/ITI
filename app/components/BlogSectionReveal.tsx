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
    const pending = new Map<Element, Animation>();
    const sequences = new Map<Element, Animation>();
    const animations: Animation[] = [];
    const reveal = (element: Element) => {
      const animation = pending.get(element);
      if (!animation) return;
      animation.play();
      pending.delete(element);
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= .2) reveal(entry.target);
      });
    }, { threshold: .2, rootMargin: "-90px 0px -10% 0px" });

    const finishAll = () => {
      animations.forEach((animation) => animation.finish());
      pending.clear();
      observer.disconnect();
    };

    if (!motion.matches) {
      for (const section of sections) {
        const right = section.dataset.photoSide === "right";
        const add = (element: Element, from: string, delay: number) => {
          const animation = element.animate([
            { opacity: 0, transform: from },
            { opacity: 1, transform: "translate3d(0, 0, 0)" },
          ], { duration: 1250, delay, easing: "cubic-bezier(.22, .75, .25, 1)", fill: "both" });
          animation.pause();
          // Observe the actual image, heading or text, not its taller parent section.
          pending.set(element, animation);
          sequences.set(element, animation);
          animations.push(animation);
          observer.observe(element);
        };
        // Keep the photo layout stable while each image eases into place.
        section.querySelectorAll(".blog-photo-slot").forEach((slot, index) => {
          add(slot, `translate3d(${right ? 42 : -42}px, 0, 0)`, index * 80);
        });
        section.querySelectorAll(".blog-visual-copy > .blog-eyebrow, .blog-article-title > .blog-eyebrow, h1, h2").forEach((heading, index) => {
          add(heading, "translate3d(0, -22px, 0)", 120 + index * 80);
        });
        section.querySelectorAll(".blog-visual-points li, .blog-article-intro, .blog-article-title > .blog-story-link, .blog-visual-takeaway").forEach((text, index) => {
          add(text, `translate3d(${right ? -30 : 30}px, 0, 0)`, 240 + index * 100);
        });
      }
    }

    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const section = event.target.closest<HTMLElement>("[data-photo-side]");
      if (!section) return;
      // Keyboard navigation always exposes a focused link immediately.
      sequences.forEach((animation, element) => {
        if (!section.contains(element)) return;
        animation.finish();
        pending.delete(element);
        observer.unobserve(element);
      });
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
