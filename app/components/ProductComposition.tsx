import { PRODUCT_COMPOSITION } from "../lib/product-composition";
import type { CSSProperties } from "react";
import { type Product } from "../lib/content";


export function ProductComposition({ product }: { product: Product }) {
  const items = PRODUCT_COMPOSITION[product.id];
  return (
    <div className="product-composition-visual">
      <p className="catalogue-eyebrow">Inside the formulation</p>
      <h2 className="display">Composition</h2>
      <dl className={product.id === "growth-booster" ? "composition-badges composition-badges-wrap" : "composition-badges"} data-compact={items.length > 3 ? "" : undefined}>
        {items.map((item) => (
          <div key={item.symbol} className="composition-badge">
            <dt><span className="composition-orb" style={{ "--nutrient-color": item.color } as CSSProperties} aria-hidden>{item.symbol}</span><span>{item.label}</span></dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      <p className="composition-caption">{product.short} · {product.id === "growth-booster" ? "Solid / Powder" : "Granular"}</p>
      {product.id === "bio-guard" && <div className="composition-cultures">{product.spec.map((spec) => <p key={spec}>{spec}</p>)}</div>}
    </div>
  );
}
