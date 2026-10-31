"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Chevron } from "./Icons";

const OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "az", label: "Name: A–Z" },
  { value: "za", label: "Name: Z–A" },
];

export function ProductSort({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const selected = OPTIONS.findIndex((option) => option.value === value);
  const focusOption = (index: number) => root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]')[index]?.focus();
  const show = (index: number) => {
    setOpen(true);
    requestAnimationFrame(() => focusOption(index));
  };
  const close = () => { setOpen(false); trigger.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? []);
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); }
    else if (event.key === "Tab") { setOpen(false); trigger.current?.focus(); }
    else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      focusOption(event.key === "Home" ? 0 : event.key === "End" ? OPTIONS.length - 1 : (current + (event.key === "ArrowDown" ? 1 : -1) + OPTIONS.length) % OPTIONS.length);
    }
  };

  return (
    <div ref={root} className="catalogue-sort" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button
        ref={trigger}
        type="button"
        className="catalogue-sort-trigger"
        aria-label={`Sort products: ${OPTIONS[selected].label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        onClick={() => open ? close() : show(selected)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); show(event.key === "ArrowDown" ? selected : OPTIONS.length - 1); }
        }}
      >
        <span><span className="catalogue-sort-prefix">Sort:</span> {OPTIONS[selected].label}</span>
        <span className="catalogue-sort-chevron" data-open={open ? "" : undefined}><Chevron size={14} /></span>
      </button>
      {open && (
        <div id={`${id}-menu`} role="menu" aria-label="Sort products" className="catalogue-sort-menu" onKeyDown={navigate}>
          {OPTIONS.map((option) => (
            <button key={option.value} type="button" role="menuitemradio" aria-checked={value === option.value} tabIndex={-1} onClick={() => { onChange(option.value); close(); }}>
              <span>{option.label}</span>
              {value === option.value && <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden><path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
