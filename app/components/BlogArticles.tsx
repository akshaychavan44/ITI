"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type BlogPost, readingTime } from "../lib/blog";
import { ArrowUpRight } from "./Icons";

const categories = ["All articles", "Soil Care", "Farming Tips", "Product Guides", "Updates"] as const;

export function BlogArticles({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string>("All articles");
  const visible = category === "All articles" ? posts : posts.filter((post) => post.category === category);

  return (
    <section className="blog-latest" aria-labelledby="latest-heading">
      <div className="blog-section-heading"><h2 id="latest-heading" className="display">Latest from the field</h2><span aria-hidden /></div>
      <div className="blog-filters" role="group" aria-label="Filter articles by category">
        {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <p className="sr-only" role="status">{visible.length} {visible.length === 1 ? "article" : "articles"} in {category}</p>
      {visible.length ? (
        <div className="blog-grid">
          {visible.map((post) => (
            <article key={post.slug} className="blog-card">
              <Link href={`/blog/${post.slug}`} className="blog-card-image" tabIndex={-1} aria-hidden="true">
                <Image src={post.image} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
              </Link>
              <p className="blog-eyebrow">{post.category}</p>
              <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-card-bottom"><span>{readingTime(post)}</span><Link href={`/blog/${post.slug}`} aria-label={`Read story: ${post.title}`}>Read story <ArrowUpRight /></Link></div>
            </article>
          ))}
        </div>
      ) : <div className="blog-empty"><h3>No updates just yet</h3><p>Explore our soil care, farming tips and product guides while you wait.</p><button type="button" onClick={() => setCategory("All articles")}>View all articles <ArrowUpRight /></button></div>}
    </section>
  );
}
