import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "../../components/Header";
import { Arrow } from "../../components/Icons";
import { EnquiryForm } from "../../components/EnquiryForm";
import { ProductCard } from "../../components/ProductCard";
import { ProductEnquiry } from "../../components/ProductEnquiry";
import { ProductBenefits } from "../../components/ProductBenefits";
import { ProductComposition } from "../../components/ProductComposition";
import { CompareToggle } from "../../components/CompareToggle";
import { BENEFIT_EXPLANATIONS } from "../../lib/benefits";
import { CATALOGUE_PRODUCTS } from "../../lib/catalogue";
import { BAG } from "../../lib/content";

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
          <section className="product-detail-hero" aria-labelledby="product-name">
            <div className="product-detail-art" style={{ background: `color-mix(in srgb, ${p.hex} 14%, #fff)` }}>
              <span className="catalogue-pack-label">{p.pack}</span>
              <span className="display product-detail-ghost" style={{ color: p.hex }} aria-hidden>{p.ghost}</span>
              <Image src={p.cutout} alt={`${p.name} pack`} width={BAG.w} height={BAG.h} priority sizes="(min-width: 1024px) 340px, 60vw" />
            </div>
            <div className="product-detail-copy">
              <p className="catalogue-eyebrow">Bio Growth+ / {p.category}</p>
              <h1 id="product-name" className="display">{p.name}</h1>
              <p className="deva product-detail-hindi" lang="hi">{p.hindi}</p>
              <p className="product-detail-description">{p.kind}</p>
              <dl className="product-detail-facts"><div><dt>Pack size</dt><dd>{p.pack}</dd></div><div><dt>Recommended crops</dt><dd>All crops</dd></div><div><dt>Label dosage</dt><dd>{p.dosage}</dd></div></dl>
              <EnquiryForm productName={p.name}>Enquire about {p.name}</EnquiryForm>
              <p className="product-detail-help">For crop-specific application guidance, contact our team and follow the product label.</p>
              <CompareToggle id={p.id} name={p.name} detail />
            </div>
          </section>
          <section className="product-detail-information" aria-label="Product information">
            <ProductComposition product={p} />
            <div><p className="catalogue-eyebrow">Support for your soil</p><h2 className="display">Product benefits</h2><ProductBenefits benefits={p.benefits.map((title) => ({ title, explanation: BENEFIT_EXPLANATIONS[title] }))} /></div>
          </section>
          <section className="product-related" aria-labelledby="related-heading"><div className="product-related-heading"><h2 id="related-heading" className="display">Explore the range</h2><Link href="/products">All products <Arrow size={18} /></Link></div><div className="catalogue-product-grid">{related.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
        </div>
        <ProductEnquiry productName={p.name} />
      </main>
    </>
  );
}
