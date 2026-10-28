import type { Metadata } from "next";
import { Anton, Hind, Instrument_Sans } from "next/font/google";
import "./globals.css";

/* Anton for the poster headlines, Instrument Sans for reading, and Hind
   for the Devanagari product names (Anton has no Devanagari). */
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const hind = Hind({
  variable: "--font-hind",
  weight: ["500", "600"],
  subsets: ["devanagari"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iti Biotech — Bio Growth+",
  description:
    "Thirty-eight years of agricultural and horticultural inputs, from Shri Balaji Seeds Suppliers in 1988 to the Bio Growth+ range today.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${instrument.variable} ${hind.variable} h-full`}
    >
      <head>
        {/* the entrances start from opacity:0, so without JS show everything */}
        <noscript>
          <style>{`.animated-text .word,.animated-block > *,.animated-block .stagger-item,.animated-block img{opacity:1!important;animation:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
