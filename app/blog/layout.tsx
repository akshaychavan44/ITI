import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArrowUpRight } from "../components/Icons";
import { Wave } from "../components/Wave";
import "./blog.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Header interior />
    {children}
    <section className="blog-contact band-deep" aria-labelledby="blog-contact-heading">
      <Wave fill="var(--page)" edge="top" shape={1} />
      <div className="shell blog-contact-inner"><div><h2 id="blog-contact-heading" className="display">Let’s talk about your next season.</h2><p>Have a question about your soil or crops? Talk to the Iti Biotech team.</p></div><Link href="/#contact">Get in touch <ArrowUpRight /></Link></div>
    </section>
    <Footer interior />
  </>;
}
