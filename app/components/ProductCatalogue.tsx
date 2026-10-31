"use client";

import { useState } from "react";
import { CATALOGUE_PRODUCTS, PRODUCT_CATEGORIES } from "../lib/catalogue";
import { ProductCard } from "./ProductCard";
import { ProductSort } from "./ProductSort";

const PAGE_SIZE = 12;

export function ProductCatalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const search = query.trim().toLocaleLowerCase();
  const filtered = CATALOGUE_PRODUCTS.filter((p) =>
    (category === "All products" || p.category === category) &&
    `${p.name} ${p.hindi} ${p.summary} ${p.kind} ${p.category}`.toLocaleLowerCase().includes(search),
  );
  if (sort !== "featured") filtered.sort((a, b) => sort === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const reset = () => { setQuery(""); setCategory("All products"); setPage(1); };

  return (
    <section className="catalogue-browser shell" aria-label="Product catalogue">
      <div className="catalogue-search-row">
        <label className="catalogue-search">
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
          <span className="sr-only">Search products</span>
          <input type="search" placeholder="Search by product name..." value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        </label>
        <ProductSort value={sort} onChange={(value) => { setSort(value); setPage(1); }} />
      </div>
      <div className="catalogue-filter-row">
        <div className="catalogue-filters" role="group" aria-label="Filter by product category">
          {["All products", ...PRODUCT_CATEGORIES].map((item) => (
            <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setPage(1); }}>{item}</button>
          ))}
        </div>
        <p className="catalogue-count" role="status">Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}</p>
      </div>
      <p className="catalogue-compare-hint">Want to see the difference? Tick Compare on two or three products.</p>
      {visible.length ? (
        <div className="catalogue-product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      ) : (
        <div className="catalogue-empty">
          <h2 className="display">No products found</h2>
          <p>Try another name or explore the full range.</p>
          <button type="button" onClick={reset}>Clear filters</button>
        </div>
      )}
      {pages > 1 && (
        <nav className="catalogue-pagination" aria-label="Product pages">
          <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          {Array.from({ length: pages }, (_, i) => <button key={i} type="button" aria-current={page === i + 1 ? "page" : undefined} onClick={() => setPage(i + 1)}>{i + 1}</button>)}
          <button type="button" disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
        </nav>
      )}
      <div className="catalogue-end"><span>{filtered.length} {filtered.length === 1 ? "product" : "products"} available</span></div>
    </section>
  );
}
