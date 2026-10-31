import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Arrow } from "../../components/Icons";
import { ProductCard } from "../../components/ProductCard";
import { ProductEnquiry } from "../../components/ProductEnquiry";
import { ProductDetails } from "../../components/ProductDetails";
import { CATALOGUE_PRODUCTS } from "../../lib/catalogue";

export function generateStaticParams() { return CATALOGUE_PRODUCTS.map((p) => ({ slug: p.id })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = CATALOGUE_PRODUCTS.find((product) => product.id === slug);
  return p ? { title: `${p.name} — Bio Growth+ | Iti Biotech`, description: `${p.kind} Explore composition, benefits and pack details, and enquire with Iti Biotech.` } : { title: "Product not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = CATALOGUE_PRODUCTS.find((product) => product.id === slug);
  if (!p) notFound();
  const related = CATALOGUE_PRODUCTS.filter((product) => product.id !== p.id).sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category)).slice(0, 3);

  return (
    <>
      <Header interior />
      <main className="product-detail-page">
        <div className="shell">
          <nav className="catalogue-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden>/</span><Link href="/products">Products</Link><span aria-hidden>/</span><span aria-current="page">{p.name}</span></nav>
          <ProductDetails product={p} />
          <section className="product-related" aria-labelledby="related-heading"><div className="product-related-heading"><h2 id="related-heading" className="display">Explore the range</h2><Link href="/products">All products <Arrow size={18} /></Link></div><div className="catalogue-product-grid">{related.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
        </div>
        <ProductEnquiry productName={p.name} />
      </main>
    </>
  );
}
