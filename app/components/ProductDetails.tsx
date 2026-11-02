"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import type { CatalogueProduct } from "../lib/catalogue";
import { BAG } from "../lib/content";
import { productDetailCopy } from "../lib/product-detail-copy";
import { PRODUCT_COMPOSITION, COMPOSITION_HINDI } from "../lib/product-composition";
import { GROWTH_COMPOSITION } from "../lib/growth-booster";
import { EnquiryForm } from "./EnquiryForm";
import { GrowthInformationAccordion } from "./GrowthInformationAccordion";
import { CompareToggle } from "./CompareToggle";

export function ProductDetails({ product: p }: { product: CatalogueProduct }) {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const copy = productDetailCopy(p, language);
  const composition = PRODUCT_COMPOSITION[p.id];

  return (
    <div className="growth-details" lang={language}>
      <section className="product-detail-hero" aria-labelledby="product-name">
        <div className="product-detail-art" style={{ background: `color-mix(in srgb, ${p.hex} 14%, #fff)` }}>
          <span className="catalogue-pack-label">{copy.pack}</span>
          <span className="display product-detail-ghost" style={{ color: p.hex }} aria-hidden>{p.ghost}</span>
          <Image src={p.cutout} alt={`${language === "hi" ? p.hindi : p.name} ${language === "hi" ? "पैक" : "pack"}`} width={BAG.w} height={BAG.h} priority sizes="(min-width: 1024px) 340px, 60vw" />
        </div>
        <div className="product-detail-copy">
          <div className="growth-summary">
          <div className="growth-heading">
          <div className="product-language" role="group" aria-label="Product information language">
            <button type="button" lang="en" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button>
            <button type="button" lang="hi" aria-pressed={language === "hi"} onClick={() => setLanguage("hi")}>हिंदी</button>
          </div>
          <p className="catalogue-eyebrow">Bio Growth+ / {copy.category}</p>
          <h1 id="product-name" className="display" lang="en">{p.name}</h1>
          </div>
          <p className="deva product-detail-hindi" lang="hi">{p.hindi}</p>
          <p className="product-detail-description">{copy.description}</p>
          <dl className="product-detail-facts">
            <div><dt>{copy.packLabel}</dt><dd>{copy.pack}</dd></div>
            <div><dt>{copy.formulationLabel}</dt><dd>{copy.formulation}</dd></div>
            <div><dt>{copy.cropsLabel}</dt><dd>{copy.crops}</dd></div>
            <div><dt>{copy.doseLabel}</dt><dd>{copy.dose}</dd></div>
          </dl>
          <p className="growth-pack-note">{copy.packaging}</p>
          <EnquiryForm productName={p.name}>{copy.enquiry}</EnquiryForm>
          </div>
          <div className="growth-detail-footer">
          <p className="product-detail-help">{copy.help}</p>
          <CompareToggle id={p.id} name={p.name} detail />
          </div>
        </div>
      </section>
      <section className="product-detail-information" aria-label={language === "hi" ? "संरचना और उत्पाद की जानकारी" : "Composition and product information"}>
        <div className="product-composition-visual">
          <p className="catalogue-eyebrow">{copy.inside}</p>
          <h2 className="display">{copy.composition}</h2>
          <dl className="composition-badges growth-composition-badges" style={{ "--composition-columns": Math.min(composition.length, 3) } as CSSProperties}>
            {composition.map((item, index) => <div className="composition-badge" key={item.symbol}><dt><span className="composition-orb" style={{ "--nutrient-color": p.id === "growth-booster" ? ["#9d841b", "#96589b", "#5b812b", "#ac7626", "#3a7393", "#71834c", "#a16943", "#808580", "#6e668e"][index] : item.color } as CSSProperties} aria-hidden>{item.symbol}</span><span>{language === "hi" ? (p.id === "growth-booster" ? GROWTH_COMPOSITION[index].hindi : COMPOSITION_HINDI[item.label] ?? item.label) : item.label}</span></dt><dd>{language === "hi" ? item.value.replace("10-in-1 blend", "दस समूहों का मिश्रण").replace("Below 20%", "20% से कम").replace("Added micronutrients", "अतिरिक्त सूक्ष्म पोषक तत्व") : item.value}</dd></div>)}
          </dl>
          <p className="composition-caption">{copy.lab}</p>
          {p.id === "bio-guard" && <div className="composition-cultures">{(language === "hi" ? ["एसीटोबैक्टर · PSB · KMB · ZMB · सिलिकॉन घुलनशील बनाने वाले जीवाणु", "माइकोराइजा · ट्राइकोडर्मा · मेटाराइजियम · ब्यूवेरिया बैसियाना · सल्फर घुलनशील बनाने वाले जीवाणु"] : p.spec).map((spec) => <p key={spec}>{spec}</p>)}</div>}
        </div>
        <div>
          <p className="catalogue-eyebrow">{language === "hi" ? "लाभ और उपयोग" : "Benefits & application"}</p>
          <h2 className="display">{copy.legalEyebrow}</h2>
          <GrowthInformationAccordion key={language} items={[
            { title: copy.benefitsTitle, content: <ul className="growth-benefit-summary">{copy.benefits.map(([title]) => <li key={title}>{title}</li>)}</ul> },
            ...copy.steps.map((step) => ({ title: step.title, content: <dl>{step.items.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl> })),
            { title: copy.legalTitle, content: <dl>
              <div><dt>{copy.manufacturer}</dt><dd>{copy.address}</dd></div>
              <div><dt>{copy.packageTitle}</dt><dd>{copy.packageNote}</dd></div>
            </dl> },
          ]} />
        </div>
      </section>
    </div>
  );
}
