"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { usePathname } from "next/navigation";
import { CATALOGUE_PRODUCTS } from "../lib/catalogue";
import { saveComparison, useComparison, validComparisonIds } from "../lib/comparison";
import { Arrow } from "./Icons";
import { ProductComparison } from "./ProductComparison";

export function ComparisonBar() {
  const { ids, remove, clear } = useComparison();
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const overflow = useRef("");
  const headingId = useId();
  const open = () => {
    if (!dialog.current || dialog.current.open) return;
    overflow.current = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    const element = dialog.current;
    element?.close();
    const url = new URL(window.location.href);
    if (url.searchParams.has("compare")) {
      const initial = validComparisonIds((url.searchParams.get("compare") ?? "").split(","));
      saveComparison(initial);
      if (initial.length >= 2 && element) {
        overflow.current = document.body.style.overflow;
        element.showModal();
        document.body.style.overflow = "hidden";
      }
    }
    return () => { if (element?.open) { element.close(); document.body.style.overflow = overflow.current; } };
  }, [pathname]);
  return (
    <>
      {ids.length > 0 && pathname !== "/products/compare" && <>
      <div className="comparison-bar-space" aria-hidden />
      <aside className="comparison-bar" aria-label="Selected products for comparison">
        <div className="comparison-bar-title"><strong>Compare products</strong><span role="status">{ids.length} of 3 selected{ids.length === 1 ? " · Select one more" : ""}</span></div>
        <ul className="comparison-bar-products">{ids.map((id) => {
          const product = CATALOGUE_PRODUCTS.find((p) => p.id === id)!;
          return <li key={id}><Image src={product.cutout} alt="" width={24} height={40} /><span>{product.name}</span><button type="button" onClick={() => remove(id)} aria-label={`Remove ${product.name} from comparison`}>×</button></li>;
        })}</ul>
        <div className="comparison-bar-actions"><button type="button" onClick={clear}>Clear</button><button type="button" className="compare-now" disabled={ids.length < 2} onClick={open} aria-haspopup="dialog">Compare now <Arrow size={18} /></button></div>
      </aside>
      </>}
      <dialog ref={dialog} className="compare-popup" aria-labelledby={headingId} onClose={() => { if (!dialog.current?.open) document.body.style.overflow = overflow.current; }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
      }}>
        <div className="compare-popup-heading"><div><h2 id={headingId} className="display">Compare products</h2><p>Key details, side by side.</p></div><button type="button" onClick={close} aria-label="Close comparison" className="compare-popup-close">×</button></div>
        <ProductComparison ids={ids} onRemove={remove} onClose={close} />
        <div className="compare-popup-footer"><span>{ids.length} of 3 products selected</span><button type="button" onClick={close}>Continue browsing</button></div>
      </dialog>
    </>
  );
}
