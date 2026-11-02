import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogArticles } from "../components/BlogArticles";
import { BlogHeroVideo } from "../components/BlogHeroVideo";
import { ArrowUpRight } from "../components/Icons";
import { Wave } from "../components/Wave";
import { BLOG_POSTS, readingTime } from "../lib/blog";

export const metadata: Metadata = {
  title: "Blog — The Bio Growth+ Journal | Iti Biotech",
  description: "Explore soil care, farming tips and Bio Growth+ product guides from Iti Biotech. Practical ideas for every growing season.",
};

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  return (
    <main id="main-content" className="blog-page">
      <section className="blog-hero band-deep">
        <BlogHeroVideo />
        <div className="blog-hero-shade" aria-hidden />
        <div className="shell blog-hero-inner">
          <nav className="catalogue-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden>/</span><span aria-current="page">Blog</span></nav>
          <p className="blog-eyebrow">The Bio Growth+ journal <span aria-hidden /></p>
          <h1 className="display">From the soil.<br />For the grower.</h1>
          <p className="blog-hero-intro">Practical ideas for soil, crops and every growing season.</p>
        </div>
        <Wave fill="var(--page)" shape={2} />
      </section>
      <div className="shell blog-content">
        <section aria-labelledby="featured-heading" className="blog-featured">
          <div className="blog-section-heading"><h2 id="featured-heading" className="blog-eyebrow">Featured story</h2><span aria-hidden /></div>
          <article className="blog-feature">
            <Link href={`/blog/${featured.slug}`} className="blog-feature-image" tabIndex={-1} aria-hidden="true"><Image src={featured.image} alt="" fill sizes="(max-width: 767px) 100vw, 60vw" /></Link>
            <div className="blog-feature-copy"><p className="blog-eyebrow">{featured.category}</p><h3 className="display"><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h3><p>{featured.excerpt}</p><div className="blog-feature-bottom"><Link className="blog-story-link" href={`/blog/${featured.slug}`}>Read story <ArrowUpRight /></Link><span>{readingTime(featured)}</span></div></div>
          </article>
        </section>
        <BlogArticles posts={BLOG_POSTS.slice(1)} />
      </div>
    </main>
  );
}
