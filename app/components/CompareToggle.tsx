"use client";

import { useComparison } from "../lib/comparison";

export function CompareToggle({ id, name, detail = false }: { id: string; name: string; detail?: boolean }) {
  const { ids, toggle } = useComparison();
  const selected = ids.includes(id);
  const full = ids.length >= 3 && !selected;
  return (
    <label className={`compare-toggle ${detail ? "compare-toggle-detail" : ""}`} data-disabled={full ? "" : undefined}>
      <input type="checkbox" checked={selected} disabled={full} onChange={() => toggle(id)} aria-label={`Compare ${name}`} />
      <span>{selected ? "Added to comparison" : detail ? "Compare this product" : "Compare"}</span>
      {full && <span className="compare-limit">3 selected</span>}
    </label>
  );
}
