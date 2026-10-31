"use client";

import { useId, useState, type ReactNode } from "react";

export function GrowthInformationAccordion({ items }: { items: { title: string; content: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  return <div className="growth-accordions">{items.map((item, index) => {
    const expanded = open === index;
    const trigger = `${id}-${index}`;
    return <div className="growth-accordion" key={item.title} data-open={expanded ? "" : undefined}>
      <button className="growth-accordion-trigger" type="button" id={trigger} aria-expanded={expanded} aria-controls={`${trigger}-panel`} onClick={() => setOpen(expanded ? null : index)}>
        <span>{item.title}</span><span className="growth-accordion-plus" aria-hidden>+</span>
      </button>
      <div className="growth-accordion-panel" id={`${trigger}-panel`} role="region" aria-labelledby={trigger} aria-hidden={!expanded} inert={!expanded}>
        <div>{item.content}</div>
      </div>
    </div>;
  })}</div>;
}
