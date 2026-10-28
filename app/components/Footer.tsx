import Image from "next/image";
import { BRAND, NAV } from "../lib/content";

export function Footer() {
  return (
    <footer className="band-deep relative overflow-hidden pt-10">
      <div className="shell">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr] gap-10">
          <div>
            <Image
              src="/brand/logo-bio-growth-light.png"
              alt="Bio Growth+"
              width={225}
              height={182}
              className="h-[64px] w-auto"
            />
            <p className="mt-5 opacity-75 max-w-[34ch]">
              {BRAND.range} is a range of {BRAND.name}. For agriculture use
              only.
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer">
            <span className="text-[13px] uppercase tracking-[0.1em] opacity-55 mb-1">Pages</span>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-[17px] opacity-85 hover:opacity-100 w-fit">
                {n.label}
              </a>
            ))}
          </nav>

          <address className="not-italic opacity-85 leading-relaxed text-[17px]">
            <span className="text-[13px] uppercase tracking-[0.1em] opacity-65 block mb-3">
              {BRAND.name}
            </span>
            {BRAND.address}
            <br />
            <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>{BRAND.phone}</a>
            <br />
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            <br />
            {BRAND.site}
          </address>
        </div>
      </div>

      {/* the wordmark, full width, sinking off the bottom edge */}
      <p
        aria-hidden
        className="display text-center whitespace-nowrap leading-[0.78] mt-14 -mb-[1.6vw] select-none"
        style={{ color: "var(--field)", fontSize: "18.4vw" }}
      >
        Bio Growth+
      </p>

      <div
        className="relative border-t"
        style={{ borderColor: "rgba(255,255,255,0.16)", background: "var(--deep)" }}
      >
        <div className="shell py-5 flex flex-wrap gap-4 justify-between text-[14px] opacity-65">
          <span>
            © {BRAND.founded}–2026 {BRAND.name}
          </span>
          <span>Demo concept · colours from the pack artwork · field photography from Unsplash</span>
        </div>
      </div>
    </footer>
  );
}
