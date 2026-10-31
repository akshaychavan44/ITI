"use client";

import { useMemo, useSyncExternalStore } from "react";
import { CATALOGUE_PRODUCTS } from "./catalogue";

const KEY = "biogrowth:compare";
const EVENT = "biogrowth:compare-change";
let fallback = "";

export function validComparisonIds(ids: string[]) {
  return [...new Set(ids)].filter((id) => CATALOGUE_PRODUCTS.some((p) => p.id === id)).slice(0, 3);
}
function snapshot() {
  try { return localStorage.getItem(KEY) ?? fallback; } catch { return fallback; }
}
function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => { window.removeEventListener(EVENT, callback); window.removeEventListener("storage", callback); };
}
export function saveComparison(ids: string[]) {
  fallback = validComparisonIds(ids).join(",");
  try { localStorage.setItem(KEY, fallback); } catch { /* Selection still works for this visit. */ }
  window.dispatchEvent(new Event(EVENT));
}
export function useComparison() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  const ids = useMemo(() => validComparisonIds(raw.split(",")), [raw]);
  return {
    ids,
    toggle: (id: string) => saveComparison(ids.includes(id) ? ids.filter((item) => item !== id) : ids.length < 3 ? [...ids, id] : ids),
    remove: (id: string) => saveComparison(ids.filter((item) => item !== id)),
    clear: () => saveComparison([]),
  };
}
