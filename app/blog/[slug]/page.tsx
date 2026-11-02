import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "../../components/Icons";
import { BlogPhotoComposition } from "../../components/BlogPhotoComposition";
import { BlogImageTrail, type BlogTrailStyle } from "../../components/BlogImageTrail";
import { BlogSectionReveal } from "../../components/BlogSectionReveal";
import { BLOG_POSTS, readingTime } from "../../lib/blog";

export function generateStaticParams() { return BLOG_POSTS.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  return post ? { title: `${post.title} — Bio Growth+ | Iti Biotech`, description: post.excerpt, openGraph: { title: post.title, description: post.excerpt, type: "article" } } : { title: "Article not found" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) notFound();
  const related = BLOG_POSTS.filter((item) => item.slug !== slug).slice(0, 2);
  const photos = post.photos;
  const trailStyles: BlogTrailStyle[] = ["curve", "rounded", "wave", "sweep"];
  const trailStyle = trailStyles[BLOG_POSTS.findIndex((item) => item.slug === slug)] ?? "curve";

  return <main id="main-content" className="blog-article shell">
    <nav className="catalogue-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden>/</span><Link href="/blog">Blog</Link><span aria-hidden>/</span><span aria-current="page">{post.title}</span></nav>
    <article className="blog-story-journey">
      <BlogImageTrail key={post.slug} variant={trailStyle} />
      <BlogSectionReveal key={`reveal-${post.slug}`} />
      <header className="blog-visual-opening" data-photo-side="right">
        <div className="blog-article-title">
          <p className="blog-eyebrow">{post.category} <span aria-hidden>·</span> {readingTime(post)}</p>
          <h1 className="display">{post.title}</h1>
          <div className="blog-article-intro"><p>{post.excerpt}</p><span className="blog-byline">The Bio Growth+ journal · Iti Biotech</span></div>
          <a href="#field-notes" className="blog-story-link">Explore the story <ArrowUpRight /></a>
        </div>
        <BlogPhotoComposition variant="opening" photos={photos.slice(0, 2)} priority />
      </header>
      <div id="field-notes" className="blog-visual-sections">
        {post.sections.map((section, index) => (
          <section key={section.heading} className={`blog-visual-section blog-visual-section-${index + 1}`} data-photo-side={index === 1 ? "right" : "left"} aria-labelledby={`section-heading-${index}`}>
            <BlogPhotoComposition variant={index === 0 ? "wide" : index === 1 ? "layered" : "mosaic"} photos={index === 0 ? photos.slice(2, 3) : index === 1 ? photos.slice(3, 5) : photos.slice(5, 8)} />
            <div className="blog-visual-copy">
              <p className="blog-eyebrow">Field notes / {String(index + 1).padStart(2, "0")}</p>
              <h2 id={`section-heading-${index}`} className="display">{section.heading}</h2>
              <ol className="blog-visual-points">{section.paragraphs.map((paragraph, point) => <li key={paragraph}><span aria-hidden="true">{String(point + 1).padStart(2, "0")}</span><p>{paragraph}</p></li>)}</ol>
              {index === post.sections.length - 1 && <aside className="blog-visual-takeaway"><p className="blog-eyebrow">Take it to the field</p><p>{post.takeaway}</p><Link className="blog-story-link" href="/#contact">Talk to our team <ArrowUpRight /></Link></aside>}
            </div>
          </section>
        ))}
      </div>
    </article>
    <section className="blog-related" aria-labelledby="related-heading"><div className="blog-section-heading"><h2 id="related-heading" className="display">Keep exploring</h2><Link href="/blog" className="blog-story-link">All articles <ArrowUpRight /></Link></div><div className="blog-related-grid">{related.map((item) => <article key={item.slug}><Link href={`/blog/${item.slug}`} className="blog-related-photo" tabIndex={-1} aria-hidden="true"><Image src={item.image} alt="" fill sizes="(max-width: 767px) 100vw, 50vw" /></Link><p className="blog-eyebrow">{item.category}</p><h3><Link href={`/blog/${item.slug}`}>{item.title} <ArrowUpRight /></Link></h3><p>{item.excerpt}</p></article>)}</div></section>
  </main>;
}
