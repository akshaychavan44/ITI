import type { CSSProperties } from "react";
import { type Product } from "../lib/content";

type Nutrient = { symbol: string; label: string; value: string; color: string };
const nutrient = (symbol: string, label: string, value: string, color: string): Nutrient => ({ symbol, label, value, color });
const GREEN = "#5b812b", AMBER = "#ac7626", BLUE = "#3a7393", GOLD = "#9d841b", SILVER = "#808580", PURPLE = "#96589b";
const COMPOSITION: Record<string, Nutrient[]> = {
  "growth-booster": [nutrient("N", "Nitrogen", "1.5–2%", GREEN), nutrient("P", "Phosphorus", "0.20–0.50%", AMBER), nutrient("K", "Potassium", "0.50–0.80%", BLUE), nutrient("C", "Organic carbon", "23%", GOLD), nutrient("Pr", "Protein", "30–35%", PURPLE), nutrient("Ash", "Ash", "15%", SILVER)],
  "bio-guard": [nutrient("10", "Microbial groups", "10-in-1 blend", GREEN), nutrient("CFU", "Cells per gram", "≥ 5 × 10⁷", BLUE)],
  "organic-phospho": [nutrient("N", "Nitrogen", "0.4–1.0%", GREEN), nutrient("P", "Phosphorus", "8–20%", AMBER), nutrient("C", "Organic carbon", "14%", GOLD), nutrient("C:N", "C:N ratio", "Below 20%", PURPLE)],
  "potash-plus": [nutrient("N", "Nitrogen", "1.66%", GREEN), nutrient("P", "Phosphorus", "0.38%", AMBER), nutrient("K", "Potassium", "14.50%", BLUE)],
  "phospho-gypsum": [nutrient("Ca", "CaSO₄·2H₂O", "70%", SILVER), nutrient("S", "SO₃", "13%", AMBER)],
  "jio-gypsum": [nutrient("Ca", "CaSO₄·2H₂O", "70%", SILVER), nutrient("S", "SO₃", "13%", AMBER), nutrient("Mg+", "Mg · B · Fe · Zn · Mn", "Added micronutrients", GREEN)],
};

export function ProductComposition({ product }: { product: Product }) {
  const items = COMPOSITION[product.id];
  return (
    <div className="product-composition-visual">
      <p className="catalogue-eyebrow">Inside the formulation</p>
      <h2 className="display">Composition</h2>
      <dl className="composition-badges" data-compact={items.length > 3 ? "" : undefined}>
        {items.map((item) => (
          <div key={item.symbol} className="composition-badge">
            <dt><span className="composition-orb" style={{ "--nutrient-color": item.color } as CSSProperties} aria-hidden>{item.symbol}</span><span>{item.label}</span></dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="composition-caption">{product.short} · Granular</p>
      {product.id === "bio-guard" && <div className="composition-cultures">{product.spec.map((spec) => <p key={spec}>{spec}</p>)}</div>}
    </div>
  );
}
