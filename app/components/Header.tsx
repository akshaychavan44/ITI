"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BAG, BRAND, CATALOGUE, NAV, PRODUCTS, inkOf } from "../lib/content";
import { productHref } from "../lib/catalogue";
import { ArrowUpRight, Chevron, Menu, Phone } from "./Icons";

/** The nav entry that opens the product menu instead of jumping. */
const PRODUCTS_HREF = "#range";

/** Sections that light up a nav entry other than their own id. */
const ALIASES: Record<string, string> = { "#spotlight": PRODUCTS_HREF };

/** Valmont's header: a black bar floating inside a 10px gap. It tucks
 *  away as you scroll down and comes back once you scroll up by half
 *  its height. Products opens a panel that grows out of the bar. */
export function Header({ interior = false }: { interior?: boolean }) {
  const pathname = usePathname();
  const [active, setActive] = useState(interior ? PRODUCTS_HREF : "");
  const current = pathname.startsWith("/blog") ? "/blog" : active;
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [feature, setFeature] = useState(PRODUCTS[0].id);
  const closeTimer = useRef<number | undefined>(undefined);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let up = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const h = document.querySelector(".masthead")?.clientHeight ?? 80;
      // only upward travel counts towards bringing it back
      up = y < last ? up + (last - y) : 0;
      last = y;
      setScrolled(y > 8);
      setHidden(y > h && up < h / 2);
      setMega(false);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (interior) return;
    const sels = [...NAV.map((n) => n.href).filter((href) => href.startsWith("#")), ...Object.keys(ALIASES)];
    const targets = sels
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = `#${e.target.id}`;
          setActive(ALIASES[id] ?? id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));

    // back at the hero, nothing is current
    const top = document.querySelector("#top");
    const heroIo = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(""),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    if (top) heroIo.observe(top);

    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, [interior]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMega((m) => {
        if (m) trigger.current?.focus();
        return false;
      });
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const holdMega = () => window.clearTimeout(closeTimer.current);
  const leaveMega = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 180);
  };
  const closeAll = () => {
    setMega(false);
    setOpen(false);
    setSubOpen(false);
  };
  const sectionHref = (href: string) => interior && href.startsWith("#") ? `/${href}` : href;

  const tel = `tel:${BRAND.phone.replace(/\s/g, "")}`;
  const shown = PRODUCTS.find((p) => p.id === feature) ?? PRODUCTS[0];

  return (
    <header
      className="masthead"
      data-hidden={hidden && !open && !mega ? "" : undefined}
      data-scrolled={scrolled ? "" : undefined}
    >
      <div
        className="mast-box"
        data-mega={mega ? "" : undefined}
        onMouseEnter={holdMega}
        onMouseLeave={leaveMega}
      >
        <div className="navbar">
          <a href={interior ? "/" : "#top"} className="logo-link" aria-label="Bio Growth+ home" onClick={closeAll}>
            <Image
              src="/brand/logo-bio-growth-light.png"
              alt="Bio Growth+"
              width={225}
              height={182}
              loading="eager"
              className="h-[44px] sm:h-[50px] w-auto"
            />
          </a>

          <nav className="nav-links hidden xl:flex items-center mx-auto" aria-label="Sections">
            {NAV.map((n) =>
              n.href === PRODUCTS_HREF ? (
                <button
                  key={n.href}
                  ref={trigger}
                  type="button"
                  className="navlink"
                  aria-current={current === n.href ? "true" : undefined}
                  aria-expanded={mega}
                  aria-controls="mega"
                  onMouseEnter={() => setMega(true)}
                  onClick={() => setMega((m) => !m)}
                >
                  <span className="dot" aria-hidden />
                  {n.label}
                  <Chevron />
                </button>
              ) : (
                <a
                  key={n.href}
                  href={sectionHref(n.href)}
                  className="navlink"
                  aria-current={current === n.href ? "true" : undefined}
                  onMouseEnter={() => setMega(false)}
                  onClick={closeAll}
                >
                  <span className="dot" aria-hidden />
                  {n.label}
                </a>
              ),
            )}
          </nav>

          <div className="ml-auto xl:ml-0 flex items-center gap-2">
            <a href={tel} className="nav-phone hidden xl:inline-flex">
              <span>
                <Phone size={16} />
              </span>
              {BRAND.phone}
            </a>
            <a href={pathname.startsWith("/blog") ? "/#contact" : "#contact"} className="nav-cta hidden sm:inline-flex" onClick={closeAll}>
              Enquire
              <span>
                <ArrowUpRight size={17} />
              </span>
            </a>
            <button
              type="button"
              className="nav-burger xl:hidden"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <Menu open={open} />
            </button>
          </div>
        </div>

        {/* desktop: the product panel, grown out of the bar */}
        <div id="mega" className="mega hidden xl:grid" inert={!mega}>
          <div>
            <div className="mega-body">
              <div className="pr-4">
                <h2 className="text-[24px] leading-[1.15] font-medium">Products</h2>
                <p className="mt-3 text-[15px] leading-[1.55] text-white/60 max-w-[30ch]">
                  Ninety formulations under Bio Growth+, and the nutrition
                  line beside them — made in Betul for Indian soil.
                </p>
                <Link href="/products" className="dot-link mt-6" onClick={closeAll}>
                  <span className="dot" aria-hidden />
                  <span className="label">
                    See the full range
                    <span className="underline" aria-hidden />
                  </span>
                </Link>
              </div>

              <div>
                <p className="mega-label">Bio Growth+ product range</p>
                <ul className="mega-links grid grid-cols-2 gap-x-6 gap-y-1">
                  {PRODUCTS.map((p) => (
                    <li key={p.id}>
                      <a
                        href={productHref(p.id)}
                        className="mega-pack"
                        onMouseEnter={() => setFeature(p.id)}
                        onFocus={() => setFeature(p.id)}
                        onClick={closeAll}
                      >
                        <span className="swatch" style={{ background: p.hex }} aria-hidden />
                        <span>
                          <span className="block text-[18px] leading-tight">{p.name}</span>
                          <span className="block mt-1 text-[13.5px] text-white/50">
                            <span className="deva">{p.hindi}</span> · {p.short}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mega-label">The catalogue</p>
                <ul className="mega-links">
                  {CATALOGUE.map((c) => (
                    <li key={c.name}>
                      <a href={sectionHref("#catalogue")} className="mega-cat" onClick={closeAll}>
                        <span>{c.name}</span>
                        <span className="text-white/45 tabular-nums">{c.n}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={productHref(shown.id)}
                className="mega-feature"
                style={{ background: `color-mix(in srgb, ${inkOf(shown)} 78%, #000)` }}
                onClick={closeAll}
              >
                <span className="relative z-[2] block display text-[26px] leading-none">
                  {shown.name}
                </span>
                <span className="relative z-[2] block mt-1.5 text-[13px] text-white/75">
                  {shown.short}
                </span>
                <Image
                  key={shown.id}
                  src={shown.cutout}
                  alt=""
                  width={BAG.w}
                  height={BAG.h}
                  sizes="140px"
                  className="swap-in absolute right-[9%] bottom-[-12%] w-[56%] rotate-[8deg] drop-shadow-[0_16px_18px_rgba(0,0,0,0.4)]"
                />
              </a>
            </div>
          </div>
        </div>

        {/* below xl: the same entries as a drawer, products as an accordion */}
        {open && (
          <nav id="menu" className="mobile-menu xl:hidden" aria-label="Sections" data-lenis-prevent>
            {NAV.map((n) =>
              n.href === PRODUCTS_HREF ? (
                <div key={n.href} className="border-b border-white/10">
                  <button
                    type="button"
                    className="mobile-row w-full"
                    aria-expanded={subOpen}
                    aria-controls="menu-products"
                    onClick={() => setSubOpen((s) => !s)}
                  >
                    <span className="display text-[32px]">{n.label}</span>
                    <span className={`transition-transform duration-300 ${subOpen ? "rotate-180" : ""}`}>
                      <Chevron size={18} />
                    </span>
                  </button>
                  {subOpen && (
                    <ul id="menu-products" className="pb-3 grid sm:grid-cols-2 gap-1">
                      {PRODUCTS.map((p) => (
                        <li key={p.id}>
                          <a
                            href={productHref(p.id)}
                            onClick={closeAll}
                            className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/5"
                          >
                            <span className="w-3 h-3 rounded-[3px] shrink-0" style={{ background: p.hex }} />
                            <span className="font-medium">{p.name}</span>
                            <span className="deva text-[14px] text-white/50">{p.hindi}</span>
                          </a>
                        </li>
                      ))}
                      <li>
                        <Link href="/products" onClick={closeAll} className="flex items-center gap-2 py-2.5 px-3 text-white/70">
                          Full range <ArrowUpRight size={14} />
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <a key={n.href} href={sectionHref(n.href)} onClick={closeAll} aria-current={current === n.href ? "true" : undefined} className="mobile-row border-b border-white/10">
                  <span className="display text-[32px]">{n.label}</span>
                  {current === n.href && <span className="w-2.5 h-2.5 rounded-full bg-[var(--green-light)]" />}
                </a>
              ),
            )}
            <div className="mt-3 mb-1 grid grid-cols-2 gap-2">
              <a href={tel} className="flex items-center justify-center gap-2 h-14 rounded-lg bg-white/10 font-semibold">
                <Phone /> Call
              </a>
              <a
                href={pathname.startsWith("/blog") ? "/#contact" : "#contact"}
                onClick={closeAll}
                className="flex items-center justify-center gap-2 h-14 rounded-lg bg-field text-white font-semibold"
              >
                Enquire <ArrowUpRight />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
