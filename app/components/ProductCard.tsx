import Image from "next/image";
import Link from "next/link";
import { BAG } from "../lib/content";
import { productHref, type CatalogueProduct } from "../lib/catalogue";
import { Arrow } from "./Icons";
import { CompareToggle } from "./CompareToggle";

export function ProductCard({ product: p }: { product: CatalogueProduct }) {
  return (
    <article className="catalogue-product-item">
    <Link href={productHref(p.id)} className="catalogue-card group">
      <div className="catalogue-card-art" style={{ background: `color-mix(in srgb, ${p.hex} 15%, #fff)` }}>
        <span className="catalogue-pack-label">{p.pack}</span>
        <span className="catalogue-ghost display" style={{ color: p.hex }} aria-hidden>{p.name}</span>
        <Image
          src={p.cutout}
          alt={`${p.name}, ${p.pack} pack`}
          width={BAG.w}
          height={BAG.h}
          sizes="(min-width: 1024px) 250px, (min-width: 640px) 32vw, 55vw"
          className="catalogue-pack"
        />
      </div>
      <div className="catalogue-card-copy">
        <h2 className="display">{p.name}</h2>
        <p>{p.summary}</p>
        <div className="catalogue-card-link">
          <span>View product</span>
          <span className="catalogue-card-arrow"><Arrow size={18} /></span>
        </div>
      </div>
    </Link>
    <CompareToggle id={p.id} name={p.name} />
    </article>
  );
}
