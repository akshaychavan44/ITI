type Kind = "leaf" | "roots" | "sprout" | "shield" | "water" | "growth";

export function BenefitIcon({ title }: { title: string }) {
  const text = title.toLowerCase();
  const kind: Kind = /water|drought|heat/.test(text) ? "water" : /pest|disease|termite|resistance/.test(text) ? "shield" : /root/.test(text) ? "roots" : /lodging|stem|flower|fruit/.test(text) ? "sprout" : /fertility|nutrient|npk/.test(text) ? "growth" : "leaf";
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {kind === "leaf" && <><path d="M16 28V16M16 22C5 22 4 13 5 6c8 0 14 4 11 13M17 17C15 8 21 4 28 3c1 9-2 15-11 14" /><path d="m8 10 8 10m8-11-7 8" /></>}
      {kind === "roots" && <><path d="M16 3v25M16 10c-5 0-7-3-7-6 5 0 7 2 7 6m0-2c3-4 5-4 8-4 0 4-3 7-8 7M16 14l-4 7-5 4m9-11 4 7 5 4m-14-3-1 6m11-6 1 6M7 20l5-3m8 0 5 3" /></>}
      {kind === "sprout" && <><path d="M5 28h22M16 27V12M16 19C7 20 5 15 4 11c7-1 12 1 12 8m0-4c0-8 5-11 12-10 0 7-4 11-12 10M16 11c-5-1-7-4-6-8 5 0 7 3 6 8" /></>}
      {kind === "shield" && <><path d="m16 3 11 4v9c0 7-6 11-11 14C11 27 5 23 5 16V7l11-4Z" /><path d="m11 16 4 4 7-8" /></>}
      {kind === "water" && <><path d="M16 3S6 15 6 21a10 10 0 0 0 20 0C26 15 16 3 16 3Z" /><path d="M11 20c-1 4 1 6 4 6" /></>}
      {kind === "growth" && <><path d="M4 28h24M7 25v-7h4v7m4 0V13h4v12m4 0V8h4v17M5 13l7-6 6 2 8-6m-6 0h6v6" /></>}
    </svg>
  );
}
