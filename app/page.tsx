import { Animate } from "./components/Animate";
import { Catalogue } from "./components/Catalogue";
import { Footer } from "./components/Footer";
import { Grow } from "./components/Grow";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { Marquee } from "./components/Marquee";
import { Parallax } from "./components/Parallax";
import { Portfolio } from "./components/Portfolio";
import { Products } from "./components/Products";
import { Reach } from "./components/Reach";
import { SmoothScroll } from "./components/SmoothScroll";
import { Story } from "./components/Story";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Story />
        <Marquee />
        <Grow />
        <Products />
        <Catalogue />
        <Portfolio />
        <Journey />
        <Reach />
      </main>
      <Footer />
      <SmoothScroll />
      <Parallax />
      <Animate />
    </>
  );
}
