"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { BenefitIcon } from "./BenefitIcon";

export function ProductBenefits({ benefits }: { benefits: { title: string; explanation: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [height, setHeight] = useState<number>();
  const list = useRef<HTMLUListElement>(null);
  const id = useId();

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const triggers = Array.from(element.querySelectorAll<HTMLButtonElement>(".product-benefit-trigger"));
    const measure = () => {
      const headerHeight = triggers.reduce((sum, trigger) => sum + trigger.getBoundingClientRect().height + 2, 0);
      const gap = parseFloat(getComputedStyle(element).rowGap) || 0;
      // Reserve one answer's space independently of which benefit is open.
      setHeight(Math.ceil(headerHeight + Math.max(triggers.length - 1, 0) * gap + 80));
    };
    const observer = new ResizeObserver(measure);
    triggers.forEach((trigger) => observer.observe(trigger));
    measure();
    return () => observer.disconnect();
  }, [benefits]);

  return (
    <ul ref={list} className="product-benefit-list" style={{ "--benefits-height": height ? `${height}px` : `${benefits.length * 70 + 80}px` } as CSSProperties}>
      {benefits.map((benefit, index) => {
        const expanded = open === index;
        const triggerId = `${id}-benefit-${index}`;
        const panelId = `${triggerId}-explanation`;
        return (
          <li key={benefit.title} className="product-benefit" data-open={expanded ? "" : undefined}>
            <button type="button" id={triggerId} className="product-benefit-trigger" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : index)}>
              <span className="benefit-symbol"><BenefitIcon title={benefit.title} /></span>
              <span className="benefit-title">{benefit.title}</span>
              <span className="product-benefit-icon" aria-hidden><span /><span /></span>
            </button>
            <div id={panelId} className="product-benefit-panel" role="region" aria-labelledby={triggerId} aria-hidden={!expanded}>
              <div className="benefit-answer-scroll" tabIndex={expanded ? 0 : -1}><p>{benefit.explanation}</p></div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
