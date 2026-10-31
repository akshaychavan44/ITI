import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../components/Header";
import { ProductCatalogue } from "../components/ProductCatalogue";
import { ProductEnquiry } from "../components/ProductEnquiry";
import { Wave } from "../components/Wave";

export const metadata: Metadata = {
  title: "Products — Bio Growth+ | Iti Biotech",
  description: "Explore Bio Growth+ organic fertilisers, biofertilisers and soil conditioners. Compare products and enquire with Iti Biotech.",
};

export default function ProductsPage() {
  return (
    <>
      <Header interior />
      <main className="catalogue-page">
        <section className="catalogue-hero band-deep">
          <Image src="/photos/products-sunrise.webp" alt="" fill priority sizes="100vw" className="object-cover object-[center_45%]" />
          <div className="photo-shade" aria-hidden />
          <div className="shell catalogue-hero-inner">
            <nav className="catalogue-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden>/</span><span aria-current="page">Products</span></nav>
            <div className="catalogue-hero-copy">
              <div><h1 className="display">Good soil.<br />Great growth.</h1><p className="catalogue-eyebrow">The Bio Growth+ collection</p></div>
              <p className="catalogue-intro">Explore the Bio Growth+ range.<br />Find the right support for your soil and crops.</p>
            </div>
          </div>
          <Wave fill="var(--page)" shape={2} />
        </section>
        <ProductCatalogue />
        <ProductEnquiry />
      </main>
    </>
  );
}
