import { PRODUCTS, type Product } from "./content";

export const PRODUCT_CATEGORIES = [
  "Organic Fertilisers",
  "Bio Fertilisers",
  "Soil Conditioners",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

const DETAILS: Record<string, { category: ProductCategory; summary: string }> = {
  "growth-booster": { category: "Organic Fertilisers", summary: "Organic soil nutrition" },
  "bio-guard": { category: "Bio Fertilisers", summary: "Ten-strain biofertiliser" },
  "organic-phospho": { category: "Organic Fertilisers", summary: "Phosphate-rich manure" },
  "potash-plus": { category: "Organic Fertilisers", summary: "Potash from molasses" },
  "phospho-gypsum": { category: "Soil Conditioners", summary: "Soil conditioner" },
  "jio-gypsum": { category: "Soil Conditioners", summary: "Gypsum with micronutrients" },
};

export type CatalogueProduct = Product & { category: ProductCategory; summary: string };
export const CATALOGUE_PRODUCTS: CatalogueProduct[] = PRODUCTS.map((product) => ({
  ...product,
  ...DETAILS[product.id],
}));

export const productHref = (id: string) => `/products/${id}`;
