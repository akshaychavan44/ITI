export const BRAND = {
  name: "Iti Biotech",
  range: "Bio Growth+",
  origin: "Shri Balaji Seeds Suppliers",
  founded: 1988,
  years: 38,
  address: "Plot no. 89, Industrial Area, Koshmi, Betul (M.P.) 460001, Bharat",
  phone: "+91 99818 20966",
  email: "itibiotech@gmail.com",
  site: "www.itibiotech.in",
};

export const NAV = [
  { href: "#story", label: "Our Story" },
  { href: "#range", label: "Products" },
  { href: "#catalogue", label: "Catalogue" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#journey", label: "Journey" },
];

export const HERO_STATS = [
  { value: "38", label: "Years in Indian fields, since Shri Balaji Seeds opened in 1988." },
  { value: "10L+", label: "Customers served, from smallholdings to state tenders." },
  { value: "132", label: "Products in the book, ninety of them under Bio Growth+." },
];

/** Every bag cut-out is rendered from the final print at this size. */
export const BAG = { w: 810, h: 1388 };

/** The six packs in the final artwork, with the spec printed on each. */
export type Product = {
  id: string;
  name: string;
  /** The pack's own colour, sampled off the artwork. */
  hex: string;
  /** A darker stand-in for type and white-on-colour fills, for packs
   *  whose colour is too light to carry text (Potash Plus yellow). */
  ink?: string;
  hindi: string;
  /** Short line for cards and the spotlight heading. */
  short: string;
  /** The word that sits huge and faded behind the pack on its card. */
  ghost: string;
  kind: string;
  /** Transparent bag cut-out, rendered from the final print. */
  cutout: string;
  spec: string[];
  benefits: string[];
  pack: string;
  dosage: string;
};

/** Colour for text and filled controls in a pack's colour. */
export const inkOf = (p: Product) => p.ink ?? p.hex;

export const PRODUCTS: Product[] = [
  {
    id: "growth-booster",
    name: "Growth Booster",
    hex: "#ba0c2f",
    hindi: "ग्रोथ बूस्टर",
    short: "Organic growth booster & soil conditioner",
    ghost: "Booster",
    kind: "Organic Growth Booster & Soil Conditioner. Solid / Powder.",
    cutout: "/brand/packs/growth-booster.png",
    spec: [
      "N 2.65% · P₂O₅ 0.52% · K 0.338%",
      "Organic carbon 46.37% · Protein 16.54%",
      "MgSO₄ 0.85% · FeSO₄ 0.48% · ZnSO₄ 0.088% · MnSO₄ 0.064%",
    ],
    benefits: [
      "Supports soil and plant health",
      "Supports vegetative growth",
      "Supports stress tolerance and chlorophyll production",
    ],
    pack: "1 kg / 5 kg",
    dosage: "Follow the product label",
  },
  {
    id: "bio-guard",
    name: "Bio Guard 10",
    hex: "#ef7f1b",
    hindi: "बायो गार्ड 10",
    short: "Ten-strain biofertiliser",
    ghost: "Guard",
    kind: "Potassium mobilising biofertiliser, granular. CFU 5×10⁷ cells/g min.",
    cutout: "/brand/packs/bio-guard.png",
    spec: [
      "Acetobacter · PSB · KMB · ZMB · silicon solubilising bacteria",
      "Mycorrhizae · Trichoderma · Metarhizium · Beauveria bassiana · sulphur solubilising bacteria",
    ],
    benefits: [
      "10-in-1 — complete crop nutrition and natural protection in one pack",
      "Enhances soil fertility and microbial activity",
      "Improves the availability of NPK and nutrients to the plant",
      "Improves root development, flowering and fruiting",
      "Helps the crop withstand drought, heat and other adverse conditions",
      "Protects against pests, root diseases and lodging",
    ],
    pack: "50 kg",
    dosage: "200–500 kg per acre",
  },
  {
    id: "organic-phospho",
    name: "Organic Phospho",
    hex: "#008dd2",
    hindi: "आर्गेनिक फॉस्फो",
    short: "Phosphate-rich manure",
    ghost: "Phospho",
    kind: "Phosphate rich organic manure (PROM), granular.",
    cutout: "/brand/packs/organic-phospho.png",
    spec: [
      "N 0.4–1.0% · P 8–20%",
      "Organic carbon 14% · C:N ratio below 20%",
    ],
    benefits: [
      "Promotes growth of roots",
      "Boosts phosphorus availability in the soil",
      "Promotes flowering and fruiting",
      "Supplies organic carbon and micronutrients",
      "Improves soil structure and microorganism activity",
    ],
    pack: "50 kg",
    dosage: "200–500 kg per acre",
  },
  {
    id: "potash-plus",
    name: "Potash Plus",
    hex: "#ffcc01",
    ink: "#a86a00",
    hindi: "पोटाश प्लस",
    short: "Potash from molasses",
    ghost: "Potash",
    kind: "Potash derived from molasses, granular.",
    cutout: "/brand/packs/potash-plus.png",
    spec: ["N 1.66% · P 0.38% · K 14.50%"],
    benefits: [
      "Maximises fruit and vegetable quality",
      "Boosts disease and pest resistance",
      "Improves water efficiency",
      "Strengthens stems and stalks",
      "Improves winter hardiness",
      "Enhances nutrient uptake and photosynthesis",
    ],
    pack: "50 kg",
    dosage: "200–500 kg per acre",
  },
  {
    id: "phospho-gypsum",
    name: "Phospho Gypsum",
    hex: "#0a58ad",
    hindi: "फॉस्फो जिप्सम",
    short: "Soil conditioner",
    ghost: "Gypsum",
    kind: "Soil conditioner, granular.",
    cutout: "/brand/packs/phospho-gypsum.png",
    spec: ["CaSO₄·2H₂O 70% · SO₃ 13%"],
    benefits: [
      "Reclaims alkaline soil",
      "Enhances root strength and stem girth",
      "Prevents lodging",
      "Boosts chlorophyll production",
      "Improves air and water movement in the soil",
    ],
    pack: "50 kg",
    dosage: "200–500 kg per acre",
  },
  {
    id: "jio-gypsum",
    name: "Jio Gypsum",
    hex: "#e4097f",
    hindi: "जियो जिप्सम",
    short: "Gypsum with micronutrients",
    ghost: "Jio",
    kind: "Granular gypsum fertiliser with magnesium, boron, ferrous, zinc and manganese.",
    cutout: "/brand/packs/jio-gypsum.png",
    spec: ["CaSO₄·2H₂O 70% · SO₃ 13%", "Mg · B · Fe · Zn · Mn"],
    benefits: [
      "Reclaims alkaline soil",
      "Enhances root strength and stem girth",
      "Prevents lodging",
      "Boosts chlorophyll production",
      "Improves air and water movement in the soil",
    ],
    pack: "50 kg",
    dosage: "200–500 kg per acre",
  },
];

export const JOURNEY_COPY = [
  "With 38 years of experience in the agriculture and horticulture industry, our journey began in 1988 with the establishment of Shri Balaji Seeds Suppliers.",
  "Over the decades, we have grown from a seeds and agricultural-input supplier into a diversified organization serving farmers, growers, institutions, and government initiatives across India.",
  "Our commitment to quality and reliability has enabled us to serve 10 lakh+ customers across India. We have also successfully participated in and supplied products through government initiatives and tenders, strengthening our reputation as a trusted supplier in the sector.",
];

export const JOURNEY_MARKS = [
  { year: "1988", label: "Shri Balaji Seeds Suppliers opens in Betul." },
  { year: "2000s", label: "Inputs broaden — pesticides, tools, protected cultivation." },
  { year: "2010s", label: "Government tenders and institutional supply at scale." },
  { year: "2026", label: "Bio Growth+ launches under Iti Biotech." },
];

/** How the book actually breaks down, as the client counted it. */
export const CATALOGUE = [
  {
    n: "10",
    name: "Bio Fertilisers",
    family: "Bio Growth+",
    body: "Living cultures that fix, solubilise and mobilise what the soil already holds.",
  },
  {
    n: "80",
    name: "Bio Stimulants",
    family: "Bio Growth+",
    body: "The bulk of the range. Formulations that drive root mass, flowering and fruit set.",
  },
  {
    n: "40",
    name: "NPK Grades",
    family: "Nutrition",
    body: "Water-soluble ratios for every stage, from vegetative drive to finishing.",
  },
  {
    n: "02",
    name: "Micronutrients",
    family: "Nutrition",
    body: "Chelated correction for the deficiencies that quietly cap a yield.",
  },
];

export const PORTFOLIO = [
  { name: "Seeds", note: "Field, vegetable, fruit, flower" },
  { name: "Plants & Saplings", note: "Nursery-raised" },
  { name: "Pesticides", note: "Crop protection" },
  { name: "Polyhouses", note: "Built to spec" },
  { name: "Greenhouses", note: "Protected cultivation" },
  { name: "Medicinal Herbs", note: "Ayurvedic, aromatic" },
  { name: "Garden Tools", note: "Hand and powered" },
  { name: "Spices", note: "Planting material" },
  { name: "Mulching Sheets", note: "Moisture, weed control" },
];

export const REACH = [
  { k: "Government initiatives", v: "Supplied through state and central tenders." },
  { k: "Institutions", v: "Universities, research stations, corporate farms." },
  { k: "Growers", v: "From smallholdings to organised horticulture." },
];

export const MARQUEE = [
  "Bio Fertilisers",
  "Bio Stimulants",
  "NPK Grades",
  "Micronutrients",
  "Seeds",
  "Polyhouses",
  "Saplings",
  "Mulching",
];
