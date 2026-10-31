"use client";

import Image from "next/image";
import Link from "next/link";
import { CATALOGUE_PRODUCTS, productHref } from "../lib/catalogue";
import { ArrowUpRight } from "./Icons";

const KEY_DETAILS: Record<string, { composition: string; benefits: string[] }> = {
  "growth-booster": { composition: "N 1.5–2% · P 0.20–0.50% · K 0.50–0.80%; organic carbon 23%", benefits: ["Supports root growth", "Supports soil microbial activity"] },
  "bio-guard": { composition: "10 microbial groups · CFU ≥ 5 × 10⁷ cells/g", benefits: ["Supports soil fertility", "Improves nutrient availability"] },
  "organic-phospho": { composition: "N 0.4–1.0% · P 8–20% · organic carbon 14%", benefits: ["Supports root growth", "Increases phosphorus availability"] },
  "potash-plus": { composition: "N 1.66% · P 0.38% · K 14.50%", benefits: ["Supports fruit and vegetable quality", "Supports plant resilience"] },
  "phospho-gypsum": { composition: "CaSO₄·2H₂O 70% · SO₃ 13%", benefits: ["Conditions alkaline soil", "Supports root and stem strength"] },
  "jio-gypsum": { composition: "CaSO₄·2H₂O 70% · SO₃ 13%; added micronutrients", benefits: ["Conditions alkaline soil", "Supports root and stem strength"] },
};

export function ProductComparison({ ids, onRemove, onClose }: { ids: string[]; onRemove: (id: string) => void; onClose: () => void }) {
  const products = ids.map((id) => CATALOGUE_PRODUCTS.find((p) => p.id === id)!);
  if (ids.length < 2) return <div className="compare-popup-empty"><p>Select at least two products to compare.</p><button type="button" className="compare-now" onClick={onClose}>Continue browsing</button></div>;
  return (
    <div className="compare-popup-scroll" role="region" aria-label="Product comparison; scroll to see more" tabIndex={0}>
      <table className="compare-popup-table">
        <caption className="sr-only">Key differences between {products.map((p) => p.name).join(", ")}</caption>
        <thead><tr><th scope="col"><span className="sr-only">Product</span></th>{products.map((p) => <th key={p.id} scope="col"><div className="compare-popup-product"><button type="button" className="compare-popup-remove" aria-label={`Remove ${p.name} from comparison`} onClick={() => onRemove(p.id)}>×</button><div className="compare-popup-art" style={{ background: `color-mix(in srgb, ${p.hex} 10%, #fff)` }}><Image src={p.cutout} alt={`${p.name} pack`} width={52} height={89} sizes="52px" /><span className="display">{p.name}</span></div></div></th>)}</tr></thead>
        <tbody>
          <tr><th scope="row">Purpose</th>{products.map((p) => <td key={p.id}>{p.summary}</td>)}</tr>
          <tr><th scope="row">Key composition</th>{products.map((p) => <td key={p.id}>{KEY_DETAILS[p.id].composition}</td>)}</tr>
          <tr><th scope="row">Top benefits</th>{products.map((p) => <td key={p.id}><ul>{KEY_DETAILS[p.id].benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></td>)}</tr>
          <tr><th scope="row">Pack size</th>{products.map((p) => <td key={p.id}>{p.pack}</td>)}</tr>
          <tr><th scope="row">Label dosage</th>{products.map((p) => <td key={p.id}>{p.dosage}</td>)}</tr>
          <tr><th scope="row"><span className="sr-only">Full details</span></th>{products.map((p) => <td key={p.id}><Link href={productHref(p.id)} onClick={onClose} className="compare-popup-link" aria-label={`View ${p.name}`}>View product <ArrowUpRight size={14} /></Link></td>)}</tr>
        </tbody>
      </table>
    </div>
  );
}
